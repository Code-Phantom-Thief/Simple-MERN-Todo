const Joi = require('joi');

const LoginSchema = Joi.object({
    email: Joi.string().email().trim().max(200).required(),
    password: Joi.string().trim().min(6).required(),
})

module.exports = LoginSchema;