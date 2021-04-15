/**
 * GET /
 * Home page.
 */
const defaultText = require('../config/languagesText')
const defaultConfig = require('../config/defaultConfig')

exports.home =async (req, res) => {

  if(req.params.language === "english" || req.params.language === undefined){

    res.render('home', {
      title: 'Home',
      msg: '',
      language:defaultText.english.language,
      pageText:defaultText.english.homePage,
      headerMenu:defaultText.english.menuHeader,
      footer:defaultConfig.socialMedia,
      titleHeader: defaultText[req.params.language].homePage.titleHeader,
      dateHeader: defaultText[req.params.language].dateHeader,
      timeHeader: defaultText[req.params.language].timeHeader
    });
  }
  else{
    console.log(req.params.language)
    res.render('home', {
      title: 'Home',
      msg: '',
      language:defaultText[req.params.language].language,
      pageText:defaultText[req.params.language].homePage,
      headerMenu:defaultText[req.params.language].menuHeader,
      footer:defaultConfig.socialMedia,
      titleHeader: defaultText[req.params.language].titleHeader,
      dateHeader: defaultText[req.params.language].dateHeader,
      timeHeader: defaultText[req.params.language].timeHeader
    })
  }
};
