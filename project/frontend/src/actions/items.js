import axios from 'axios';
import { GET_ITEMS, FILTER_BY_CATEGORY, 
	CREATE_ITEM, ITEM_LOADING, UPDATE_ITEM, DELETE_ITEM } from './types';
import { createMessage, createError } from './messages';
import createHeader from './createHeader';

export const getItems = (url='api/items', all=false) => (dispatch, getState) => {

	// create header
	const config = createHeader(getState().auth.token);
	dispatch({type:ITEM_LOADING});
	console.log('getting items');
	 axios.get(url,config)
	 	.then(res => {
	 		axios.get('api/categories/', config)
			.then( cat => {
		 		dispatch({
		 			type: GET_ITEMS,
		 			payload: {
		 				items: all ? res.data : res.data.results, 
		 				next: all ? null : res.data.next,
		 				previous: all ? null : res.data.previous,
		 				count: all ? 0 : res.data.count,
		 				categories: cat.data
		 			} 
		 		});
			})
			.catch(err => {
				dispatch(createError(err.response))
			})
	 	})
		.catch(err => {
			dispatch(createError(err.response))
		})
}


//create new item
export const createItem = item => (dispatch, getState) => {
	// create header
	const config = createHeader(getState().auth.token);

	console.log('creating item')
	dispatch({type:ITEM_LOADING});
	axios.post('api/items/', item, config )
		.then( res=> {
			dispatch(createMessage({itemAdded:"An item is added successfully."}))
			dispatch({
				type: CREATE_ITEM,
				payload: res.data,
			})
		})
		.catch( err => {
			console.log(err);
		})
}

//updating item
export const updateItem = item => (dispatch, getState) => {
	// create header
	const config = createHeader(getState().auth.token);

	console.log('updating item')
	dispatch({type:ITEM_LOADING});
	axios.put(`api/items/${item.id}`, item,  config )
		.then( res=> {
			dispatch(createMessage({itemUpdated:"An item is updated successfully."}))
			dispatch({
				type: UPDATE_ITEM,
				payload: item,
			})
		})
		.catch( err => {
			console.log(err);
		})
}



//deleting item
export const deleteItem = item => (dispatch, getState) => {
	// create header
	const config = createHeader(getState().auth.token);

	console.log('deleting item')
	dispatch({type:ITEM_LOADING});
	axios.delete(`api/items/${item}`, config )
		.then( res=> {
			dispatch(createMessage({itemDeleted:"An item is deleted successfully."}))
			dispatch({
				type: DELETE_ITEM,
				payload: item,
			})
		})
		.catch( err => {
			console.log(err);
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

