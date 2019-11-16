import { CREATE_MESSAGE, GET_ERRORS, CLEAR_ERROR } from "./types"

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

export const clearError = () => {
	return {
		type: CLEAR_ERROR,
	}
}
