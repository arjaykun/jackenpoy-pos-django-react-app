import axios from 'axios';
import { GET_CATEGORIES, CREATE_CATEGORY, CATEGORY_LOADING, 
	DELETE_CATEGORY, UPDATE_CATEGORY } from './types';
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

export const updateCategory = category => (dispatch, getState) => {
	console.log("updating category");
	// create header
	const config = createHeader(getState().auth.token);
	dispatch({type:CATEGORY_LOADING})
	axios.put(`api/categories/${category.id}`, category, config)
		.then( res => {
				dispatch(createMessage({categoryUpdated:"A category is updated successfully."}))
				dispatch({
					type: UPDATE_CATEGORY,
					payload: res.data
				});
		})
		.catch(err => {
			console.log(err);
		})
}


export const deleteCategory = category => (dispatch, getState) => {
	console.log("deleting category");
	// create header
	const config = createHeader(getState().auth.token);
	dispatch({type:CATEGORY_LOADING})
	axios.delete(`api/categories/${category}`, config)
		.then( res => {
				dispatch(createMessage({categoryDeleted:"A category is deleted successfully."}))
				dispatch({
					type: DELETE_CATEGORY,
					payload: category
				});
		})
		.catch(err => {
			console.log(err);
		})
}



