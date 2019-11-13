import { CREATE_MESSAGE, GET_ERRORS } from "./types"

export const createMessage = msg => {
	return {
		type: CREATE_MESSAGE,
		payload: msg
	}
}

export const createError = err => {
	return {
		type: GET_ERRORS,
		payload: {
			msg: err.data,
			status: err.status,
			statusText: err.statusText
		}
	}
}