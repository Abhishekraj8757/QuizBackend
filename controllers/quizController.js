const quizService = require('../services/quizService');
const errorHandler = require('../middlewares/errorHandler');

const createNewQuiz = async (req,res,next) => {
    try{
      let response = await quizService.createNewQuiz(req.body,req.user.userId)
      
      return res.status(response.status).json({
        status : response.status,
        message : response.message
      })
    }catch(error){
      return res.status(400).json({
        status : 400,
        message : error.message
      })
    }
}


const getQuizById = async (req,res,next) => {
   try{
     if(!req.params.quizId){
       return res.status(200).json({
         status : 200,
         message : 'Quiz Id not present!'
       })
     }
     const response = await quizService.getQuizById(req.params.quizId);

     res.status(200).json({
       status : response.status,
       message : response.message,
       data : response.data
     })
   }catch(error){
       return res.status(400).json({
          status  : response.status,
          message : response.message
       })
   }
}

module.exports = {
    createNewQuiz,
    getQuizById
}