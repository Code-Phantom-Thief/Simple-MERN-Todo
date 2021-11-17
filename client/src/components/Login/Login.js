import './Login.css';
import { Helmet } from 'react-helmet';
import LoginImg from '../../image/login.svg';
import axios from 'axios';
import { useState } from 'react';
import { Link} from 'react-router-dom'
import { baseURL } from '../../api';
import { toast } from 'react-toastify';

const Login = ({ setLoggedIn }) => {

	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const loginChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const loginSubmit = async (e) => {
		e.preventDefault();
		try {
			const loginUser = await axios({
				method: 'POST',
				withCredentials: true,
				data: user,
				url: `${baseURL}/auth/login`,
			});
			localStorage.setItem('token', loginUser.data.token);
			toast.success(loginUser.data.message, {
				position: toast.POSITION.BOTTOM_RIGHT,
				theme: 'colored',
			});
			setLoggedIn(true);
		} catch (error) {
			error &&
				toast.error(error.response?.data.message, {
					position: toast.POSITION.BOTTOM_RIGHT,
					theme: 'colored',
				});
		}
	};

	return (
			<section className='login'>
				<Helmet>
					<title>Simple MERN TODO | LOGIN</title>
					<meta
						name='description'
						content='Login to Get Todo| Create Todo| Update Todo| Delete Todo'
					/>
				</Helmet>
				<div className='login__container'>
					<div className='login__left'>
						<img
							src={LoginImg}
							alt='login_image'
							className='login__img'
						/>
					</div>
					<div className='login__right'>
						<i className='fas fa-lock fa-2x login__lock'></i>
						<h1>Login</h1>
						<form
							className='login__form'
							onSubmit={loginSubmit}
						>
							<input
								className='login__input'
								type='email'
								name='email'
								required
								placeholder='Email Address &nbsp;*'
								onChange={loginChange}
							/>
							<input
								className='login__input'
								type='password'
								name='password'
								placeholder='Password &nbsp;*'
								required
								onChange={loginChange}
							/>
							<button className='login__btn'>Log in</button>
						</form>
						<p>
							Don't have an account?{' '}
							<span
								className='login__signupBtn'
						>
							<Link to="/register">
								Sign UP
								</Link>
							</span>
						</p>
					</div>
				</div>
			</section>
	);
};

export default Login;
