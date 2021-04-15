const defaultText = require('../config/languagesText')
const Agenda = require('../models/Agenda')
const defaultConfig = require('../config/defaultConfig')
const Resources = require('../models/Resource')

exports.agenda = async (req, res) => {
  const agendaPoints = await Agenda.find({});
  if(req.params.language === "english" || req.params.language === undefined){

    res.render('agenda', {
      title: 'Agenda',
      msg: '',
      language:defaultText.english.language,
      pageText:defaultText.english.agendaPage,
      headerMenu:defaultText.english.menuHeader,
      agenda:agendaPoints,
      footer:defaultConfig.socialMedia,
      titleHeader: defaultText[req.params.language].agendaPage.titleHeader,
      dateHeader: defaultText[req.params.language].dateHeader,
      timeHeader: defaultText[req.params.language].timeHeader
    });
  }
  else{
    console.log(req.params.language)
    res.render('agenda', {
      title: 'Agenda',
      msg: '',
      language:defaultText[req.params.language].language,
      pageText:defaultText[req.params.language].agendaPage,
      headerMenu:defaultText[req.params.language].menuHeader,
      agenda:agendaPoints,
      footer:defaultConfig.socialMedia,
      titleHeader: defaultText[req.params.language].titleHeader,
      dateHeader: defaultText[req.params.language].dateHeader,
      timeHeader: defaultText[req.params.language].timeHeader
    })
  }

};
exports.agendaUpdatePost = async(req,res) =>{

  const agendaUpdate = await Agenda.updateAgendaItems(req.body)
  res.redirect('/manager');


}

exports.agendaCreate = async(req,res) =>{
  
  let isBreak = false

  if(req.body.break === "on"){
    req.body.break = true
  }

  const agendaUpdate = await Agenda.createAgendaItems(req.body)
  res.redirect('/manager');


}

exports.agendaDelete = async(req,res) =>{

  const agendaUpdate = await Agenda.deleteAgendaItems(req.body)

  res.redirect('/manager');


}

