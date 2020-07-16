import React, {Component} from 'react';
import './index.css';

class SearchLine extends Component {
	constructor(props) {
		super(props);
		this.state = {value: ""};

		this.handleChange = this.handleChange.bind(this);
	}
	
	handleChange(event) {
		this.setState({
			value: event.target.value,
		})
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" className="searchline-input"
									value={this.state.value}
									onChange={this.handleChange}
									placeholder="Поиск по имени">

									</input>
			</form>
		);
	}


}

export default SearchLine