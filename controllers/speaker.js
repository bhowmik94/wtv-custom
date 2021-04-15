const defaultText = require('../config/languagesText');
const defaultConfig = require('../config/defaultConfig');


exports.speaker = (req, res) => {
  res.render(`speakers/${req.params.language}/${req.params.speaker}`, {
    footer: defaultConfig.socialMedia,
    language: defaultText.english.language,
    headerMenu: defaultText.english.menuHeader,
    titleHeader: defaultText[req.params.language].titleHeader,
    dateHeader: defaultText[req.params.language].dateHeader,
    timeHeader: defaultText[req.params.language].timeHeader
  });
};


