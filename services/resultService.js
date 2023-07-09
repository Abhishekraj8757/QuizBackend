const quizModel = require('../models/quizModel');
const participantModel = require('../models/quizParticipantModel');

const getResultsOfAllParticipantsByQuizId = async (quizId,creatorId) => {
    try{
       //get all the participants who have completed the test
       //only the creator of the question has access to check the results of the participant
       //get the list of participants and their scores
       let getCreatorofQuiz = await quizModel.findOne({_id : quizId},{creator : 1});
       if(getCreatorofQuiz.creator !== creatorId){
         return {
            status : 400,
            message : 'Not authorised to check the result!'
         }
       }
       let participantsData = await participantModel.find({quizId : quizId},{quizScore : 1,quizCompleted : 1}).populate('participantId',{name : 1,email : 1});
       console.log(participantsData);
       let resultsofAllParticipants = participantsData.map((result) => {
           return {
              participantInfo : {
                name : result.participantId.name,
                email : result.participantId.email
              },
              quizCompleted,
              score : result.quizScore
           }
       });

       console.log(resultsofAllParticipants);

       return {
          status : 200,
          message : 'Results of all participants',
          data : resultsofAllParticipants
       }

    }catch(error){
       throw new Error(error.message);
    }
}


module.exports = {
   getResultsOfAllParticipantsByQuizId
}