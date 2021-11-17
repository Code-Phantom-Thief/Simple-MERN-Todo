const Todo = require('../models/TodoList');

exports.getAllTodos = async (req, res) => {
	try {
		const todos = await Todo.find({ user_id: req.user.id });
		return res.status(200).json({
			todos,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

exports.createTodo = async (req, res) => {
	const { title, description, image } = req.body;
	try {
		const newTodo = new Todo({
			title,
			description,
			image,
			user_id: req.user.id,
			creator: req.user.name,
		});

		await newTodo.save();

		return res.status(200).json({
			message: 'Note created successfully!!!',
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

exports.deleteTodo = async (req, res) => {
	try {
		await Todo.findByIdAndDelete(req.params.id);
		return res.status(200).json({
			message: 'Todo deleted successfully!!!',
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

exports.updateTodo = async (req, res) => {
	const { title, description, image } = req.body;
	try {
		await Todo.findOneAndUpdate(
			{
				_id: req.params.id,
			},
			{
				title,
				description,
				image,
			}
		);
		return res.status(200).json({
			message: 'Todo updated successfully!!!',
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

exports.getATodo = async (req, res) => {
	try {
		const todo = await Todo.findById(req.params.id);
		if (!todo) {
			return res.status(404).json({
				message: 'Todo not found',
			});
		}
		return res.status(200).json({
			todo,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};
