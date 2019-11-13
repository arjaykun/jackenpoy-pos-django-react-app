import { GET_ITEMS, FILTER_BY_CATEGORY} from '../actions/types.js';

const initialState = {
	items: [],
	filtered_items: [],
	categories: [],
	loading: true,
};

export default function(state=initialState, action) {
	switch(action.type) {
		case GET_ITEMS:
			return {
				...state, 
				items: action.payload.items,
				categories: action.payload.categories,
				loading: false,
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