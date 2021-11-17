import './Register.css';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import RegisterImg from '../../image/signup.svg';
import { toast } from 'react-toastify';
import { baseURL } from '../../api';
import axios from 'axios';

const Register = () => {
	const [userData, setUserData] = useState({
		username: '',
		email: '',
		password: '',
	});

	let navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const registerUser = async (e) => {
		e.preventDefault();
		try {
			const newUser = await axios({
				method: 'POST',
				data: userData,
				withCredentials: true,
				url: `${baseURL}/auth/register`,
			});
			navigate('/', {replace:true});

			toast.success(newUser.data.message, {
				position: toast.POSITION.BOTTOM_RIGHT,
				theme: 'colored',
			});

			userData({
				username: '',
				email: '',
				password: '',
			});

			
		} catch (error) {
			error &&
				toast.error(error.response?.data.message, {
					position: toast.POSITION.BOTTOM_RIGHT,
					theme: 'colored',
				});
		}
	};

	return (
		<section className='signup'>
			<Helmet>
				<title>Simple MERN TODO | SIGNUP</title>
				<meta
					name='description'
					content='signup to Get Todo| Create Todo| Update Todo| Delete Todo'
				/>
			</Helmet>
			<div className='signup__container'>
				<div className='signup__left'>
					<img
						src={RegisterImg}
						alt='signup_image'
						className='signup__img'
					/>
				</div>
				<div className='signup__right'>
					<i className='fas fa-lock fa-2x signup__lock'></i>
					<h1>Sign up</h1>
					<form
						className='signup__form'
						onSubmit={registerUser}
					>
						<input
							className='signup__input'
							type='text'
							name='username'
							required
							placeholder='Username &nbsp;*'
							onChange={handleChange}
							value={userData.username}
						/>
						<input
							className='signup__input'
							type='email'
							name='email'
							required
							placeholder='Email Address &nbsp;*'
							onChange={handleChange}
							value={userData.email}
						/>
						<input
							className='signup__input'
							type='password'
							name='password'
							placeholder='Password &nbsp;*'
							required
							onChange={handleChange}
							value={userData.password}
						/>
						<button className='signup__btn'>Sign up</button>
					</form>
					<p>
						Already have an account? &nbsp;
						<span className='signup__signupBtn'>
							<Link to='/'>Login Now</Link>
						</span>
					</p>
				</div>
			</div>
		</section>
	);
};

export default Register;
