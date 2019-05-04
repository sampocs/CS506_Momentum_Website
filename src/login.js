import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from './firebase';

const firebaseErrors = {
    DuplicateEmail: 'auth/email-already-in-use',
    InvalidEmail: 'auth/invalid-email',
    WeakPassword: 'auth/weak-password',
    WrongPassword: 'auth/wrong-password',
    UserNotFound: 'auth/user-not-found',
    PermissionDenied: 'permission-denied'
}

class Login extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			password: '',
			error: null,
			incorrectPassword: false,
			errorString: ''
		};
	}



	handleInputChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleChange = (event) => {
		this.props.handleEmailChange(event.target.value);
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const email = this.props.ema;
		const { password } = this.state;
		firebase.auth().signInWithEmailAndPassword(email, password).then(
			({ user }) => {
				localStorage.setItem("myEmail", user.email);
				this.setState({ incorrectPassword: false })
				this.props.history.push('/MainProg');
			}, (error) => {
				let errorString;
				if (error.code === firebaseErrors.UserNotFound) {
					errorString = `No user found with email ${email}`
                }
                else if (error.code === firebaseErrors.WrongPassword) {
					errorString = `Incorrect password for ${email}`
                }
                else if (error.code === firebaseErrors.InvalidEmail) {
					errorString = 'Invalid email address.'
				}
				else {
					errorString = 'Invalid account credentials'
				}
				this.setState({ incorrectPassword: true, error: error, errorString: errorString })
			}
		)
	};
	render() {
		const { email, password, error } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<h1>Please enter your credentials to log in.</h1>
				{this.state.incorrectPassword &&
				<h3 class='invalid-credentials'>{this.state.errorString}</h3>
				}
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
