import { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../api';
import './Todos.css';
import { format } from 'date-fns';

const Todos = () => {
	const [todos, setTodos] = useState([]);
	const [token, setToken] = useState('');
	const navigate = useNavigate();

	const getAllTodos = async (token) => {
		const todosData = await axios({
			method: 'GET',
			url: `${baseURL}/todos`,
			headers: {
				Authorization: token,
			},
		});
		setTodos(todosData.data.todos);
	};

	const deleteTodo = async (id) => {
		try {
			await axios({
				method: 'DELETE',
				withCredentials: true,
				url: `${baseURL}/todos/${id}`,
				headers: {
					Authorization: token,
				},
			});
			getAllTodos(token);
		} catch (error) {
			navigate('/');
		}
	};

	useEffect(() => {
		const token = localStorage.getItem('token');
		setToken(token);
		if (token) {
			getAllTodos(token);
		}
	}, []);
	return (
		<section className='todos'>
			<div className='todos__card'>
				{todos.map((todo) => (
					<div className='todo__card' key={todo._id}>
						<img src={todo.image} alt={todo.title} />
						<div className='todo__title'>
							<h4>{todo.title}</h4>
							<p>
								{format(
									new Date(todo.updatedAt),
									'dd/MM/yyyy'
								)}
							</p>
						</div>
						<div className='todo__description'>
							<p>{todo.description}</p>
						</div>
						<div className='card__footer'>
							<p>Created by {todo.creator}</p>
							<div className='card__icons'>
								<Link to={`/edit/${todo._id}`}>
									<i className='fas fa-edit'></i>
								</Link>
								<i
									className='fas fa-trash-alt'
									onClick={() => deleteTodo(todo._id)}
								></i>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Todos;
