const mongoose = require('mongoose');
const validator = require('validator');


const iconSchema = new mongoose.Schema({
    link:{
        type:String
    },

    visible:{
        type:Boolean,
        default: true
    }
})


const socialSchema = new mongoose.Schema({
    twitter:{
        Type:iconSchema
    },
    facebook:{
        Type:iconSchema
    },
    linkedin:{
        Type:iconSchema
    },
    instagram:{
        Type:iconSchema
    },
    youtube:{
        Type:iconSchema
    }
})


const Social = mongoose.model('Social', socialSchema);

module.exports = Social;
