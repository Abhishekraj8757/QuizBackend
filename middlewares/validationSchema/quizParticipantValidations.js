const Joi = require('joi');

const startQuizById = Joi.object({
    password : Joi.string().required(),
    email: Joi.string().email().required(),
    name : Joi.string().required()
})

const submitQuizById = Joi.object({
    password : Joi.string().required(),
    email : Joi.string().email().required()
})

module.exports = {
   startQuizById,
   submitQuizById
}