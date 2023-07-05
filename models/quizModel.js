const mongoose = require('mongoose');
const User = require('../models/userModel');

const quizSchema = new mongoose.Schema({
    _id : {type : mongoose.Schema.Types.ObjectId},
    title : {type : String},
    creator : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    questions : [{
        questionId: {type : mongoose.Schema.Types.ObjectId},
        questionText : {type : String,required : true},
        options : [{
            optionId : {type : mongoose.Schema.Types.ObjectId},
            optionText : {type : String,required : true},
            isOptionCorrect : {type : Boolean,default : false}
        }]
    }]
   
})

const quizModel = mongoose.model('Quiz',quizSchema);
module.exports = quizModel;
