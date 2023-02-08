import {RERENDER} from "../types/types";

const initialState = {
	rerender: 1
}

export const rerenderReducer= (state = initialState, action) => {
	switch (action.type) {
		case RERENDER : {
			const rerender = state.rerender + 1
			return {
				...state,
				rerender
			}
		}
		default:
			return state
	}
}