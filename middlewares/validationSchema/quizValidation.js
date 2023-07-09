const Joi = require('joi');

const createQuizSchema = Joi.object({
  title: Joi.string().required(),
  questions: Joi.array().items(
    Joi.object({
    //   questionId: Joi.string().required(),
      questionText: Joi.string().required(),
      options: Joi.array().items(
        Joi.object({
        //   optionId: Joi.string().required(),
          optionText: Joi.string().required(),
          isOptionCorrect: Joi.boolean().default(false),
        })
      ),
    })
  )
})


module.exports = {
    createQuizSchema
}