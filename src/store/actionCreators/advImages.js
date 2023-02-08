import {MANAGE_IMAGES} from "../types/types";

export const setAdvImages = (images) => ({
	type: MANAGE_IMAGES,
	payload: images
})
