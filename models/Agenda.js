const mongoose = require('mongoose');
const validator = require('validator');


const agendaSchema = new mongoose.Schema({

    start: {
        type: String,
        max: 50
    },
    end: {
        type: String,
        max: 50
    },

    agenda: {
        type: String,
        max: 500
    },
    break:{
        type:Boolean,
        default:false
      },
    speakers: {
        type: [String],
        max: 200
    },

})


agendaSchema.statics.updateAgendaItems = async (body) => {
    console.log(body.speakers.split(','))
    body.speakers = body.speakers.split(',')

    const agendaItem = await Agenda.findOne({_id: body.id})

    const agenda = await Agenda.updateOne({_id: body.id}, body)

}

agendaSchema.statics.createAgendaItems = async (body) => {

        console.log(typeof(body.position))
        if(body.position ===! ''){

        }
        let speakersArray = body.speakers.split(';')
        speakersArray.forEach((d)=>{
            d.replace(';', '')
        })
        body.speakers = speakersArray
        console.log(body)
        const agenda = await Agenda.create(body)
}

agendaSchema.statics.deleteAgendaItems = async (body) => {

        const agenda = await Agenda.deleteOne({_id:body.id})
}

const Agenda = mongoose.model('Agenda', agendaSchema);

module.exports = Agenda;
