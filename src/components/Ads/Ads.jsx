import React from 'react';
import style from './style.module.css';
import Ad from "./Ad/Ad";

const Ads = ({ads}) => {

	return (
		<div className={style.adsContainer}>
			{ads.map(ad => (<Ad ad={ad} key={ad.id}/>))}
		</div>
	);
};

export default Ads;