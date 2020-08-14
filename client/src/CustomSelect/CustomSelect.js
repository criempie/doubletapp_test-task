import React, {Component} from 'react';
import './CustomSelect.css';

class CustomSelect extends Component {
	constructor(props) {
		super(props);

		this.state = {
			label: props.label,
			name: props.name,
			value: props.value || "Выбрать",
			isValid: false,
			isOpen: false,
			selectedID: props.selectedID || -1,
		}

		this.selectOption = this.selectOption.bind(this);
		this.sendValue = this.sendValue.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	// handleSelect(event) {
	// 	this.setState({value: event.target.value});
	// }

	sendValue() {
		this.props.getValue(this.state.name, this.state.value); 
	}

	sendValid() {
		if (this.state.name !== 'sort') {
			this.props.getValid(this.state.name, this.state.isValid);
		}
	}

	validation() {
		return !this.state.value === "Выбрать";
	}

	selectOption(option, id) {
		this.setState({value: option, selectedID: id}, () => {
			this.sendValue();
			this.setState({isValid: true, isOpen: false}, () => {this.sendValid()})
		});
	}

	handleBlur(e) {
		if (e.relatedTarget === null ||
		  	e.relatedTarget.className !== "option-label") {

				this.setState({isOpen: false});
			}
	}

	render(props) {
		if (this.props.clearing) {
			this.setState({value: "Выбрать", selectedID: -1})
			this.props.getUpdate();
		}

		return (
			<div className="input-container">
				{this.state.label ? <h4>{this.state.label}</h4> : null}
				
				<button type="button" className="custom-select" 
									  onClick={this.switchVisibility} 
									  onBlur={this.handleBlur}>
					
					<span>{this.state.value}</span>
					
					<img className="select-arrow"
						 style={this.state.isOpen ? {transform: 'scaleY(-1)'} : {transform: 'scaleY(1)'}}
						 src="./images/arrow.svg"
						 alt="Стрелочка)" />
				
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
		if (this.state.selectedID === id) {
			return <img id="checked" src="./images/selected.svg" alt="Галочка" />
		}
	}

	getOptions() {
		let optionsArray = [];
		for (let id in this.props.options) {
			let temp = [];
			temp = [
				<input key={id} id={id} className="option-input" 
								type="radio"
								value={this.state.value} />,
				
				<label  key={id + 1}
						tabIndex="0" 
						htmlFor={id} 
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