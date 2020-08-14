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

			dict: {
				'Выбрать': 'Выбрать',
				'#49C2E8': "Голубой",
				'#E25B5B': "Красный",
				'#83C872': "Зеленый",
				'#F7FB53': "Желтый",
				'#000000': "Черный",
				'#EFA638': "Оранжевый",
				'#rainbow': "Радужный",
			}
		}

	}

	render(props) {
		return (
			<div className="input-container">
				{this.state.label ? <h4>{this.state.label}</h4> : null}
				<button className="custom-select"   onClick={this.switchVisibility} 
													onBlur={() => setTimeout(this.setHidden, 200)} >
					<span>{this.state.dict[this.state.value]}</span>
					<img className="select-arrow"
						 style={this.state.isOpen ? {transform: 'scaleY(-1)'} : {transform: 'scaleY(1)'}}
						 src="./images/arrow.svg"
						 alt="Стрелочка)" />
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
					   key={id}
					   className="option-input"
					   type="radio"
					   value={color} />,

				<div className="option-color"
					 key={id + 1}
					 htmlFor={id}
					 onClick={() => this.selectOption(color, id)}
					 style={color !== "#rainbow" ? {backgroundColor: color} : null}>
						   {color === "#rainbow" ? <img src="./images/rainbow.png" alt="rainbow" /> : null}
				</div>
			];

			optionsArray = optionsArray.concat(temp);
		}
		return optionsArray;
	}
}

export default ColorSelect