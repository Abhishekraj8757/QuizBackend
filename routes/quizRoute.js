const express = require('express');
const quizRouter = express.Router();
const quizController = require('../controllers/quizController');
const {isAuthenticated} = require('../middlewares/authentication');
const validateRequest = require('../middlewares/validateRequest');
const quizValidationSchema = require('../middlewares/validationSchema/quizValidation');

quizRouter.post('/createQuiz', isAuthenticated(['creator']), quizController.createNewQuiz);

quizRouter.get('/getQuiz/:quizId', isAuthenticated(['creator,participant']),  quizController.getQuizById);


module.exports = quizRouter;