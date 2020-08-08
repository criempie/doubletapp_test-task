import React, {useState, useEffect} from 'react';
import './index.css';

function TableStudents(props) {
	const [students, setStudents] = useState([]);

	useEffect(() => {
		fetch('/get')
		.then(res => res.json())
		.then(data => {setStudents(data)})
		.catch(err => console.log(err));
	}, []);

	let deleteStudent = async (id) => {
		await fetch(`/delete/${id}`, {
			method: 'DELETE',
		})
		.then(res => res.json())
		.then(res => console.log(res))
		.catch(err => console.log(err));

		setStudents(students.filter(n => n._id !== id));
	}


	let getTableHead = () => {
		return (
			<tr className="table-head">
	 			<th></th>
	 			<th>ФИО</th>
	 			<th>Специальность</th>
	 			<th>Группа</th>
	 			<th>Возраст</th>
	 			<th>Рейтинг</th>
	 			<th></th>
	 			<th></th>
	 		</tr>
		);
	};

	let renderDeleteIcon = (id) => {
		return (
			<div className="delete-icon-container" onClick={() => deleteStudent(id)}>
				<img src="./images/delete.svg" />
			</div>
		);
	};

	let renderColor = (color) => {
		if (color == "#rainbow") {
			return 	<div className="option-color">
						<img src="./images/rainbow.png" alt="rainbow" />
					</div>
		} else {
			return <div className="option-color" style={{backgroundColor: color}} />
		}
	};

	let getStudentRow = (student) => {
		return (
			<tr id={student._id} className="table-row">
				<th className="avatar-column"><img className="table-avatar" src={student.avatar} alt=""/></th>
				<th>{student.fullname}</th>
				<th>{student.specialty}</th>
				<th>{student.group}</th>
				<th>{student.age}</th>
				<th>{student.rating}</th>
				<th>{renderColor(student.color)}</th>
				<th>{renderDeleteIcon(student["_id"])}</th>
			</tr>
		);
	};

	let dictionary = {
		'ФИО': 'fullname',
		'Рейтинг': 'rating',
		'Группа': 'group',
		'Возраст': 'age',
		'Любимый цвет': 'color',
	};

	let isConsistsNumber = (string) => {
		return +string ? true : false; // equal +string === NaN ?
	};

	let getTableRows = () => {
		return (
			students.filter((student) => student['fullname'].toLowerCase()
															.indexOf(props.search.trim()
																				 .toLowerCase()) +1)
																				 .sort((obj1, obj2) => { //
																					let value1 = obj1[dictionary[props.sortSettings[0]]].toLowerCase();
																					let value2 = obj2[dictionary[props.sortSettings[0]]].toLowerCase();

																					console.log(props.sortSettings);
																					value1 = isConsistsNumber(value1) ? Number.parseInt(value1) : value1;
																					value2 = isConsistsNumber(value2) ? Number.parseInt(value2) : value2;
																					
																					return value1 > value2 ? (props.sortSettings[1] ? -1 : 1) :
																				 		   value1 < value2 ? (props.sortSettings[1] ? 1 : -1) : 0
																				 })
																				 .map((student) => {
																					return getStudentRow(student);
																				 })
		);
	};

	

	return (
		<table className="table-students">
			<thead>
				{getTableHead()}
			</thead>
			<br />
			<tbody>
				{getTableRows()}
			</tbody>
		</table>
	);

	// render(props) {
	// 	return (
	// 		<table className="table-students">
	// 			<tbody>
	// 				{this.getTableHead()}
	// 				{this.getTableRows()}
	// 			</tbody>
	// 		</table>
	// 	);
	// }

	

	// getTableHead() {
	// 	return (
	// 		<tr className="table-head">
	// 			{/* <th id="avatar"></th> */}
	// 			<th id="fullname">ФИО</th>
	// 			<th id="specialty">Специальность</th>
	// 			<th id="group">Группа</th>
	// 			<th id="age">Возраст</th>
	// 			<th id="rating">Рейтинг</th>
	// 			<th id="color"></th>
	// 			<th id="delete"></th>
	// 		</tr>
	// 	);
	// }	

	

	// renderColor(color) {
	// 	return (
	// 		<div className="option-color" style={{backgroundColor: color}}></div>
	// 	);
	// }

	

	// renderDeleteIcon(id) {
	// 	return (
	// 		<div className="delete-icon-container" onClick={() => this.deleteStudent(id)}>
	// 			<img src="./images/delete.svg" />
	// 		</div>
	// 	);
	// }

	
	
	// getStudentRow(student) {
	// 	return (
	// 		<tr  id={student["_id"]} className="table-row">
	// 			<th>{student.fullname}</th>
	// 			<th>{student.specialty}</th>
	// 			<th>{student.group}</th>
	// 			<th>{student.age}</th>
	// 			<th>{student.rating}</th>
	// 			<th>{this.renderColor(student.color)}</th>
	// 			<th>{this.renderDeleteIcon(student["_id"])}</th>
	// 		</tr>
	// 	)
	// }

	

	// getTableRows() {
	// 	let temp = [];
	// 	for (let student of this.state.students) {
	// 		temp.push(this.getStudentRow(student));
	// 	} 
	// 	return temp;
	// }

	

}

export default TableStudents