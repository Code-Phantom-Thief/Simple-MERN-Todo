import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './Edit.css';
import { baseURL } from '../../../api';
import { toast } from 'react-toastify';

const Edit = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [todo, setTodo] = useState({
		title: '',
		description: '',
		image: '',
		id: '',
	});

	const hangleInput = (e) => {
		const { name, value } = e.target;
		setTodo({ ...todo, [name]: value });
	};

	const editTodo = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem('token');
			if (token) {
				const { title, description, image } = todo;
				const updateTodo = {
					title,
					description,
					image,
				};
				const data = await axios({
					method: 'PUT',
					withCredentials: true,
					url: `${baseURL}/todos/${id}`,
					data: updateTodo,
					headers: {
						Authorization: token,
					},
				});

				navigate('/');

				toast.success(data.data.message, {
					position: toast.POSITION.BOTTOM_RIGHT,
					theme: 'colored',
				});
			}
		} catch (error) {
			navigate('/');
		}
	};

	useEffect(() => {
		const getTodo = async () => {
			try {
				const token = localStorage.getItem('token');

				if (id && token) {
					const getATodo = await axios({
						method: 'GET',
						withCredentials: true,
						url: `${baseURL}/todos/${id}`,
						headers: {
							Authorization: token,
						},
					});

					setTodo({
						title: getATodo.data.todo.title,
						description: getATodo.data.todo.description,
						image: getATodo.data.todo.image,
					});
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		getTodo();
	}, [id]);

	return (
		<section className='edit'>
			<Helmet>
				<title>Simple MERN TODO | Edit</title>
				<meta
					name='description'
					content='Update your todolist'
				/>
				<meta
					name='keywords'
					content='React, MERN, MongoDB, Express,Todo List'
				/>
			</Helmet>
			<div className='edit__container'>
				<form autoComplete='off' onSubmit={editTodo}>
					<div className='edit__title'>
						<i className='far fa-edit fa-lg'></i>
						<h2>Update Todo</h2>
					</div>
					<div className='edit__div'>
						<h4>Image</h4>
						<img src={todo.image} alt={todo.title} />
						<input
							type='text'
							name='image'
							required
							value={todo.image}
							onChange={hangleInput}
						/>
					</div>
					<div className='edit__div'>
						<h4>Title</h4>
						<input
							type='text'
							name='title'
							required
							value={todo.title}
							onChange={hangleInput}
						/>
					</div>
					<div className='edit__div'>
						<h4>Description</h4>
						<textarea
							type='text'
							name='description'
							required
							value={todo.description}
							onChange={hangleInput}
							rows='10'
						/>
					</div>
					<button className='edit__btn'>Update</button>
				</form>
			</div>
		</section>
	);
};

export default Edit;
