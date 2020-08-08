import React from 'react';
import './CustomSelect.css';
import CustomSelect from './CustomSelect.js';

class ColorSelect extends CustomSelect {
	constructor(props) {
		super(props);

		this.state = {
			name: props.name,
			options: props.options || [],
			label: props.label,
			value: props.value,
			selectedID: props.selectedID || -1,
			isOpen: false,
		}

	}

	render(props) {
		return (
			<div className="input-container">
				{this.state.label ? <h4>{this.state.label}</h4> : null}
				<button className="custom-select"   onClick={this.switchVisibility} 
													onBlur={() => setTimeout(this.setHidden, 200)} >
					<span>{this.state.value}</span>
				</button>
				<div className="colors-container" style={{display: this.state.isOpen ? "grid" : "none"}}>
					{this.getOptions()}
				</div>
			</div>	
		);
	}

	getOptions() {
		let optionsArray = [];
		for (let color of this.state.options) {
			let id = color;
			let temp = [];
			temp = [
				<input id={id}
					   className="option-input"
					   type="radio"
					   value={color} />,

				<div className="option-color"
					 htmlFor={id}
					 onClick={() => this.selectOption(color, id)}
					 style={color != "#rainbow" ? {backgroundColor: color} : null}>
						 {color == "#rainbow" ? <img src="./images/rainbow.png" alt="rainbow" /> : null}
				</div>
			];

			optionsArray = optionsArray.concat(temp);
		}
		return optionsArray;
	}
}

export default ColorSelect