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
				avatar: "",
				fullname: "",
				email: "",
				age: "",
				rating: "",
				specialty: "",
				group: "",
				color: "",
				sex: "",
			},

			dataValid: {
				avatar: false,
				fullname: false,
				email: false,
				age: false,
				rating: false,
				specialty: false,
				group: false,
				color: false,
				sex: false,
			},

			globalValid: true, //
			errorMessage: "",
		};

		

		this.getValue = this.getValue.bind(this);
		
		
	}

	checkEmptiness() {
		let isEmpty = false;
		for (let key in this.state.studentData) {
			if (key === "avatar") {
				continue;
			} else {
				if (!this.state.studentData[key]) {
					isEmpty = true;
					break;
				}
			}
		} 

		return isEmpty;
	}

	validationGlobal() {
		let isValid = true;

		for (let key in this.state.dataValid) {
			if (!this.state.dataValid[key]) {
				console.log("broke on: ", key);
				isValid = false;
				break;
			} 
		}

		let isExistsEmptyField = this.checkEmptiness();
		console.log(this.state.studentData)
		if (!isValid) {
			if (isExistsEmptyField) {
				this.setState({errorMessage: "Не все поля заполнены"});
			} else {
				this.setState({errorMessage: "Не все поля прошли валидацию"});
			}
		} else {
			this.setState({errorMessage: ""});
		}

		console.log("global valid: ", isValid);
		this.setState({globalValid: isValid});
		return isValid;
	}

	getValue = (stateName=null, value=null) => {
		let studentData = Object.assign({}, this.state.studentData);
		studentData[stateName] = value;

		this.setState({'studentData': studentData})
		// this.setState({[stateName]: value}, () => console.log(this.state.studentData));
	}

	getValid = (stateName=null, value=null) => {
		let dataValid = Object.assign({}, this.state.dataValid);
		dataValid[stateName] = value;
		
		this.setState({'dataValid': dataValid});
	}

	sendRequest(studentData) {
		let formData = new FormData();

		console.log('sending student: ', this.state.studentData);

		for (let key in studentData) {
			formData.append(key, studentData[key]);
		}

		fetch('/api/send', {
			method: 'POST',
			body: formData,
		})
		.then(() => console.log("send blyat"))
		.catch(err => console.log("sending error: ", err))
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
		
		return (
			<div>
		
				<div className="avatarchange-container">
					<AvatarChange getValue={this.getValue} 
								  getValid={this.getValid}
								  setValid={this.state.dataValid.avatar} />
				</div>

				<div className="inputs-container">
					<InputText label="ФИО" name="fullname"
							   placeholder="Иванов Иван Иванович" 
							   getValid={this.getValid}
							   setValid={this.state.dataValid.fullname}
							   getValue={this.getValue} />
					
					<InputText label="Email" name ="email"
							   placeholder="ivanov@gmail.com"
							   setValid={this.state.dataValid.email}
							   getValid={this.getValid}
							   getValue={this.getValue} />
					
					<InputText label="Возраст" name="age" 
							   placeholder="20"
							   setValid={this.state.dataValid.age}
							   getValid={this.getValid}
							   getValue={this.getValue} />
					
					<CustomSelect label="Специальность" name="specialty"
								  options={specialtyOptions}
								  getValid={this.getValid}
								  getValue={this.getValue} />
					
					<CustomSelect label="Группа" name="group" 
								  options={groupOptions[this.state.studentData.specialty]}
								  getValid={this.getValid}
								  getValue={this.getValue} />
					
					<InputText label="Рейтинг" name="rating"
							   placeholder="0"
							   setValid={this.state.dataValid.rating}
							   getValid={this.getValid}
							   getValue={this.getValue}	 />
					
					<CustomSelect label="Пол" name="sex" 
								  options={["Мужской", "Женский"]} 
								  getValid={this.getValid}
								  getValue={this.getValue} />
					
					<ColorSelect  label="Любимый цвет" name="color" 
								  value="Выбрать" options={colorsOptions} 
								  getValid={this.getValid}
								  type="colorSelect" getValue={this.getValue} />	
				</div>

				<div className="button-container">
					<Button label="Создать"
							style={this.state.globalValid ? null : {backgroundColor: 'crimson'}}
							OnClick={() => {
									if (this.validationGlobal()) {
										console.log("validation successful!")
										this.sendRequest(this.state.studentData);
										this.props.func();
									} else {
										console.log(this.state.dataValid)
									}
								}
							} />
					
					<span className="error-string" style={this.state.errorMessage ? {visibility: 'visible'} : {visibility: 'hidden'}}>
						{this.state.errorMessage}
					</span>

				</div>

			</div>

		);
	}



}

export default Form