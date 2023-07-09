const quizModel = require('../models/quizModel');
const participantModel = require('../models/quizParticipantModel');
const resultService = require('../services/resultService');

const getResultsOfAllParticipantsByQuizId = async (req,res,next) => {
    try{
        if(!req.params.quizId){
            return res.status(400).json({
                status : 400,
                message : 'Quiz Id not present!'
            })
        }
       const response = await resultService.getResultsOfAllParticipantsByQuizId(req.params.quizId,req.user.userId);
       return res.status(200).json({
          status : response.status,
          message : response.message,
          data : response.data
       })

    }catch(error){
       res.status(400).json({
          status : error.status,
          message : error.message
       })
    }
}


module.exports = {
    getResultsOfAllParticipantsByQuizId
}