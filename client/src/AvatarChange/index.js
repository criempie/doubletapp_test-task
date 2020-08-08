import React, {Component} from 'react';
import './index.css';

class AvatarChange extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "avatar",
			file: "",
		}

		this.handleChange = this.handleChange.bind(this);
		this.sendValue = this.sendValue.bind(this);

	}

	sendValue(file) {
		this.props.getValue(this.state.name, [file, true]);
	}

	handleChange(event) {
		event.preventDefault();

		let reader = new FileReader();
		let file = event.target.files[0];
		
		this.sendValue(file);

		reader.onloadend = () => {
			this.setState({
				imageCash: reader.result,
			});
		};

		reader.readAsDataURL(file);
		// await new Promise(accept => reader.readAsDataURL(file, accept)); 
		
	}
	
	render() {
		return (
			<div className="avatarchange-container">

            	<div className="avatar-container">
					{this.state.imageCash ? <img src={this.state.imageCash} /> : <span>ФИ</span>}
				</div>

				<input name="filedata" type="file" accept="image/png, image/jpg, image/jpeg"
					   id="image_input" className="inputfile"
					   onChange={this.handleChange}/>
				
				<div className="label-container">
					<label htmlFor="image_input" className="inputfile-label">Сменить аватар</label>
					<span>500x500</span>
				</div>	

			</div>
		);
	}
}

export default AvatarChange