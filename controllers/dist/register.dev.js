"use strict";

var User = require('../models/User');

var bcrypt = require('bcrypt');

var mail = require('../mail/mail.config.js');

var express = require('express');

var signupSuccess = require('../mail/signupSuccessTemplate.js');

var resendPassword = require('../mail/resendPasswordTemplate');

var defaultText = require('../config/languagesText');

var _require = require('../services/streamstudioAPI'),
    registerUser = _require.registerUser;

var app = express();

var multer = require('multer');

var upload = multer({
  dest: 'uploads/'
});
var titleOptions = [{
  name: 'Mr',
  id: 1
}, {
  name: 'Mrs',
  id: 2
}, {
  name: 'Ms',
  id: 3
}];

function getRandomString(length) {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';

  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }

  return result;
} // app.post('/', upload.single('profilePhoto'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
//   console.log(req.file);
// })


exports.register = function (req, res) {
  console.log(titleOptions);

  if (req.params.language === 'english' || req.params.language === undefined) {
    res.render('register', {
      title: 'Register',
      msg: '',
      csrfToken: req.csrfToken(),
      language: defaultText.english.language,
      pageText: defaultText.english.registerPage,
      titleOptions: titleOptions
    });
  } else {
    res.render('register', {
      title: 'Register',
      msg: '',
      csrfToken: req.csrfToken(),
      pageText: defaultText[req.params.language].registerPage,
      language: defaultText[req.params.language].language
    });
  }
};

exports.registerUser = function _callee(req, res) {
  var webcastID, userFound, salt, password, hash1, user, d, register, signUpResponse, _register, _signUpResponse;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          webcastID = process.env.STREAMSTUDIOWEBCASTID;
          console.log(req.body);
          _context.next = 4;
          return regeneratorRuntime.awrap(User.find({
            email: req.body.email
          }));

        case 4:
          userFound = _context.sent;

          if (!userFound.length) {
            _context.next = 9;
            break;
          }

          res.render('register', {
            title: 'Register',
            msg: 'User already registered',
            csrfToken: req.csrfToken(),
            pageText: defaultText[req.params.language].registerPage,
            language: defaultText[req.params.language].language
          });
          _context.next = 73;
          break;

        case 9:
          salt = 10;
          password = getRandomString(12);
          _context.next = 13;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 13:
          hash1 = _context.sent;
          req.body.password = hash1;
          req.body.username = req.body.email;
          user = new User(req.body);
          _context.prev = 17;
          _context.next = 20;
          return regeneratorRuntime.awrap(user.save());

        case 20:
          d = _context.sent;

          if (!(req.params.language === 'english' || req.params.language === undefined)) {
            _context.next = 46;
            break;
          }

          _context.prev = 22;
          _context.next = 25;
          return regeneratorRuntime.awrap(registerUser(req.body));

        case 25:
          register = _context.sent;
          console.log(req.body);
          _context.prev = 27;
          _context.next = 30;
          return regeneratorRuntime.awrap(signupSuccess(d, password, req.params.language));

        case 30:
          signUpResponse = _context.sent;
          res.cookie("wtv_u_".concat(webcastID), "".concat(register.body.user_id), {
            domain: ".world-television.com"
          }).render('registration_confirmation', {
            language: defaultText.english.language,
            pageText: defaultText.english.confirmation
          });
          _context.next = 38;
          break;

        case 34:
          _context.prev = 34;
          _context.t0 = _context["catch"](27);
          console.log('This is inside the email block' + _context.t0.message);
          res.render('registration_confirmation', {
            language: defaultText.english.language,
            pageText: defaultText.english.confirmation
          });

        case 38:
          _context.next = 44;
          break;

        case 40:
          _context.prev = 40;
          _context.t1 = _context["catch"](22);
          console.log(_context.t1);
          res.render('register_error', {
            pageText: {
              errorMessage: 'There have been an error'
            },
            language: defaultText[req.params.language].language
          });

        case 44:
          _context.next = 67;
          break;

        case 46:
          _context.prev = 46;
          _context.next = 49;
          return regeneratorRuntime.awrap(registerUser(req.body));

        case 49:
          _register = _context.sent;
          _context.prev = 50;
          _context.next = 53;
          return regeneratorRuntime.awrap(signupSuccess(d, password, req.params.language));

        case 53:
          _signUpResponse = _context.sent;
          res.cookie("wtv_u_".concat(webcastID), "".concat(_register.body.user_id), {
            domain: ".world-television.com"
          }).render('registration_confirmation', {
            pageText: defaultText[req.params.language].confirmation,
            language: defaultText[req.params.language].language
          });
          _context.next = 61;
          break;

        case 57:
          _context.prev = 57;
          _context.t2 = _context["catch"](50);
          console.log('This is inside the email block' + _context.t2.message);
          res.render('registration_confirmation', {
            pageText: defaultText[req.params.language].confirmation,
            language: defaultText[req.params.language].language
          });

        case 61:
          _context.next = 67;
          break;

        case 63:
          _context.prev = 63;
          _context.t3 = _context["catch"](46);
          console.log(_context.t3);
          res.render('register_error', {
            pageText: {
              errorMessage: 'There have been an error'
            },
            language: defaultText[req.params.language].language
          });

        case 67:
          _context.next = 73;
          break;

        case 69:
          _context.prev = 69;
          _context.t4 = _context["catch"](17);
          console.log(_context.t4);
          res.render('register_error', {
            pageText: {
              errorMessage: 'There have been an error'
            },
            language: defaultText[req.params.language].language
          });

        case 73:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[17, 69], [22, 40], [27, 34], [46, 63], [50, 57]]);
};

exports.resetPwd = function (req, res) {
  res.render('reset_password', {
    title: 'Reset Password',
    csrfToken: req.csrfToken(),
    reset: defaultText[req.params.language].resetPasswordPage,
    language: defaultText[req.params.language].language
  });
};

exports.resetPwdPost = function _callee2(req, res) {
  var userFound, salt, password, hash1, updateUser;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 2:
          userFound = _context2.sent;
          console.log(req.body, userFound);

          if (!userFound) {
            _context2.next = 16;
            break;
          }

          salt = 10;
          password = getRandomString(8);
          _context2.next = 9;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 9:
          hash1 = _context2.sent;
          _context2.next = 12;
          return regeneratorRuntime.awrap(User.updateOne({
            email: req.body.email
          }, {
            $set: {
              password: hash1
            }
          }));

        case 12:
          updateUser = _context2.sent;

          try {
            resendPassword(userFound, password, req.params.language);
            res.render('reset_password_success', {
              reset: defaultText[req.params.language].resetPasswordPage,
              language: defaultText[req.params.language].language
            });
          } catch (e) {
            res.render('reset_password_success', {
              reset: defaultText[req.params.language].resetPasswordPage,
              language: defaultText[req.params.language].language
            });
          }

          _context2.next = 17;
          break;

        case 16:
          res.render('reset_password', {
            title: 'Reset Password',
            reset: defaultText[req.params.language].resetPasswordPage,
            language: defaultText[req.params.language].language,
            msg: defaultText[req.params.language].resetPasswordPage.notRegisteredMessage,
            csrfToken: req.csrfToken()
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  });
};