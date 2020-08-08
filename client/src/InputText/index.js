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
		}

		this.handleChange = this.handleChange.bind(this);
		this.sendValue = this.sendValue.bind(this);
		
	}

	sendValue() {
		this.props.getValue(this.state.name, [this.state.value, this.props.isValid]);
	}

	handleChange(event) {
		this.setState({value: event.target.value}, this.sendValue);
	}

	render(props) {
		return (
			<div className="input-container">

				<h4>{this.state.label}</h4>

				<input  type="text" 
						placeholder={this.state.placeholder} 
						style={this.props.isValid ? null : {border: '1px solid red'}}
						onChange={this.handleChange}
						//onBlur={this.sendValue}
						value={this.state.value} />
			</div>		
		);
	}


}

export default InputText