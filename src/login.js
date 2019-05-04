import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from './firebase';

class Login extends Component {
	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
	}

	state = {
		password: '',
		error: null,
	};

	handleInputChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleChange = (event) => {
		this.props.handleEmailChange(event.target.value);
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const email = this.props.ema;
		localStorage.setItem("myEmail", email);
		const { password } = this.state;
		firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
			this.props.history.push('/MainProg');
		}).catch((error) => {
			this.setState({
				error: error
			});
		});
	};
	render() {
		const { email, password, error } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<h1>Please enter your credentials to log in.</h1>

				<br />
				<input
					class="input"
					type="text"
					name="email"
					placeholder="Email"
					value={email}
					onChange={this.handleChange}
				/>
				<br />
				<input
					class="input"
					type="password"
					name="password"
					placeholder="Password"
					value={password}
					onChange={this.handleInputChange}
				/>
				<br />
				<button class="button" children="Log In"><span>Log In</span></button>
			</form>
		);
	}
}

export default withRouter(Login);
