import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Nav.css';

const Nav = ({ setLoggedIn }) => {
	const logout = () => {
		localStorage.clear();
		setLoggedIn(false);
	};
	return (
		<nav className='nav'>
			<Helmet>
				<title>Simple MERN TODO | Nav</title>
				<meta
					name='description'
					content='This is simple but elegant MERN Todo List site'
				/>
				<meta
					name='keywords'
					content='React, MERN, MongoDB, Express,Todo List'
				/>
			</Helmet>

			<div className='nav__left'>
				<h1 className='nav__title'><Link to="/">Simple MERN Todo</Link></h1>
			</div>
			<div className='nav__right'>
				<ul className='nav__rightUl'>
					<li>
						<Link to='/create'>Create</Link>
					</li>
					<li onClick={logout}>
						<Link to='/'>Logout</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
