import React, {Component} from 'react';
import './index.css';

class TableStudents extends Component {
	constructor(props) {
		super(props);
		this.students = [
			{
				'avatar': null,
				'fullname': 'Иванов Иван Иванович',
				'specialty': 'Прикладная информатика',
				'group': 'ПИ-101',
				'age': 21,
				'rating': 65,
				'color': '#f00',
			},
		]
	}

	render(props) {
		return (
			<table className="table-students">
				{this.renderTableHead()}
			</table>
		);
	}

	renderTableHead() {
		return (
			<tbody>
				<tr className="column-names">
					<th id="avatar"></th>
					<th id="fullname">ФИО</th>
					<th id="specialty">Специальность</th>
					<th id="group">Группа</th>
					<th id="age">Возраст</th>
					<th id="rating">Рейтинг</th>
					<th id="color"></th>
					<th id="delete"></th>
				</tr>
			</tbody>
		);
	}	

}

export default TableStudents