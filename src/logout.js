import React, { Component } from 'react';
import firebase from './firebase';
import { withRouter } from 'react-router-dom';

class Logout extends Component {
	logOutUser = () => {
		firebase.auth().signOut();
		this.props.history.push('/');
	}

	render() {
		return (
			<div>
				<h1>Are you sure you want to log out?</h1>
				<br />
				<button class="button" onClick={this.logOutUser}><span>Yes</span></button>
				<button class="button" onClick={this.logOutUser}><span>Yes</span></button>
			</div>
		);
	}
}

export default withRouter(Logout);