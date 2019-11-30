import React from 'react';

function CategoryBox(props) {

	const styles = {
		width: '70px',
		height: '70px',
		cursor: 'pointer'
	};

	const color = {
		P: 'primary',
		I: 'info',
		W: 'warning',
		SE: 'secondary',
		S: 'success',
		DK: 'dark',
		DR: 'danger',
	};

	const category = props.categories;

	return (
		<div
			className={`mr-1 mb-1 text-light bg-${color[category.color]} 
			text-center d-flex flex-column justify-content-center category`}
			onClick={props.onClick}
			style={styles}
		>
			<div>{category.category.toUpperCase()}</div>
		</div>
	)
}

export default CategoryBox;
