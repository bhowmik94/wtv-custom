"use strict";

var _ref;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require('mongoose');

var validator = require('validator');

var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema((_ref = {
  title: {
    type: String
  },
  firstName: {
    type: String
  },
  middleName: {
    type: String
  },
  password: {
    type: String
  },
  lastName: {
    type: String
  }
}, _defineProperty(_ref, "title", {
  type: String
}), _defineProperty(_ref, "email", {
  unique: true,
  type: String,
  trim: true,
  required: true,
  lowercase: true,
  validate: function validate(value) {
    if (!validator.isEmail(value)) {
      throw new Error('The email format is invalid, should be your email address');
    }
  }
}), _defineProperty(_ref, "location", {
  type: String
}), _defineProperty(_ref, "company", {
  type: String
}), _defineProperty(_ref, "role", {
  type: String,
  "default": 'user'
}), _defineProperty(_ref, "dob", {
  // Date of Birth
  type: Date
}), _defineProperty(_ref, "address", {
  type: String
}), _defineProperty(_ref, "question", {
  type: String
}), _defineProperty(_ref, "requirements", {
  type: String
}), _defineProperty(_ref, "registeredAt", {
  type: Date,
  "default": Date.now
}), _defineProperty(_ref, "accessAt", {
  type: Date,
  "default": Date.now
}), _defineProperty(_ref, "dowloadedResources", {
  type: [String]
}), _ref));
/**
 * Password hash middleware.
 */

/**
 * Helper method for validating user's password.
 */

userSchema.statics.findByCredentials = function _callee(req, email, password) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.body);

          if (!(password === 'WTVGLOBAL2020')) {
            _context.next = 15;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context.sent;
          console.log(user);

          if (!user) {
            _context.next = 12;
            break;
          }

          user.accessAt = Date.now();
          user.save();
          return _context.abrupt("return", {
            statusCode: 200,
            message: 'Authorized'
          });

        case 12:
          return _context.abrupt("return", {
            statusCode: 500,
            message: 'your username or password is not recognized'
          });

        case 13:
          _context.next = 16;
          break;

        case 15:
          return _context.abrupt("return", {
            statusCode: 500,
            message: 'your username or password is not recognized'
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
};

userSchema.plugin(passportLocalMongoose);
var User = mongoose.model('User', userSchema);
module.exports = User;