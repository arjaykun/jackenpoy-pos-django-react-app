import { GET_ERRORS, CLEAR_ERROR } from '../actions/types.js';

const initialState = {
	msg: {
		username: null,
		old_password: null,
		email: null,
	},
	status: 200,
	statusText: '',
};

export default function(state=initialState, action) {
	switch(action.type) {
		case GET_ERRORS:
			return {
				msg: action.payload.msg,
				status: action.payload.status,
				statusText: action.payload.statusText
			}
		case CLEAR_ERROR:
			return {
				...state,
				msg: {},
				status: 200,
				statusText: '',
			}
		default:
			return state;
	}
}