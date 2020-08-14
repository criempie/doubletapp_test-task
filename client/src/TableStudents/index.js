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

	let deleteStudent = async (id, path) => {
		await fetch(`/delete/${id}/${path}`, {
			method: 'DELETE',
		})
		.then(res => res.json())
		.catch(err => console.log(err));

		setStudents(students.filter(n => n._id !== id));
	}


	let getTableHead = () => {
		return (
			<thead>
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

				<tr style={{height: 16}} />
			</thead>
			 
		);
	};

	let setAgeString = (age) => {
		if ([11, 12, 13, 14].includes(+age % 100)) {
			return "лет";
		} else if (+age % 10 === 1) {
			return "год";
		} else if (+age % 10 > 0 && +age % 10 < 5) {
			return "года";
		} else {
			return "лет";
		}
	}

	let getStudentDiv = (student) => {
		console.log(student)
		return (
			<div key={student._id} className="table-element-mobile">
				<div className="table-head-mobile">
					<img className="table-avatar" src={student.avatar} alt="Аватар" />
					<div className="table-head-info">
						<span className="table-head-fullname">{student.fullname.split(' ')[0] + " " + student.fullname.split(' ')[1]}</span>
						<div className="table-head-info-under">
							{renderColor_mobile(student.color)}
							<img className="table-head-star" src="./images/star.svg" alt="Звездочка" />
							<span className="table-head-rating">{student.rating}</span>
						</div>
					</div>
					{renderDeleteIcon(student._id, student.avatar.split('/')[1])}
				</div>
				<hr />
				<div className="table-body">
					<ul className="table-body-info">
						<li className="table-body-info-element"><span>{student.age} {setAgeString(student.age)}</span></li>
						<li className="table-body-info-element"><span>{student.specialty}</span></li>
						<li className="table-body-info-element"><span>{student.group}</span></li>
					</ul>
				</div>
			</div>
		);
	};

	let getTableStudent = () => {
		return (
			students.filter((student) => student['fullname'].toLowerCase()
															.indexOf(props.search.trim()
																				 .toLowerCase()) +1)
																				 .map((student) => {
																					return getStudentDiv(student);
																				 })
		);
	};

	let renderDeleteIcon = (id, path) => {
		return (
			<div className="delete-icon-container" onClick={() => deleteStudent(id, path)}>
				<img src="./images/delete.svg" alt="Удалить" />
			</div>
		);
	};

	let renderColor_mobile = (color) => {
		if (color === "#rainbow") {
			return <img className="table-head-color" src="./images/rainbow.png" alt="rainbow" />;
		} else {
			return <div className="table-head-color" style={{backgroundColor: color}} />
		}
	};

	let renderColor = (color) => {
		return (
			<div style={{cursor: 'default', backgroundColor: color}} className="option-color">
				{color === "#rainbow" ? <img src="./images/rainbow.png" alt="rainbow" null /> : null}
			</div>
		);

		// if (color === "#rainbow") {
		// 	return 	<div style={{cursor: 'default'}} className="option-color">
		// 				<img src="./images/rainbow.png" alt="rainbow" />
		// 			</div>
		// } else {
		// 	return <div style={{cursor: 'default'}} className="option-color" style={{backgroundColor: color}} />
		// }
	};

	let getStudentRow = (student) => {
		return (
			<tr key={student._id} className="table-row">
				<th className="avatar-column"><img className="table-avatar" src={student.avatar} alt=""/></th>
				<th>{student.fullname}</th>
				<th>{student.specialty}</th>
				<th>{student.group}</th>
				<th>{student.age}</th>
				<th>{student.rating}</th>
				<th>{renderColor(student.color)}</th>
				<th>{renderDeleteIcon(student["_id"], student['avatar'].split('/')[1])}</th>
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

	if (window.outerWidth < 490) {
		return (
			<div className="table-mobile">
				{getTableStudent()}
			</div>
		);
	} else {
		return (
			<table className="table-students"> 
				{getTableHead()}
				
				<tbody>
					{getTableRows()}
				</tbody>
			</table>
		);
	}

	

}

export default TableStudents