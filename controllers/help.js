/**
 * GET /
 * Home page.
 */
const defaultText = require('../config/languagesText')
const defaultConfig = require('../config/defaultConfig')

exports.contact = (req, res) => {
  if (req.params.language === 'english' || req.params.language === undefined) {

    res.render('help', {
      title: 'Assistance',
      language:defaultText.english.language,
      pageText:defaultText[req.params.language].assistancePage,
      headerMenu:defaultText.english.menuHeader,
      footer:defaultConfig.socialMedia,

    });
  }
  else{
    res.render('help', {
      title: 'Assistance',
      pageText:defaultText[req.params.language].assistancePage,
      headerMenu:defaultText[req.params.language].menuHeader,
      language:defaultText[req.params.language].language,
      footer:defaultConfig.socialMedia,
    });
  }

};

