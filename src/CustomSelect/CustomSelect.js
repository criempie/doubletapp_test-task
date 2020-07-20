import React, {Component} from 'react';
import './CustomSelect.css';

class CustomSelect extends Component {
	constructor(props) {
		super(props);

		this.state = {
			label: this.props.label,
			options: this.props.options || [],
			selected: this.props.selected,
			isOpen: false,
			selectedID: -1,
			typeSelect: this.props.type || "classic",
			customStyle: this.props.style || null,
		}
	}

	render() {
		return (
			<div className="input-container">
				{this.state.label ? this.getLabel() : null}
				<button className="custom-select" onClick={this.switchVisibility} onBlur={() => setTimeout(this.setHidden, 200)}>
					<span>{this.state.selected}</span>
				</button>
				<div className="options-container" style={{display: this.state.isOpen ? "grid" : "none"}}>
					{this.getOptions()}
				</div>
			</div>	
		);
	}
	 
	getLabel = () => <h4>{this.state.label}</h4>;

	switchVisibility = () => this.setState({isOpen: !this.state.isOpen});

	setHidden = () => this.setState({isOpen: false});

	getOptions() {
		let optionsArray = [];
		for (let id in this.state.options) {
			let temp = [];
			temp = [
				<input id={id} className="option-input" type="radio" value={this.state.options.id}></input>,
				<label htmlFor={id} className="option-label" onClick={() => this.selectOption(this.state.options[id], id)} >
					{this.state.options[id]}
					{this.setCheck(id)}
					</label>
			];

			optionsArray = optionsArray.concat(temp);
		}
		return optionsArray;
	}

	

	selectOption = (option, id) => this.setState({selected: option, selectedID: id})
													
	setCheck(id) {
		if (this.state.selectedID == id) {
			return <img id="checked" src="./images/selected.svg"></img>
		}
	}											

}

export default CustomSelect	