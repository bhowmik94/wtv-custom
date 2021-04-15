const defaultText = require('../config/languagesText')
const defaultConfig = require('../config/defaultConfig')

exports.presenters = (req, res) => {
  if(req.params.language === "english" || req.params.language === undefined){
    res.render('speakers', {
      title: 'Speakers',
      language:defaultText.english.language,
      pageText:defaultText.english.agendaPage,
      headerMenu:defaultText.english.menuHeader,
      footer:defaultConfig.socialMedia,
      titleHeader: defaultText[req.params.language].titleHeader,
      dateHeader: defaultText[req.params.language].dateHeader,
      timeHeader: defaultText[req.params.language].timeHeader

    });
  } else {
    res.render('agenda',{
      title: 'Live',
      msg: '',
      language:defaultText[req.params.language].language,
      pageText:defaultText[req.params.language].agendaPage,
      headerMenu:defaultText[req.params.language].menuHeader,
      footer:defaultConfig.socialMedia,
      titleHeader: defaultText[req.params.language].titleHeader,
      dateHeader: defaultText[req.params.language].dateHeader,
      timeHeader: defaultText[req.params.language].timeHeader

    });
  }
};
