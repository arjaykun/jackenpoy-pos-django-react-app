import { GET_USERS, CREATE_USER, U_LOADING, 
	DELETE_USER, UPDATE_USER, GET_USER, USER_PASSWORD_CHANGE } from "../actions/types"

const initialState = {
	users: [],
	loading: false,
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
			} 
		case U_LOADING: 
			return {
				...state,
				loading: true
			}	
		case CREATE_USER:
			return {
				...state,
				users: [...state.users, action.payload],
				loading: false,
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
			}
		case DELETE_USER:
			return {
				...state,
				users: state.users.filter( u => u.id !== action.payload),
				loading: false,
			}
		case USER_PASSWORD_CHANGE:
			return {
				...state,
				loading: false,
			}
		default: 
			return state;
	}
}