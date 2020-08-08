import React, { Component } from 'react';
import AvatarChange from '../AvatarChange/index.js';
import InputText from '../InputText/index.js';
import CustomSelect from '../CustomSelect/CustomSelect.js';
import ColorSelect from '../CustomSelect/ColorSelect.js';
import Button from '../Button/index.js';
import './index.css';

class Form extends Component {
	constructor(props) {
		super(props);

		this.state = {
			studentData: {
				fullname: [],
				email: [],
				age: [],
				rating: [],
				group: [],
				specialty: [],
				sex: [],
				color: [],
			},

			style: null,
		};

		

		this.getValue = this.getValue.bind(this);
		
		
	}

	validationGlobal() {
		let isValid = true;
		loop:
		for (let key in this.state.studentData) {
			let data = this.state.studentData;
			if (data[key][1]) {
				if (data[key][0]) {
					continue;
				} else {
					console.log(key, data)
					this.setState({[key]: [data[key][0], false]}, () => isValid = false);
				}
			} else {
				isValid = false;
			}
		}

		return isValid;
	}

	validationText(regexp, string) {
		return string ? regexp.test(string) : true;
	}

	validationSelect(string) {
		return string ? true : false;
	}

	getValue = (stateName=null, value=null) => {
		let studentData = Object.assign({}, this.state.studentData);
		studentData[stateName] = value;

		this.setState({'studentData': studentData}, () => console.log(this.state.studentData))
		// this.setState({[stateName]: value}, () => console.log(this.state.studentData));
	}

	sendRequest(studentData) {
		let formData = new FormData();

		console.log('state: ', this.state.studentData);

		for (let key in studentData) {
			formData.append(key, studentData[key][0]);
			console.log(formData);
		}

		console.log('formdata: ', formData);

		fetch('/', {
			method: 'POST',
			body: formData,
		});
	}



	render() {
		let specialtyOptions = [
			"Прикладная информатика",
			"Прикладная математика",
			"Механика", 
			"Математика",
			"Компьютерные науки",
			"Фундаметальная информатика",
		];

		let groupOptions = {
			indefined: [],
			"Прикладная информатика": ['ПИ-101', 'ПИ-102', 'ПИ-201', 'ПИ-213'],
			"Прикладная математика": ['ПМ-101', 'ПМ-102', 'ПМ-201', 'ПМ-213'],
			"Механика": ['МХ-101', 'МХ-102', 'МХ-201', 'МХ-213'],
			"Математика": ['МТ-101', 'МТ-102', 'МТ-201', 'МТ-213'],
			"Компьютерные науки": ['КН-101', 'КН-102', 'КН-201', 'КН-213'],
			"Фундаметальная информатика": ['ФИИТ-101', 'ФИИТ-102', 'ФИИТ-201', 'ФИИТ-213'],
		};

		let colorsOptions = [
			'#49C2E8',
			'#E25B5B',
			'#83C872',
			'#F7FB53',
			'#000000',
			'#EFA638',
			'#rainbow',
		];
		
		console.log(this.state)
		return (
			<div>
		
				<div className="avatarchange-container">
					<AvatarChange getValue={this.getValue} />
				</div>

				<div className="inputs-container">
					<InputText label="ФИО" name="fullname" placeholder="Иванов Иван Иванович" getValue={this.getValue} isValid={this.validationText(/^[А-Я\sа-яЁё]+$/, this.state.studentData.fullname[0])}/>
					<InputText label="Email" name ="email" placeholder="ivanov@gmail.com" getValue={this.getValue} isValid={this.validationText(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/, this.state.studentData.email[0])}/>
					<InputText label="Возраст" name="age" placeholder="20" getValue={this.getValue} isValid={this.validationText(/^[1-9]\d{0,2}$/, this.state.studentData.age[0])}/>
					<CustomSelect label="Группа" name="group" options={groupOptions[this.state.studentData.specialty[0]]} getValue={this.getValue} />
					<CustomSelect label="Специальность" name="specialty" options={specialtyOptions} getValue={this.getValue} />
					<InputText label="Рейтинг" name="rating" placeholder="0" getValue={this.getValue} isValid={this.validationText(/^([0]?|[1-9]\d{0,2})$/, this.state.studentData.rating[0])}/>
					<CustomSelect label="Пол" name="sex" options={["Мужской", "Женский"]} getValue={this.getValue} />
					<ColorSelect label="Любимый цвет" name="color" value="Выбрать" options={colorsOptions} type="colorSelect" getValue={this.getValue} />	
				</div>

				<Button label="Создать"
						style={this.state.style}
						OnClick={() => {
								if (this.validationGlobal()) {
									this.setState({style: null})
									this.sendRequest(this.state.studentData);
									this.props.func();
								} else {
									this.setState({style: {border: '1px solid red'}})
								}
							}
						} />
						
			</div>

		);
	}



}

export default Form