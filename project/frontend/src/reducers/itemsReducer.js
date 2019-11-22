import { GET_ITEMS, FILTER_BY_CATEGORY, 
	CREATE_ITEM, ITEM_LOADING, DELETE_ITEM, UPDATE_ITEM} from '../actions/types.js';

const initialState = {
	items: [],
	filtered_items: [],
	categories: [],
	loading: false,
};

export default function(state=initialState, action) {
	switch(action.type) {
		case ITEM_LOADING:
			return {
				...state,
				loading: true
			}
		case GET_ITEMS:
			return {
				...state, 
				items: action.payload.items,
				categories: action.payload.categories,
				loading: false,
			}
		case CREATE_ITEM: {
			return {
				...state,
				items: [...state.items, action.payload],
			}
		}
		case DELETE_ITEM: {
			return {
				...state,
				items: state.items.filter( i => i.id !== action.payload),
				loading: false,
			}
		}
		case UPDATE_ITEM: {
			return {
				...state,
				items: state.items.map( i => (
					i.id === action.payload.id ? action.payload: i)),
				loading: false,
			}
		}
		case FILTER_BY_CATEGORY:
			return {
				...state,
				filtered_items: state.items.filter( i => i.category === action.payload),
				loading: false,
			}
		default:
			return {
				...state,
				loading:false
			};
	}
}