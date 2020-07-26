import React, {Component} from 'react';
import './index.css';

class TableStudents extends Component {
	constructor(props) {
		super(props);

		this.state = {
			students: [],
		}
	}
	
	componentDidMount() {
		fetch("http://localhost:3000/test")
		.then(res => res.json())
		.then(res => this.setState({
			text: res.students,
		}))
		.catch(err => console.log(err));
	}

	render(props) {
		return (
			<table className="table-students">
				<tbody>
					{this.state.text}
				</tbody>
			</table>
		);
	}

	getTableHead() {
		return (
			<tr className="table-head">
				<th id="avatar"></th>
				<th id="fullname">ФИО</th>
				<th id="specialty">Специальность</th>
				<th id="group">Группа</th>
				<th id="age">Возраст</th>
				<th id="rating">Рейтинг</th>
				<th id="color"></th>
				<th id="delete"></th>
			</tr>
		);
	}	

	getTableBody() {
		return (
			<tr className="table-body">
			
			</tr>
		);
	}

	

}

export default TableStudents