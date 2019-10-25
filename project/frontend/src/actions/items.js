import axios from 'axios';
import { GET_ITEMS, GET_ERRORS, FILTER_BY_CATEGORY } from './types';
import { createMessage } from './messages';

// GET ITEMS 
export const getItems = () => dispatch => {
	console.log('getting items');
	 axios.get('api/items/')
	 	.then(res => {
	 		axios.get('api/categories/')
			.then( cat => {
		 		dispatch({
		 			type: GET_ITEMS,
		 			payload: {items: res.data, categories: cat.data} 
		 		});
			})
			.catch(err => console.log(err))
	 	})
		.catch(err => console.log(err))
}


//filtering all items by its category
export const filterItemsByCategory = category_id => dispatch => {
	console.log('filtering items by categories by id ' + category_id);
	dispatch({
		type: FILTER_BY_CATEGORY,
		payload: category_id
	})
}


// export const getCategories = () => dispatch => {
// 	console.log('getting categories');
	
// }
