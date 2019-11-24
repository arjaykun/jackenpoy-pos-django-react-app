import { GET_CATEGORIES,CREATE_CATEGORY, 
	CATEGORY_LOADING, DELETE_CATEGORY, UPDATE_CATEGORY} from '../actions/types.js';

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
		case UPDATE_CATEGORY:
			return {
				...state,
				categories: state.categories.map( cat => (cat.id === action.payload.id ? 
					action.payload: cat
					)),
				loading: false,
			}
		case DELETE_CATEGORY:
			return {
				...state,
				categories: state.categories.filter( c => c.id !== action.payload), 
				loading: false,
			}
		default:
			return {
				...state,
				loading:false
			};
	}
}