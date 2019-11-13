import axios from 'axios';
import { USER_LOADING, USER_LOADED, AUTH_ERROR, GET_ERRORS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS } from './types';
import { createMessage } from './messages';


// CHECK USER AND LOAD USER 

export const loadUser = () => (dispatch, getState) => {

	dispatch({ type: USER_LOADING })

	// get token from state
	const token = getState().auth.token;
	// set headers
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	// if token, add headers to config
	if(token) {
		config.headers['Authorization'] = `Token ${token}`;
	}

	axios.get('/api/auth/user', config)
		.then(res => {
			dispatch({
				type: USER_LOADED,
				payload: res.data
			})
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: {
					msg: err.response.data.detail,
					status: err.response.status,
					statusText: err.response.statusText
				}
			})
			dispatch({
				type: AUTH_ERROR
			})
		})
}

//LOGIN USER

export const login = (username, password) => (dispatch, getState) => {

	console.log('log in');
	// set headers
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	//request boy
	const body = JSON.stringify({username, password});

	axios.post('/api/auth/login', body, config)
		.then(res => {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			})
		})
		.catch(err => {
			dispatch({
				type: LOGIN_FAIL
			})
			dispatch({
				type: GET_ERRORS,
				payload: {
					msg: err.response.data.detail,
					status: err.response.status,
					statusText: err.response.statusText
				}
			})
		})
}


// LOGOUT USER 

export const logout = () => (dispatch, getState) => {

	console.log('log out');
	// get token from state
	const token = getState().auth.token;
	// set headers
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	// if token, add headers to config
	if(token) {
		config.headers['Authorization'] = `Token ${token}`;
	}

	axios.post('/api/auth/logout/', null, config)
		.then(res => {
			dispatch({
				type: LOGOUT_SUCCESS, 
			})
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: {
					msg: err.response.data.detail,
					status: err.response.status,
					statusText: err.response.statusText
				}
			})
		})
}
