import React, {useState} from 'react';
import './index.css';

function SearchLine(props) {
	const name = "search";
	const [value, setValue] = useState("");

	const sendValue = (data) => {
		props.getValue(name, data);
	}

	const handleChange = (event) => {
		setValue(event.target.value);
		sendValue(event.target.value);
	};

	// handleChange(event) {
	// 	this.setState({
	// 		value: event.target.value,
	// 	})
	// }

	return (
		<input type="text"  className="searchline-input"
							value={value}
							onChange={handleChange}
							placeholder="Поиск по имени" />
	);

	// render() {
	// 	return (
	// 		<input type="text" className="searchline-input"
	// 							value={this.state.value}
	// 							onChange={this.handleChange}
	// 							placeholder="Поиск по имени">

	// 							</input>
	// 	);
	// }


}

export default SearchLine