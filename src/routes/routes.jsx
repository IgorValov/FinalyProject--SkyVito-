import React from 'react'
import {Route, Routes} from 'react-router-dom'
import ProtectedRoute from "./ProtectedRoute";
import NotFound from '../pages/NotFound/NotFound'
import Main from "../pages/Main/Main";
import Profile from "../pages/Profile/Profile";
import AdvDescription from "../pages/AdvDescription/AdvDescription";
import SellerProfile from "../pages/SellerProfile/SellerProfile";
import {useSelector} from "react-redux";
import {authSelector} from "../store/selectors/authSelector";

const AppRoutes = () => {

	const isAuth = useSelector(authSelector)

	return (
		<Routes>
			<Route path="/" element={<Main isAuth={isAuth}/>}/>
			<Route path="/adv/:id" element={<AdvDescription/>}/>

			<Route element={<ProtectedRoute isAuth={isAuth}/>}>
				<Route path="/profile" element={<Profile/>}/>
				<Route path="/seller-profile/:id" element={<SellerProfile/>}/>
			</Route>

			<Route path="*" element={<NotFound/>}/>
		</Routes>
	)
}

export default AppRoutes
