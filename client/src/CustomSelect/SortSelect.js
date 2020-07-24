import React from 'react';
import './CustomSelect.css';
import CustomSelect from './CustomSelect.js';

class SortSelect extends CustomSelect {
	constructor(props) {
		super(props);

		this.state = {
			options: this.props.options,
			selected: this.props.selected,
			selectedID: this.props.selectedID || -1,
			isOpen: false,
		}

	}

	render(props) {
		return (
			<div className="input-container">
				<button className="sort-select" onClick={this.switchVisibility} onBlur={() => setTimeout(this.setHidden, 200)}>
					<span>{this.state.selected}</span>
					{this.getIcon()}
				</button>
				<div className="options-container" style={{display: this.state.isOpen ? "grid" : "none"}}>
					{this.getOptions()}
				</div>
			</div>	
		);
	}

	getIcon = () => <img className="sortSelect-icon" src="./images/sort.svg"></img>;

}

export default SortSelect