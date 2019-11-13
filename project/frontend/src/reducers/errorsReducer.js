import { GET_ERRORS } from '../actions/types.js';

const initialState = {
	msg: null,
	status: 0,
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
		default:
			return state;
	}
}