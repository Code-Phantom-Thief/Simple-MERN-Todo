const Joi = require('joi');

const TodoSchema = Joi.object({
	title: Joi.string().trim().max(50).required(),
	description: Joi.string().trim().max(3000).required(),
	image: Joi.string().trim(),
});

module.exports = TodoSchema;
