import React, {Component} from 'react';
import TextStudents from '../TextStudents/index.js';
import ButtonAddStudent from '../ButtonAddStudent/index.js';
import './index.css';

function Container() {
	return (
		<div className="container">
			<div className="container-text-and-button">
				<TextStudents />
				<ButtonAddStudent />
			</div>
		</div>
	);
}

export default Container