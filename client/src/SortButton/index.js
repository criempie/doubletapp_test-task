import React, {Component} from 'react';
import './index.css';

class SortButton extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="select-sort">
				<div className="orientation-button">
					<button>
						<img src="./images/sort.svg"></img>
					</button>
				</div>
				<select>
					<option id="first_name">Имя</option>
					<option id="last_name">Фамилия</option>
					<option id="middle_name">Отчество</option>
					<option id="full_name">ФИО</option>
					<option id="rating">Рейтинг</option>
					<option id="age">Возраст</option>
					<option id="color">Любимый цвет</option>
				</select>
			</div>
		);
	}
}

export default SortButton