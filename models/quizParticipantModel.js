const mongoose = require('mongoose');
const User = require('../models/userModel');
const Quiz = require('../models/quizModel');

const quizParticipantSchema = new mongoose.Schema({
    participantId : {type : mongoose.Schema.Types.ObjectId,ref : User},
    quizId : {type : mongoose.Schema.Types.ObjectId,ref : Quiz},
    quizScore : {type : Number},
    startTime : {type : Date},
    completionTime : {type : Date},
    quizCompleted : {type : Boolean,default : false}
})

const quizParticipantModel = mongoose.model('quizParticipants',quizParticipantSchema);
module.exports = quizParticipantModel;