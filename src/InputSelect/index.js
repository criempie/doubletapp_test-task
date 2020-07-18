import React, {Component} from 'react';
import './index.css';
import InputText from '../InputText';

class InputSelect extends Component {
	constructor(props) {
		super(props);

		this.state = {
			label: this.props.label,
			options: this.props.options,
		}
	}

	render() {
		return (
			<div className="input-container">
				<label>{this.state.label}</label>
				<select>
					{this.getOptions()}
				</select>
			</div>	
		);
	}

	getOptions() {
		return this.state.options.map((option) => <option value={option} label={option}></option>)
	}
}

export default InputSelect