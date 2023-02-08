import {GET_USER_FAILURE, GET_USER_STARTED, GET_USER_SUCCESS} from "../types/types";

const initialState = {
	user: {},
	error: null
}

export const getUserReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_STARTED: {
			return {
				...state,
			}
		}
		case GET_USER_SUCCESS: {
			return {
				...state,
				user: action.payload,
				error: null
			}
		}
		case GET_USER_FAILURE: {
			return {
				...state,
				error: action.payload.error
			}
		}
		default:
			return state
	}
}