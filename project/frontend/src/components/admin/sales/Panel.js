import React from 'react';

function Panel(props) {

	return (
		 <div className={`box bg-${props.color}`}>
            <h2 className="desc">
              {props.children}
            </h2>
            <span className="title">{props.title}</span>
            <i className={props.icon}></i>
            <span className="info">
            	{props.subtitle}
            	<span className="fas fa-arrow-circle-right ml-1"> </span>
            </span>
		</div>
	);
}


export default Panel
