const defaultText = require('../config/languagesText')
const defaultConfig = require('../config/defaultConfig')

exports.eventbrite =async (req, res) => {

  if(req.params.language === "english" || req.params.language === undefined){

    res.render('eventbrite', {
      title: 'Tickets',
      msg: '',
      language:defaultText.english.language,
      headerMenu:defaultText.english.menuHeader,
      pageText: defaultText.english.registerPage,
      footer:defaultConfig.socialMedia
    });
  }
  else{
    console.log(req.params.language)
    res.render('eventbrite', {
      title: 'Tickets',
      msg: '',
      language:defaultText[req.params.language].language,
      headerMenu:defaultText[req.params.language].menuHeader,
      pageText: defaultText[req.params.language].registerPage,
      footer:defaultConfig.socialMedia
    })
  }
};
