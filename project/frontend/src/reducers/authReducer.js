import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL,
	LOGOUT_SUCCESS, RESET_ATTEMPT } from "../actions/types"

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	isLoading: false,
	user: null,
	attempt: 0
}

export default function(state=initialState, action) {
	switch(action.type) {
		case USER_LOADING:
			return {
				...state, 
				isLoading: true,
			} 
		case USER_LOADED:
			return {
				...state,
				isLoading: false,
				isAuthenticated: true,
				user: action.payload
			}
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				isLoading: false,
				attempt: 0,
			}
		case RESET_ATTEMPT: 
			return {
				...state,
				attempt : 0,
			}
		case AUTH_ERROR:
		case LOGOUT_SUCCESS:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				user: null,
				isLoading: false,
				isAuthenticated: false,
			}
		case LOGIN_FAIL:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				user: null,
				isLoading: false,
				isAuthenticated: false,
				attempt: state.attempt + 1
			}
		default: 
			return state;
	}
}