const Agenda = require('../models/Agenda')
const Resources = require('../models/Resource')
const User = require('../models/User')
const defaultConfig = require('../config/defaultConfig')
const defaultText = require('../config/languagesText')


exports.manager = async (req, res) => {
    if(req.user.role ==="admin"){
        const agendaPoints = await Agenda.find({});
        const resources = await Resources.find({});
        const users = await User.find({});
        console.log(users.length)

        console.log(agendaPoints)
        res.render('manager', {
            csrfToken: req.csrfToken(),
            headerMenu:defaultText.english.menuHeader,
            resources,
            language:defaultText.english.language,
            pageText:defaultText.english.agendaPage,
            footer:defaultConfig.socialMedia,
            users:{
                usersList:users,
                userNumber:users.length
            },
            agenda:agendaPoints,

        })
    }
    else{
        res.send("You are not authorized")
    }

};


exports.userDelete = async (req, res) => {

    if(req.user.role ==="admin") {
        const agendaPoints = await Agenda.find({});
        const resources = await Resources.find({});
        const users = await User.find({});
        const user_deleted = await User.deleteOne({ _id: req.params.userId })

        console.log(user_deleted)

        console.log(agendaPoints)
        res.render('user_delete_confirm', {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            csrfToken: req.csrfToken(),
            headerMenu: defaultText.english.menuHeader,
            resources,
            language: defaultText.english.language,
            pageText: defaultText.english.agendaPage,
            footer: defaultConfig.socialMedia,


        })
    }

    else{
        res.send("You are not authorized")
    }
};
exports.searchUser = async (req, res) => {
    if(req.user.role ==="admin") {
        console.log(req.body.email)
        const agendaPoints = await Agenda.find({});
        const resources = await Resources.find({});
        const userList = await User.find({ email: req.query.email })
        console.log(req.user)
        res.render('manager', {
            csrfToken: req.csrfToken(),
            headerMenu: defaultText.english.menuHeader,
            resources,
            language: defaultText.english.language,
            pageText: defaultText.english.agendaPage,
            footer: defaultConfig.socialMedia,
            users: {
                usersList: userList,
                userNumber: userList.length
            },
            agenda: agendaPoints,

        })
    }
    else{
        res.send("You are not authorized")
    }
};
