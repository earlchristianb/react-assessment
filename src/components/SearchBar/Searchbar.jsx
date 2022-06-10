/** @format */

import React from "react";

const Searchbar = ({ onSearch }) => {
	return (
		<input
			className='w-full h-12 border p-2  focus:outline-none'
			type='search'
			placeholder='Search...'
			onChange={(event) => onSearch(event)}></input>
	);
};

export default Searchbar;
