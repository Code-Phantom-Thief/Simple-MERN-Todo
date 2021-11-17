import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Helmet } from 'react-helmet';
import {
	BrowserRouter,
} from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
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
			<App />
	</BrowserRouter>,
	document.getElementById('root')
);
