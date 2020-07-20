import React from 'react';
import './CustomSelect.css';
import CustomSelect from './CustomSelect.js';

class ColorSelect extends CustomSelect {
	constructor(props) {
		super(props);

		this.state = {
			options: this.props.options,
			label: this.props.label,
			selected: this.props.selected,
			selectedID: -1,
			isOpen: false,
		}

	}

	render(props) {
		return (
			<div className="input-container">
				{this.state.label ? this.getLabel() : null}
				<button className="custom-select" onClick={this.switchVisibility} onBlur={() => setTimeout(this.setHidden, 200)}>
					<span>{this.state.selected}</span>
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
			let id = btoa(encodeURIComponent(color));
			let temp = [];
			temp = [
				<input id={id} className="option-input" type="radio" value={color}></input>,
				<div className="option-color" htmlFor={id} onClick={() => this.selectOption(color, id)}  style={{backgroundColor: color}}></div>
			];

			optionsArray = optionsArray.concat(temp);
		}
		return optionsArray;
	}
}

export default ColorSelect