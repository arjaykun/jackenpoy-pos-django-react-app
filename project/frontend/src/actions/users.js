import axios from 'axios';
import { USER_LOADING, GET_USERS, CREATE_USER, UNLOADING,
	LOADING, DELETE_USER, UPDATE_USER, GET_USER} from './types';
import { createMessage, createError, clearError } from './messages';
import createHeader from './createHeader';

// CHECK USER AND LOAD USER 
export const getUsers = () => (dispatch, getState) => {

	// create header
	const config = createHeader(getState().auth.token);
	console.log('getting users');
	// create user data
	dispatch({type:LOADING});
	axios.get('api/users', config)
		.then(res => {
			dispatch({
				type: GET_USERS,
				payload: res.data	
			})
		})	
		.catch(err => {
			dispatch(createError(err.response));
		})
}

// GET SINGLE USER
export const getUser = user => (dispatch, getState) => {

	// create header
	const config = createHeader(getState().auth.token);
	console.log('getting single user');
	// create user data
	dispatch({type:LOADING});
	axios.get(`api/users/${user}`, config)
		.then(res => {
			dispatch({
				type: GET_USER,
				payload: res.data	
			})
		})	
		.catch(err => {
			dispatch(createError(err.response))
		})
}

export const createUser = user => (dispatch, getState) => {
	console.log('creating users');
	// create header
	const config = createHeader(getState().auth.token);

	dispatch({type:LOADING});
	axios.post('api/users', user, config)
		.then(res => {
			dispatch(createMessage({userAdded:'A user is created successfully.'}));				
			dispatch({
				type: CREATE_USER,
				payload: res.data
			})
		})
		.catch(err => {
			dispatch(createError(err.response));
			dispatch({type:UNLOADING});			
	
			clearError();
		})
}

export const updateUser = (user, id) => (dispatch, getState) => {
	console.log('updating user');
	// create header
	const config = createHeader(getState().auth.token);
	dispatch({type:LOADING});
	
	axios.put(`api/users/${id}`, user, config)
		.then(res => {
			dispatch(createMessage({userUpdated:'A user is updated successfully.'}));				
			dispatch({
				type: UPDATE_USER,
				payload: res.data
			});
			dispatch(clearError());
		})
		.catch(err => {
			dispatch(createError(err.response));
			dispatch({type:UNLOADING});
		})
}

export const deleteUser = user => (dispatch, getState) => {
	console.log('deleting user');
	// create header
	const config = createHeader(getState().auth.token);
	// create user data
	dispatch({type:LOADING});
	axios.delete(`api/users/${user}`, config)
		.then(res => {
			dispatch(createMessage({userDeleted:'A user is deleted successfully.'}));				
			dispatch({
				type: DELETE_USER,
				payload: user
			})
		})
		.catch(err => {
			dispatch(createError(err.response))
		})
}



