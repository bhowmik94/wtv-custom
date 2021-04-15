const Resources = require('../models/Resource')
const User = require('../models/User')
const defaultText = require('../config/languagesText')
const defaultConfig = require('../config/defaultConfig')

exports.resources = async (req, res) => {
  const resourcesDocumentation = await Resources.find({});
  console.log(resourcesDocumentation)
  if (req.params.language === 'english' || req.params.language === undefined) {

    res.render('resources', {
      title: 'Resources',
      resources: resourcesDocumentation,
      language:defaultText.english.language,
      pageText:defaultText.english.resourcesPage,
      headerMenu:defaultText.english.menuHeader,
      csrfToken: req.csrfToken(),
      footer:defaultConfig.socialMedia,
      titleHeader: defaultText[req.params.language].resourcesPage.titleHeader,
      dateHeader: defaultText[req.params.language].dateHeader,
      timeHeader: defaultText[req.params.language].timeHeader
    });
  }
  else{
    res.render('resources', {
      title: 'Resources',
      resources: resourcesDocumentation,
      language:defaultText[req.params.language].language,
      pageText:defaultText[req.params.language].resourcesPage,
      headerMenu:defaultText[req.params.language].menuHeader,
      csrfToken: req.csrfToken(),
      footer:defaultConfig.socialMedia,
      titleHeader: defaultText[req.params.language].titleHeader,
      dateHeader: defaultText[req.params.language].dateHeader,
      timeHeader: defaultText[req.params.language].timeHeader
    });
  }
};


exports.resourceUpdatePost = async(req,res) => {

  const agendaUpdate = await Resources.updateResource(req.body)
  const resourcesDocumentation = await Resources.find({});
  const agendaPoints = await Agenda.find({});

  res.render('./manager', {
    title: 'Manager',
    language: 'english',
    footer:defaultConfig.socialMedia,
    agenda:agendaPoints,
    resources: resourcesDocumentation,
    csrfToken: req.csrfToken(),
  });

}


exports.resourcesUpdateDownload = async(req,res)=>{
  console.log(req.user.email)

  try{
    const g = await User.updateOne({email:req.user.email},{$push:{dowloadedResources :[req.body.resourceNameJson]}})
    console.log(g)
    res.status(200)
  }catch(e){
    res.status(400)
    console.log(e.message)
  }
}
