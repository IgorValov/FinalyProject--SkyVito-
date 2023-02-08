import React from 'react';
import style from "./style.module.css";

const AdSkeletons = () => {
	const countOfSkeletons = ['', '', '', '', '', '', '', '']
	return (
		<div className={style.adsContainer}>
			{countOfSkeletons.map(el => (
				<div className={style.adContainer} key={Math.random() * 10000}>
					<div className={style.img}/>
					<div className={style.title}/>
					<div className={style.price}/>
					<div className={style.description}>
						<div className={style.city}/>
						<div className={style.time}/>
					</div>
				</div>
			))}
		</div>

	);
};

export default AdSkeletons;