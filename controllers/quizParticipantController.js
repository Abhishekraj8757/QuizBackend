const participantService = require('../services/quizParticipantService');


const startQuiz = async (req,res,next) => {
    try{
       let response = await participantService.startQuiz(req.params.quizId,req.user.userId);

       res.status(200).json({
            status : response.status,
            message : response.message,
            data : response.data
       })
    }catch(error){
       res.status(400).json({
          status : 400,
          message : error.message
       })
    }
}

const submitQuiz = async (req,res,next) => {
    try{
    //   console.log(req.body);
    //   console.log(req.body.participantAnswers);
      const response = await participantService.submitQuiz(req.body.participantAnswers,req.params.quizId,req.user.userId);
   
      return res.status(response.status).json({
        status : 200,
        message : response.message
      })
    }catch(error){
       res.status(400).json({
         status : 400,
         message : error.message
       })
    }
}


module.exports = {
    startQuiz,
    submitQuiz
}