import React, {Component} from 'react';
import './index.css';

class AvatarChange extends Component {
	constructor(props) {
		super(props);

		this.state = {
			
		}
	}
	
	render() {
		return (
			<div className="avatarchange-container">
            	<div className="avatar-container">
					<span>ФИ</span>
				</div>
				<input type="file" id="image_input" className="inputfile"></input>
				<div className="label-container">
					<label for="image_input" className="inputfile-label">Сменить аватар</label>
					<span>500x500</span>
				</div>			
			</div>
		);
	}
}

export default AvatarChange