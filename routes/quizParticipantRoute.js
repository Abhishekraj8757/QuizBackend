const express = require('express');
const participantRoute = express.Router();
const participantController = require('../controllers/quizParticipantController');
const {isAuthenticated} = require('../middlewares/authentication');

participantRoute.post('/startQuiz/:quizId', isAuthenticated(['participant']),participantController.startQuiz);

participantRoute.post('/submitQuiz/:quizId', isAuthenticated(['participant']),participantController.submitQuiz);

module.exports = participantRoute;
