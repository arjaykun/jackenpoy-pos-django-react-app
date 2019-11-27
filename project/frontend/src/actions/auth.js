import axios from 'axios';
import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_FAIL,
 LOGIN_SUCCESS, LOGOUT_SUCCESS, RESET_ATTEMPT } from './types';
import { createMessage, createError, clearError } from './messages';
import createHeader from './createHeader';

// CHECK USER AND LOAD USER 
export const loadUser = () => (dispatch, getState) => {

	dispatch({ type: USER_LOADING })

	// create header
	const config = createHeader(getState().auth.token);

	axios.get('/api/auth/user', config)
		.then(res => {
			dispatch({
				type: USER_LOADED,
				payload: res.data
			})
		})
		.catch(err => {
			dispatch(createError(err.response))
			dispatch({
				type: AUTH_ERROR
			})
		})
}

//LOGIN USER

export const login = (username, password) => dispatch => {

	console.log('log in');

	dispatch({ type: USER_LOADING });

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
			dispatch(clearError())
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			})
		})
		.catch(err => {
			dispatch({
				type: LOGIN_FAIL
			})
			dispatch(createError(err.response))
		})
}


// LOGOUT USER 

export const logout = () => (dispatch, getState) => {

	console.log('log out');

	// create header
	const config = createHeader(getState().auth.token);

	axios.post('/api/auth/logout/', null, config)
		.then(res => {
			dispatch({
				type: LOGOUT_SUCCESS, 
			})
		})
		.catch(err => {
			dispatch(createError(err.response))
		})
}


export const resetAttempt = () => dispatch  => {
	dispatch({type:RESET_ATTEMPT})
}

