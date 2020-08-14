import React from 'react';
import './CustomSelect.css';
import CustomSelect from './CustomSelect.js';

class SortSelect extends CustomSelect {
	constructor(props) {
		super(props);

		this.state = {
			name: props.name,
			options: props.options || [],
			value: props.value,
			sortDirection: false, // false - down 
			isOpen: false,
		}

		this.selectOption = this.selectOption.bind(this);
	}

	sendValue() {
		this.props.getValue(this.state.name, [this.state.value, this.state.sortDirection]);
	}

	getDirectionIcon = () => <img className="sortdirection-icon"
								  alt="Направление"
						  		  style={{transform: `scaleY(${this.state.sortDirection ? -1 : 1})`}}
								  src="./images/sort.svg"
								  onClick={() => this.setState({sortDirection: !this.state.sortDirection}, () => {
									this.sendValue();
								  })} />;

	render(props) {
		return (
			<div className="input-container" id="sort_input">
				<button className="sort-select" id="sort_button"  
						onClick={this.switchVisibility}
						onBlur={this.handleBlur} >

					<span>{this.state.value}</span>
					
				</button>

				{this.getDirectionIcon()}

				<div className="options-container" style={{display: this.state.isOpen ? "grid" : "none"}}>
					{this.getOptions()}
				</div>

			</div>	
		);
	}

}

export default SortSelect