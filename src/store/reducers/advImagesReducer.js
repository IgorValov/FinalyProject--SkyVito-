import {MANAGE_IMAGES} from "../types/types";

const initialState = {
	images: [null, null, null, null, null]
}

export const advImagesReducer = (state = initialState, action) => {
	switch (action.type) {
		case MANAGE_IMAGES : {
			return {
				...state,
				images: action.payload
			}
		}
		default:
			return state
	}
}