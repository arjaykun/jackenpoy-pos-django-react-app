import axios from 'axios';
import { GET_CATEGORIES, CREATE_CATEGORY } from './types';
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
