const mongoose = require('mongoose');
const validator = require('validator');


const resourcesSchema = new mongoose.Schema({

    name:{
        type:String,
        max:100
    },

    description:{
        type:String,
        max:200
    },
    downloadLink:{
        type:String,
        max:300
    },
    language:{
        type:String
    },
    visible:{
        type:Boolean,
        default:true
    }
})

exports.resourceUpdatePost = async(req,res) => {

    const agendaUpdate = await Resources.updateResource(req.body)
    const resourcesDocumentation = await Resources.find({});
    const socialIcons = await Social.find({});
    const agendaPoints = await Agenda.find({});

    res.render('./manager', {
        title: 'Manager',
        language: 'english',
        setting: defaults,
        social: socialIcons,
        agenda:agendaPoints,
        resources: resourcesDocumentation,
        csrfToken: req.csrfToken(),
    });

}


exports.resourcesUpdateDownload = async(req,res)=>{

    try{
        const g = await User.updateOne({email:req.session.user[0].email},{$push:{dowloadedResources :[req.body.resourceNameJson]}})
        console.log(g)
        res.status(200)
    }catch(e){
        res.status(400)
    }
    console.log(req.session.user)
    console.log(req.body)
}



const Resource = mongoose.model('Resource', resourcesSchema);

module.exports = Resource;



