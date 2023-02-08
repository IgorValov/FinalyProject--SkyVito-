import React from 'react'
import style from './style.module.css'
import {useNavigate} from "react-router-dom";


const LogoPic = () => {
	const navigate = useNavigate()

	return (
		<div className={style.logoPic} onClick={() => navigate('/')}/>
	);
};

export default LogoPic;