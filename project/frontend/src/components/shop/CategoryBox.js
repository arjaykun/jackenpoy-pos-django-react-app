import React from 'react';

function CategoryBox(props) {

	const styles = {
		width: '80px',
		height: '80px',
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
			className={`mr-1 text-light bg-${color[category.color]} 
			text-center d-flex flex-column justify-content-center`}
			onClick={props.onClick}
			style={styles}
		>
			<div>{category.category}</div>
		</div>
	)
}

export default CategoryBox;
