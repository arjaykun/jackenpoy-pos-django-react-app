import axios from 'axios';
import { GET_CATEGORIES, CREATE_CATEGORY, CATEGORY_LOADING } from './types';
import { createMessage } from './messages';
import createHeader from './createHeader';

export const getCategories = () => (dispatch, getState) => {

	// create header
	const config = createHeader(getState().auth.token);

	axios.get('api/categories', config)
		.then( res => {
				dispatch({
					type: GET_CATEGORIES,
					payload: res.data
				});
		})
		.catch(err => {
			console.log(err);
		})
}

export const createCategory = category => (dispatch, getState) => {

	// create header
	const config = createHeader(getState().auth.token);
	dispatch({type:CATEGORY_LOADING})
	axios.post('api/category/', category, config)
		.then( res => {
				dispatch(createMessage({categoryAdded:"A category is added successfully."}))
				dispatch({
					type: CREATE_CATEGORY,
					payload: res.data
				});
		})
		.catch(err => {
			console.log(err);
		})
}

