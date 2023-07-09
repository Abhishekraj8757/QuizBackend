const express = require('express');
const resultRouter = express.Router();
const resultController = require('../controllers/resultController');
const {isAuthenticated} = require('../middlewares/authentication');

resultRouter.get('/getAllParticipantsResults/:quizId',isAuthenticated(['admin']),resultController.getResultsOfAllParticipantsByQuizId);

module.exports = resultRouter;