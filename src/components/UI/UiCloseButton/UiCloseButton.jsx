import React from 'react';
import style from './style.module.css'

const UiCloseButton = ({onClick}) => {
	return (
		<div className={style.closeButton} onClick={() => onClick()}/>
	);
};

export default UiCloseButton;