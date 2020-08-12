import React from 'react';
import './index.css';

function Button(props) {
	return (
		<button className="blue-button"
				style={props.style ? props.style : null}
				onClick={() => props.OnClick()}>
			<span>
				{props.hasOwnProperty('imagePath') ? <img src={props.imagePath} alt="Плюсик" /> : null}
				{props.label}
			</span>
		
		</button>
	);
}

export default Button