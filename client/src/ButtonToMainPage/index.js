import React from 'react';
import './index.css';

function ButtonToMainPage(props) {
	return (
		<button id="btn_to_main" className="button-to-main" onClick={props.OnClick}>
			<img src="./images/back.svg" alt="Стрелочка" />
			<span>НАЗАД К СПИСКУ СТУДЕНТОВ</span>
		</button>
	);
}

export default ButtonToMainPage