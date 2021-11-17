import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { baseURL } from './api';
import { Route, Routes } from 'react-router';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Todos from './components/Todos/Todos';
import Nav from './components/Navbar/Nav';
import Edit from './components/Todos/TodoEdit/Edit';
import Create from './components/Todos/TodoCreate/Create';
import NotFound from './components/NotFound/NotFound';

toast.configure();

function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		const checkedLoggedIn = async () => {
			try {
				const token = localStorage.getItem('token');
				if (token) {
					const verified = await axios({
						method: 'GET',
						withCredentials: true,
						url: `${baseURL}/auth/verify`,
						headers: {
							Authorization: token,
						},
					});
					setLoggedIn(verified.data);
					if (verified.data === false) {
						return localStorage.clear();
					}
				} else {
					setLoggedIn(false);
				}
			} catch (error) {
				console.log(error.message);
				setLoggedIn(false);
			}
		};
		checkedLoggedIn();
	}, []);

	return (
		<div className='App'>
			<Helmet>
				<title>Simple MERN TODO | Home</title>
				<meta
					name='description'
					content='This is simple but elegant MERN Todo List site'
				/>
				<meta
					name='keywords'
					content='React, MERN, MongoDB, Express,Todo List'
				/>
			</Helmet>

			{loggedIn ? (
				<>
					<Nav setLoggedIn={setLoggedIn} />
					<Routes>
						<Route
							path='/'
							element={
								<Todos
									loggedIn={loggedIn}
									setLoggedIn={setLoggedIn}
								/>
							}
						/>
						<Route path='/create' element={<Create />} />
						<Route path='/edit/:id' element={<Edit />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</>
			) : (
				<>
					<Routes>
						<Route
							path='/'
							element={<Login setLoggedIn={setLoggedIn} />}
						/>
						<Route
							path='/register'
							element={
								<Register setLoggedIn={setLoggedIn} />
							}
						/>
						<Route path='*' element={<NotFound />} />
					</Routes>
				</>
			)}
		</div>
	);
}

export default App;
