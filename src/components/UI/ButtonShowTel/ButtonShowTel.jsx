import React, {useState} from 'react';
import UiButton from "../UiButton/UiButton";

const ButtonShowTel = ({tel, isAuth}) => {
	const [visibleTel, setVisibleTel] = useState('8 XXX XXX XX XX')

	const showTel = (rawTel) => {
		if (!isAuth) {
			setVisibleTel('Необходимо войти')
			return
		}

		const telArr = rawTel.split('')
		const filtered = telArr.filter(el => el !== ' ')
		filtered.splice(-2, 0, ' ')
		filtered.splice(-5, 0, ' ')
		filtered.splice(-9, 0, ' ')
		filtered.splice(-13, 0, ' ')
		const prettyTel = filtered.join('')
		setVisibleTel(prettyTel)
	}

	return (
		<UiButton onClick={() => showTel(tel)}>
			<p>Показать телефон</p>
			<p>{visibleTel}</p>
		</UiButton>
	);
};

export default ButtonShowTel;