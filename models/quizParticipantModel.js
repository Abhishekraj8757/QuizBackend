const mongoose = require('mongoose');

const quizParticipantSchema = new mongoose.Schema({
    quizId : {type : mongoose.Schema.Types.ObjectId,required : true},
    participantAnswers : [{
        questionId : { type : mongoose.Schema.Types.ObjectId},
        selectedOptions : {
            questionId : {type : mongoose.Schema.Types.ObjectId},
            selectedOption : [{
               optionId : {type : mongoose.Schema.Types.ObjectId}
            }]
        }
    }],
    quizScore : {type : Number, default : 0},
    isSubmitted : {type : Boolean, default : false},
    attemptTime : {type : Date},
    completionTime : {type : Date}
})

const quizParticipantModel = mongoose.model('quizParticipants',quizParticipantSchema);
module.exports = quizParticipantModel;