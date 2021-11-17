import './Create.css';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { baseURL } from '../../../api';
import { toast } from 'react-toastify';

const Create = () => {
	const [todo, setTodo] = useState({
		title: '',
		description: '',
		image: '',
		id: '',
	});

	const navigate = useNavigate();

	const hangleInput = (e) => {
		const { name, value } = e.target;
		setTodo({ ...todo, [name]: value });
	};

	const createTodo = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem('token');
			if (token) {
				const { title, description, image } = todo;
				const newTodo = {
					title,
					description,
					image,
				};
				const data = await axios({
					method: 'POST',
					withCredentials: true,
					url: `${baseURL}/todos`,
					data: newTodo,
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

	return (
		<section className='create'>
			<Helmet>
				<title>Simple MERN TODO | Create</title>
				<meta
					name='description'
					content='Create your new todo list'
				/>
				<meta
					name='keywords'
					content='React, MERN, MongoDB, Express,Todo List'
				/>
			</Helmet>
			<div className='create__container'>
				<form autoComplete='off' onSubmit={createTodo}>
					<div className='create__title'>
						<i className='far fa-edit fa-lg'></i>
						<h2>Create Todo</h2>
					</div>
					<div className='create__div'>
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
					<div className='create__div'>
						<h4>Title</h4>
						<input
							type='text'
							name='title'
							required
							value={todo.title}
							onChange={hangleInput}
						/>
					</div>
					<div className='create__div'>
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
					<button className='create__btn'>Create Todo</button>
				</form>
			</div>
		</section>
	);
};

export default Create;
