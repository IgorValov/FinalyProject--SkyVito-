import {GET_USER_FAILURE, GET_USER_STARTED, GET_USER_SUCCESS} from "../types/types";

export const getUserStarted = () => ({
	type: GET_USER_STARTED
})

export const getUserSuccess = (user) => ({
	type: GET_USER_SUCCESS,
	payload: user
})

export const getUserFailure = (error) => ({
	type: GET_USER_FAILURE,
	payload: error
})