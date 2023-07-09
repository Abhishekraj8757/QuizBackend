const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const userValidator = require('../middlewares/validationSchema/userValidation');
const validateRequest = require('../middlewares/validateRequest');

userRouter.post('/signup', validateRequest(userValidator.signUpUserValidationSchema), userController.signUp);

userRouter.post('/signin', validateRequest(userValidator.signInUserValidationSchema), userController.signIn);

module.exports = userRouter;