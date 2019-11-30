import React from 'react';

function ItemBox(props) {

	const styles = {
		width: '100px',
		height: '100px',
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

	const item = props.item;
	const category = props.categories;

	return (
		<div
			className={`mr-1 bg-${color[category.find(x => x.id === item.category).color]} text-light 
			text-center d-flex flex-column justify-content-center mb-1 item`}
			style={styles}
			onClick={props.onClick}
		>
			<div>{item.name}</div>
			<div>( &#8369; {item.price} )</div>
		</div>
	)
}

export default ItemBox;
