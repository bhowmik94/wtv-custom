const defaultText = require('../config/languagesText')
const defaultConfig = require('../config/defaultConfig')

exports.live = (req, res) => {
  if(req.params.language === "english" || req.params.language === undefined){
    res.render('live', {
      title: 'Live',
      msg: '',
      language:defaultText.english.language,
      pageText:defaultText.english.livePage,
      headerMenu:defaultText.english.menuHeader,
      webcastTicket: process.env.STREAMSTUDIOTICKET,
      footer:defaultConfig.socialMedia,
      titleHeader: defaultText[req.params.language].titleHeader,
      dateHeader: defaultText[req.params.language].dateHeader,
      timeHeader: defaultText[req.params.language].timeHeader
    });
  }
  else{
    console.log(defaultText[req.params.language].menuHeader)
    res.render('live', {
      title: 'Live',
      msg: '',
      language:defaultText[req.params.language].language,
      pageText:defaultText[req.params.language].livePage,
      headerMenu:defaultText[req.params.language].menuHeader,
      webcastTicket: process.env.STREAMSTUDIOTICKET,
      footer:defaultConfig.socialMedia,
      titleHeader: defaultText[req.params.language].titleHeader,
      dateHeader: defaultText[req.params.language].dateHeader,
      timeHeader: defaultText[req.params.language].timeHeader

    })
  }
};
