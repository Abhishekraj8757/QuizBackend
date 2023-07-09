const participantModel = require('../models/quizParticipantModel');
const quizModel = require('../models/quizModel');


const startQuiz = async (quizId,participantId) => {
    try{
      const quiz = await quizModel.findOne({_id : quizId},{questions : 1}).populate('creator',{_id : 1});
      if(participantId === quiz.creator._id){
        return {
            status : 400,
            message : 'Creator can not take his own quiz!'
        }
      }

      const isQuizAlreadyTaken = participantModel.findOne({quizId : quizId,participantId : participantId},{quizCompleted : 1});
      if(isQuizAlreadyTaken.quizCompleted){
        return {
            status : 400,
            message : 'Quiz already submitted!'
        }
      }

      //number of attempts over case
      if(isQuizAlreadyTaken){
        return {
            status : 400,
            message : 'Number of attempts over!'
        }
      }

      let quizData = new participantModel({
         quizId,
         participantId,
         startTime : Date.now()
      })

      await quizData.save();
      
      return {
        status : 200,
        message : 'Quiz started successfully!'
      }
    }catch(error){
       throw new Error('Error in starting a quiz');
    }
}

const submitQuiz = async (participantAnswers,quizId,participantId) => {
    try{
      
        const participantQuizData = await participantModel.findOne({quizId : quizId,participantId : participantId},{quizCompleted : 1})
                                          .populate('quizId',{questions : 1});

        console.log(participantQuizData);
        if(!participantQuizData){
            return {
                status : 400,
                message : 'Participant did not started the quiz'
            }
        }

        if(participantQuizData?.quizCompleted){
            return {
                status : 400,
                message : 'Participant has already taken the test!'
            }
        }
       
        const creatorQuestions = participantQuizData.quizId.questions;
        const participantAnswersofQuiz = participantAnswers;

        let originalQuestionLookUp = new Map();
        creatorQuestions.forEach((question) => {
            originalQuestionLookUp.set(question._id.toString(),question.options);
        })
      
        let countofQuestionsCorrect = 0;
        participantAnswersofQuiz.forEach((participantAnswer) => {
            let questionId = participantAnswer.questionId.toString();
            if(originalQuestionLookUp.has(questionId)){
                let originalOptions = originalQuestionLookUp.get(questionId);
                let originalAnswerLookUp = new Set();
                originalOptions.forEach((option) => {
                    if(option.isOptionCorrect)originalAnswerLookUp.add(option._id.toString());
                })
             
                if(originalAnswerLookUp.size === participantAnswer.selectedOptions.length){
                    participantAnswer.selectedOptions.forEach((option) => {
                        if(originalAnswerLookUp.has(option.selectedOptionId.toString()))originalAnswerLookUp.delete(option.selectedOptionId.toString())
                    })
                }

                if(!originalAnswerLookUp.size)countofQuestionsCorrect++;
                

            }

        })

        await participantModel.findOneAndUpdate({quizId : quizId,participantId : participantId},{
            "completionTime" : Date.now(),
            "quizScore" : countofQuestionsCorrect,
            "quizCompleted" : true
        })
      
       return {
         status : 200,
         message : 'Quiz submitted succesffully!'
       }
    }catch(error){
       throw new Error('Error in submitting a quiz!');
    }
}


module.exports = {
    startQuiz,
    submitQuiz
}