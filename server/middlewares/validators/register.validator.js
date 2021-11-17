const Joi = require('joi');

const RegisterSchema = Joi.object({
	username: Joi.string().trim().max(30).required(),
	email: Joi.string().email().trim().max(200).required(),
	password: Joi.string().trim().min(6).required(),
});

module.exports = RegisterSchema;
