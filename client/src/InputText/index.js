import React, {Component} from 'react';
import './index.css';

class InputText extends Component {
	constructor(props) {
		super(props);

		this.state = {
            name: props.name,
			label: props.label,
			placeholder: props.placeholder,
			value: "",
			isValid: false,
			isChange: false,
		}

		this.handleChange = this.handleChange.bind(this);
		this.sendValue = this.sendValue.bind(this);
		this.sendValid = this.sendValid.bind(this);

	}

	validation() {
		switch(this.state.name) {
			case 'fullname': 
				return /^[А-Я\sа-яЁё]+$/.test(this.state.value);
			case 'email':
				return /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(this.state.value);
			case 'age':
				return /^[1-9]\d{0,2}$/.test(this.state.value);
			case 'rating':
				return /^([0]?|[1-9]\d{0,2})$/.test(this.state.value);
			default:
				return false;
		}
	}

	sendValue() {
		this.props.getValue(this.state.name, this.state.value);
	}

	sendValid() {
		this.props.getValid(this.state.name, this.state.isValid);
	}

	handleChange(event) {
		this.setState({value: event.target.value, isChange: true}, () => {
			this.sendValue();
			this.setState({isValid: this.validation()}, () => {this.sendValid()});
		});
	}

	render(props) {
		return (
			<div className="input-container">

				<h4>{this.state.label}</h4>

				<input  type="text" 
						placeholder={this.state.placeholder} 
						style={this.props.setValid || !(this.state.isChange || this.state.value) ? null : {border: '1px solid red'}}
						onChange={this.handleChange}
						value={this.state.value} />
			</div>		
		);
	}


}

export default InputText