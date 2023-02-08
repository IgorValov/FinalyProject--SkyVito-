import React from 'react';
import style from './style.module.css';
import Header from "../../pages/Main/Header/Header";
import LogoPic from "../Logo/LogoPic";
import UiButton from "../UI/UiButton/UiButton";
import {useNavigate} from "react-router-dom";

const HeaderWithLogo = ({isAuth}) => {
	const navigate = useNavigate()

	return (
		<div className={style.container}>
			<Header isAuth={isAuth}/>
			<div className={style.block}>
				<LogoPic/>
				<UiButton onClick={() => navigate('/')}>Вернуться на главную</UiButton>
			</div>
		</div>
	);
};

export default HeaderWithLogo;