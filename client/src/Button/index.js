import React from 'react';
import './index.css';

function Button(props) {
	return (
		<button className="blue-button" onClick={props.hasOwnProperty('switchPages') ? () => props.switchPages(false): null}>
			{props.hasOwnProperty('imagePath') ? <img src={props.imagePath}></img> : null}
			<span>{props.label}</span>
		</button>
	);
}

export default Button