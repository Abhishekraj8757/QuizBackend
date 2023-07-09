const { json } = require('body-parser');
const quizModel = require('../models/quizModel');
const { parse } = require('dotenv');

const createNewQuiz = async (quizData,quizCreatorId) => {
    try{
   
    const quiz = new quizModel({
        title : quizData.title,
        creator : quizCreatorId,
        questions : quizData.questions,
        quizCreatedAt : Date.now()
      });
      
      await quiz.save();
      
      return {
        status : 201,
        message : 'New Quiz created!'
      }

    }catch(error){
       throw new Error(error.message);
    }
}


const getQuizById = async (quizId) => {
   let quizData = await quizModel.findOne({_id : quizId}).populate('creator',{_id : 0,name : 1,email : 1});
   return {
     status : 200,
     message : 'returns a particular quiz id data',
     data : quizData
   }
}

const getAllQuizzes = async (userId) => {
  let quizzesData = await quizModel.find({}).populate('creator',{_id : 0,name : 1,email : 1});

  return {
    status : 200,
    message : 'Returns all the quizzes!',
    data : quizzesData
  }
}
module.exports = {
    createNewQuiz,
    getQuizById,
    getAllQuizzes
}

