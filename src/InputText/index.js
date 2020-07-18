import React, {Component} from 'react';
import './index.css';

class InputText extends Component {
	constructor(props) {
		super(props);

		this.state = {
			label: props.label,
			placeholder: props.placeholder,
		}
		
	}

	render(props) {
		return (
			<div className="input-container">
				<label>{this.state.label}</label>
				<input type="text" placeholder={this.state.placeholder}></input>
			</div>		
		);
	}


}

export default InputText