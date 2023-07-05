const Joi = require('joi');

const validateUserRequest = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    const errors = validationResult.error.details.map((error) => error.message.replace(/\"/g, ''));
    return res.status(400).json({ errors });
  }

  // Validation succeeded
  next();
};

module.exports = validateUserRequest;






