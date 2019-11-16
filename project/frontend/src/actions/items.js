import axios from 'axios';
import { GET_ITEMS, GET_ERRORS, FILTER_BY_CATEGORY } from './types';
import { createMessage } from './messages';
import createHeader from './createHeader';

export const getItems = () => (dispatch, getState) => {

	// create header
	const config = createHeader(getState().auth.token);

	console.log('getting items');
	 axios.get('api/items/',config)
	 	.then(res => {
	 		axios.get('api/categories/', config)
			.then( cat => {
		 		dispatch({
		 			type: GET_ITEMS,
		 			payload: {items: res.data, categories: cat.data} 
		 		});
			})
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
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


//filtering all items by its category
export const filterItemsByCategory = category_id => dispatch => {
	console.log('filtering items by categories by id ' + category_id);
	dispatch({
		type: FILTER_BY_CATEGORY,
		payload: category_id
	})
}

