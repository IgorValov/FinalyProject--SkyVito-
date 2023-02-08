import React from 'react';
import style from "./style.module.css";

const UiCloseIcon = ({onClick}) => {
	return (
		<div className={style.closeButton} onClick={() => onClick()}/>
	);
};

export default UiCloseIcon;