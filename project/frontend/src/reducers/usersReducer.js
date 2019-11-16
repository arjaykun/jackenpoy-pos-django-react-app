import { GET_USERS, CREATE_USER, LOADING,UNLOADING, 
	DELETE_USER, UPDATE_USER, GET_USER } from "../actions/types"

const initialState = {
	users: [],
	loading: false,
	created: false,
	selectedUser: {},
}

export default function(state=initialState, action) {
	switch(action.type) {
		case GET_USERS:
			return {
				...state,
				users: action.payload,
				loading: false
			} 
		case GET_USER:
			return {
				...state,
				selectedUser: action.payload,
				loading: false
			} 
		case LOADING: 
			return {
				...state,
				loading: true
			}
		case UNLOADING: 
			return {
				...state,
				loading: false,
			}
		case CREATE_USER:
			return {
				...state,
				users: [...state.users, action.payload],
				loading: false,
				created: true,
			}	
		case UPDATE_USER:
			return {
				...state,
				users: state.users.map( u => {
					if(u.id === action.payload.id)
						return action.payload
					return u
				}),
				loading: false,
				created: true,
			}
		case DELETE_USER:
			return {
				...state,
				users: state.users.filter( u => u.id !== action.payload),
				loading: false,
			}
		default: 
			return state;
	}
}