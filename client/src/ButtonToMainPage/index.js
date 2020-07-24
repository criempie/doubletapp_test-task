import React from 'react';
import './index.css';

function ButtonToMainPage(props) {
	return (
		<button className="button-to-main" onClick={props.switchPages}>
			<img src="./images/back.svg"></img>
			<span>НАЗАД К СПИСКУ СТУДЕНТОВ</span>
		</button>
	);
}

export default ButtonToMainPage