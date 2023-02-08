import {LOGIN, LOGOUT} from "../types/types";

const initialState = {
	isAuth: false
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN : {
			return {
				...state,
				isAuth: true
			}
		}
		case LOGOUT : {
			return {
				...state,
				isAuth: false
			}
		}
		default:
			return state
	}
}