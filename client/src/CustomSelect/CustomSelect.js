import React, {Component} from 'react';
import './CustomSelect.css';

class CustomSelect extends Component {
	constructor(props) {
		super(props);

		this.state = {
			label: props.label,
			name: props.name,
			value: props.value || "Выбрать",
			isOpen: false,
			selectedID: props.selectedID || -1,
		}

		this.selectOption = this.selectOption.bind(this);
		this.sendValue = this.sendValue.bind(this);
	}

	// handleSelect(event) {
	// 	this.setState({value: event.target.value});
	// }

	sendValue() {
		this.props.getValue(this.state.name, [this.state.value, true]); //
	}

	selectOption(option, id) {
		this.setState({value: option, selectedID: id}, () => this.sendValue());
	}

	render(props) {
		return (
			<div className="input-container">
				{this.state.label ? <h4>{this.state.label}</h4> : null}
				
				<button type="button" className="custom-select" 
									  onClick={this.switchVisibility} 
									  onBlur={() => setTimeout(this.setHidden, 200)}>
					
					<span>{this.state.value}</span>
				
				</button>
				
				<div className="options-container" style={{display: this.state.isOpen ? "grid" : "none"}} >
					{this.getOptions()}
				</div>
			
			</div>	
		);
	}
	 
	switchVisibility = () => this.setState({isOpen: !this.state.isOpen});

	setHidden = () => this.setState({isOpen: false});

	setCheck(id) {
		if (this.state.selectedID == id) {
			return <img id="checked" src="./images/selected.svg"></img>
		}
	}

	getOptions() {
		let optionsArray = [];
		for (let id in this.props.options) {
			let temp = [];
			temp = [
				<input id={id} className="option-input" 
							   type="radio"
							   value={this.state.value} />,

				<label htmlFor={id} 
					   className="option-label"
					   onClick={() => this.selectOption(this.props.options[id], id)} >

					{this.props.options[id]}
					{this.setCheck(id)}
					</label>
			];

			optionsArray = optionsArray.concat(temp);
		}
		return optionsArray;
	}

}

export default CustomSelect	