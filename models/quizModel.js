const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const User = require('../models/userModel');

const quizSchema = new mongoose.Schema({
    title : {type : String},
    creator : {type: mongoose.Schema.Types.ObjectId, ref: User},
    questions : [{
        questionText : {type : String,required : true},
        options : [{
            optionText : {type : String,required : true},
            isOptionCorrect : {type : Boolean,default : false}
        }]
    }],
    quizCreatedAt : {type : Date,default : Date.now()}
})

const quizModel = mongoose.model('Quiz',quizSchema);
module.exports = quizModel;
