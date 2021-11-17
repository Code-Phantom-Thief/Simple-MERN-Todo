const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
	{
		creator: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
			maxlength: 50,
		},
		description: {
			type: String,
			required: true,
			maxlength: 3000,
		},
		image: {
			type: String,
			trim: true,
			default:
				'https://images.unsplash.com/photo-1522199670076-2852f80289c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1472&q=80',
		},
		user_id: {
			type: String,
			required:true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Todo', TodoSchema);
