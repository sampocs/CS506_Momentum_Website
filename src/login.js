import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from './firebase';
import { withGlobalState } from 'react-globally';

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
	   const { password } = this.state;
	   firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
		   this.props.history.push('/');
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
			 <input type="text" name="email" placeholder="Email" value={email} onChange={this.handleChange} />
			 <input
			   type="password"
			   name="password"
			   placeholder="Password"
			   value={password}
			   onChange={this.handleInputChange}
			 />
			 <button children="Log In" />
		   </form>
	   );
	 }
	}
	
	export default withRouter(Login);
