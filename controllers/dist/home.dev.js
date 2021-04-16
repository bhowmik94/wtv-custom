"use strict";

/**
 * GET /
 * Home page.
 */
var defaultText = require('../config/languagesText');

var defaultConfig = require('../config/defaultConfig');

exports.home = function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (req.params.language === "english" || req.params.language === undefined) {
            res.render('home', {
              title: 'Home',
              msg: '',
              language: defaultText.english.language,
              pageText: defaultText.english.homePage,
              headerMenu: defaultText.english.menuHeader,
              footer: defaultConfig.socialMedia,
              titleHeader: defaultText[req.params.language].homePage.titleHeader,
              subHeader: defaultText[req.params.language].homePage.subHeader,
              dateHeader: defaultText[req.params.language].dateHeader,
              timeHeader: defaultText[req.params.language].timeHeader
            });
          } else {
            console.log(req.params.language);
            res.render('home', {
              title: 'Home',
              msg: '',
              language: defaultText[req.params.language].language,
              pageText: defaultText[req.params.language].homePage,
              headerMenu: defaultText[req.params.language].menuHeader,
              footer: defaultConfig.socialMedia,
              titleHeader: defaultText[req.params.language].titleHeader,
              subHeader: defaultText[req.params.language].homePage.subHeader,
              dateHeader: defaultText[req.params.language].dateHeader,
              timeHeader: defaultText[req.params.language].timeHeader
            });
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};