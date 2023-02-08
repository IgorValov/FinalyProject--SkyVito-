import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./reducers/authReducer";
import {getUserReducer} from "./reducers/getUserReducer";
import {advImagesReducer} from "./reducers/advImagesReducer";
import {rerenderReducer} from "./reducers/rerenderReducer";

export const store = configureStore({
	reducer: {
		login: authReducer,
		getUser: getUserReducer,
		advImages: advImagesReducer,
		rerender: rerenderReducer,
	},
	middleware: [thunk],
})