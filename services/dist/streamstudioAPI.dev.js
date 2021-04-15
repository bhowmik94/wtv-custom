"use strict";

var request = require('request');

var Promise = require('bluebird');

var env = require('dotenv').config();

var _require = require('../config/configStreamStudio'),
    ststRootApiUrl = _require.ststRootApiUrl,
    ststRootHostName = _require.ststRootHostName;

var ststAuth = function ststAuth() {
  return new Promise(function (resolve, reject) {
    var options = {
      method: 'PUT',
      url: ststRootApiUrl + "user/login",
      body: {
        userName: process.env.STREAMSTUDIOAPIUSER,
        password: process.env.STREAMSTUDIOAPIPASSWORD,
        applicationId: process.env.STREAMSTUDIOAPPLICATIONID
      },
      headers: {
        Host: ststRootHostName,
        'Content-Type': "application/json"
      },
      json: true
    };
    request(options, function (err, res, body) {
      resolve({
        statusCode: res.statusCode,
        token: res.body.access_token
      });
      reject({
        statusCode: res.body.code,
        message: res.body.message
      });
    });
  });
};

exports.registerUser = function _callee2(body, img) {
  var webcastID;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          webcastID = process.env.STREAMSTUDIOWEBCASTID;
          return _context2.abrupt("return", new Promise(function _callee(resolve, reject) {
            var token, options, response;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(ststAuth());

                  case 2:
                    token = _context.sent;
                    options = {
                      method: 'POST',
                      url: ststRootApiUrl + "/event/".concat(webcastID, "/registraton/"),
                      headers: {
                        Host: ststRootHostName,
                        Authorization: "Bearer ".concat(token.token),
                        'Content-Type': "application/json"
                      },
                      body: {
                        firstname: body.firstName,
                        lastname: body.lastName,
                        jobtitle: "Default",
                        company: body.company,
                        country: body.country,
                        email: body.email
                      },
                      json: true
                    };
                    _context.next = 6;
                    return regeneratorRuntime.awrap(request(options, function (err, res, body) {
                      if (res.body) {
                        resolve({
                          message: 'success',
                          code: 200,
                          body: res.body.body
                        });
                      } else {
                        reject({
                          message: 'failure',
                          code: 500,
                          body: res.body.message
                        });
                      }
                    }));

                  case 6:
                    response = _context.sent;

                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getUser = function _callee4(body) {
  var webcastID;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          webcastID = process.env.STREAMSTUDIOWEBCASTID;
          return _context4.abrupt("return", new Promise(function _callee3(resolve, reject) {
            var token, options, response;
            return regeneratorRuntime.async(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return regeneratorRuntime.awrap(ststAuth());

                  case 2:
                    token = _context3.sent;
                    options = {
                      method: 'GET',
                      url: ststRootApiUrl + "/event/".concat(webcastID, "/user/").concat(body.email),
                      headers: {
                        Host: ststRootHostName,
                        Authorization: "Bearer ".concat(token.token),
                        'Content-Type': "application/json"
                      },
                      json: true
                    };
                    _context3.next = 6;
                    return regeneratorRuntime.awrap(request(options, function (err, res, body) {
                      if (res.body) {
                        resolve({
                          message: 'success',
                          code: 200,
                          body: res.body
                        });
                      } else {
                        reject({
                          message: 'failure',
                          code: 500,
                          body: res.body.message
                        });
                      }
                    }));

                  case 6:
                    response = _context3.sent;

                  case 7:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          }));

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
};