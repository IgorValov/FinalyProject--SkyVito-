import React from 'react';
import style from "./style.module.css";
import LogoPic from "../../../components/Logo/LogoPic";
import UiButton from "../../../components/UI/UiButton/UiButton";

const Search = ({searchQuery, setSearchQuery, onSubmit}) => {

	return (
		<div className={style.searchContainer}>
			<LogoPic/>
			<input className={style.searchField}
						 placeholder='Поиск по объявлениям'
						 type='text'
						 name='search'
						 value={searchQuery}
						 onChange={e => setSearchQuery(e.target.value)}
			onKeyDown={(e) => {if(e.key === 'Enter') onSubmit()}}/>
			<UiButton topButton={true} onClick={onSubmit}>Найти</UiButton>
		</div>
	);
};

export default Search;