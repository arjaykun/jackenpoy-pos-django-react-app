import { CREATE_ORDER, GET_ORDERS, ORDER_LOADING,
 COMPLETE_ORDER, UPDATE_ORDER, ORDER_DELETE, VIEW_ORDER_ITEMS } from '../actions/types.js';

const initialState = {
	orders: [],
	order_items: [],
	loading: false,
	payment: 0,
	change: 0,
};

export default function(state=initialState, action) {
	switch(action.type) {
		case ORDER_LOADING:
			return {
				...state,
				loading: true
			}
		case CREATE_ORDER:
			return {
				...state, 
				loading: false,
			}
		case GET_ORDERS:
			return {
				...state,
				orders: action.payload,
				loading: false,
			}	
		case COMPLETE_ORDER:
			return {
				...state,
				orders: state.orders.map(o => o.id === action.payload.id ? 
				action.payload : o ),
				loading: false,
			}
		case ORDER_DELETE:
			return {
				...state,
				orders: state.orders.filter(o => o.id !== action.payload),
				loading: false,
			}
		case VIEW_ORDER_ITEMS:
			return {
				...state,
				order_items: action.payload,
				loading: false,
			}
		default:
			return state;
	}
}