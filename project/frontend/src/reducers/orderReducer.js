import { CREATE_ORDER } from '../actions/types.js';

const initialState = {
	loading: true,
	payment: 0,
	change: 0,
};

export default function(state=initialState, action) {
	switch(action.type) {
		case CREATE_ORDER:
			return {
				...state, 
				loading: true,
			}
		default:
			return state;
	}
}