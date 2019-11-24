import { GET_CATEGORIES,CREATE_CATEGORY, CATEGORY_LOADING} from '../actions/types.js';

const initialState = {
	categories: [],
	loading: false,
};

export default function(state=initialState, action) {
	switch(action.type) {
		case CATEGORY_LOADING:
			return {
				...state,
				loading: true,
			}
		case GET_CATEGORIES:
			return {
				...state,
				categories: action.payload,
				loading: false,
			}	
		case CREATE_CATEGORY:
			return {
				...state,
				categories: [...state.categories, action.payload],
				loading: false,
			}
		default:
			return {
				...state,
				loading:false
			};
	}
}