const User = require('../models/User');
var bcrypt = require('bcrypt');
const mail = require('../mail/mail.config.js');
const express = require('express');
const signupSuccess = require('../mail/signupSuccessTemplate.js');
const resendPassword = require('../mail/resendPasswordTemplate');
const defaultText = require('../config/languagesText');
const { registerUser } = require('../services/streamstudioAPI');
const app = express();

let multer  = require('multer');
let upload = multer({ dest: 'uploads/' });
const titleOptions = [
  {
      name: 'Mr',
      id: 1
  },
  {
      name: 'Mrs',
      id: 2
  },
  {
      name: 'Ms',
      id: 3
  }
];


function getRandomString(length) {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

// app.post('/', upload.single('profilePhoto'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
//   console.log(req.file);
// })

exports.register = (req, res) => {
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
      language: defaultText[req.params.language].language,
    });
  }
};

exports.registerUser = async (req, res) => {
  const webcastID = process.env.STREAMSTUDIOWEBCASTID;
  console.log(req.body);
  const userFound = await User.find({ email: req.body.email });
  if (userFound.length) {
    res.render('register', {
      title: 'Register',
      msg: 'User already registered',
      csrfToken: req.csrfToken(),
      pageText: defaultText[req.params.language].registerPage,
      language: defaultText[req.params.language].language,
    });
  } else {
    const salt = 10;
    const password = getRandomString(12);
    const hash1 = await bcrypt.hash(password, salt);
    req.body.password = hash1;
    req.body.username = req.body.email;
    const user = new User(req.body);
    try {
      const d = await user.save();
      if (req.params.language === 'english' || req.params.language === undefined) {
        try {
          const register = await registerUser(req.body);
          console.log(req.body)
          try {
            const signUpResponse = await signupSuccess(d, password, req.params.language);
            res.cookie(`wtv_u_${webcastID}`, `${register.body.user_id}`, { domain: ".world-television.com" })
              .render('registration_confirmation', {
                language: defaultText.english.language,
                pageText: defaultText.english.confirmation
              });
          } catch (e) {
            console.log('This is inside the email block' + e.message);
            res.render('registration_confirmation', {
              language: defaultText.english.language,
              pageText: defaultText.english.confirmation
            });
          }
        } catch (e) {
          console.log(e);
          res.render('register_error', {
            pageText: { errorMessage: 'There have been an error' },
            language: defaultText[req.params.language].language
          });
        }

      } else {
        try {
          const register = await registerUser(req.body);
          try {
            const signUpResponse = await signupSuccess(d, password, req.params.language);
            res.cookie(`wtv_u_${webcastID}`, `${register.body.user_id}`, { domain: ".world-television.com" })
              .render('registration_confirmation', {
                pageText: defaultText[req.params.language].confirmation,
                language: defaultText[req.params.language].language
              });
          } catch (e) {
            console.log('This is inside the email block' + e.message);
            res.render('registration_confirmation', {
              pageText: defaultText[req.params.language].confirmation,
              language: defaultText[req.params.language].language,
            });
          }
        } catch (e) {
          console.log(e);
          res.render('register_error', {
            pageText: { errorMessage: 'There have been an error' },
            language: defaultText[req.params.language].language
          });
        }
      }
    } catch (e) {
      console.log(e);
      res.render('register_error', {
        pageText: { errorMessage: 'There have been an error' },
        language: defaultText[req.params.language].language
      });
    }
  }
};


exports.resetPwd = (req, res) => {
  res.render('reset_password', {
    title: 'Reset Password',
    csrfToken: req.csrfToken(),

    reset: defaultText[req.params.language].resetPasswordPage,
    language: defaultText[req.params.language].language,

  });
};

exports.resetPwdPost = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email });
  console.log(req.body, userFound)
  if (userFound) {
    const salt = 10;
    const password = getRandomString(8);
    const hash1 = await bcrypt.hash(password, salt);
    const updateUser = await User.updateOne({ email: req.body.email }, { $set: { password: hash1 } });
    try {
      resendPassword(userFound, password, req.params.language)
      res.render('reset_password_success', {
        reset: defaultText[req.params.language].resetPasswordPage,
        language: defaultText[req.params.language].language,

      })
    } catch(e){
      res.render('reset_password_success', {
              reset: defaultText[req.params.language].resetPasswordPage,
              language: defaultText[req.params.language].language,
            });
    }
  } else {
    res.render('reset_password', {
      title: 'Reset Password',
      reset: defaultText[req.params.language].resetPasswordPage,
      language: defaultText[req.params.language].language,
      msg: defaultText[req.params.language].resetPasswordPage.notRegisteredMessage,
      csrfToken: req.csrfToken()
    });
  }

};
