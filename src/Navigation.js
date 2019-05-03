import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Home from './Home';
import Login from './login';
import ProtectedRoute from './ProtectedRoute';
import LogOut from './logout';
import MainProg from './MainProg';
import './Navigation.css';

class Navigation extends Component {
	constructor() {
		super();
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.state = {
			email: '',
		};
	}
	
	handleEmailChange = (newEmail) => {
	   this.setState({ 
			email: newEmail 
	   });
	};
	
	render() {
		return (
			<Router>
				<div>
				<center>
				<div className="NavHeadBar">
				<NavLink to="/"><button class="button"><span>Home</span></button></NavLink>
				{this.props.authenticated ? (
					<span>
						<NavLink to="/MainProg">
							<button class="button"><span>Calendar</span></button>
						</NavLink>
						<span><LogOut /></span>
					</span>
				) : (
					<span>
						<NavLink to="/Login">
							<button class="button"><span>Login</span></button>
						</NavLink>
					</span>
				)}
				</div>
				
				<Switch>
					<Route exact path="/" component={Home} />
					<Route 
						authenticated={this.props.authenticated} 
						render={(props) => <Login {...props} handleEmailChange={this.handleEmailChange} ema={this.state.email} />}
						path="/login" 
					/>
					<ProtectedRoute 
						authenticated={this.props.authenticated} 
						render={(props) => <MainProg {...props} email={this.state.email} />}
						path="/MainProg"
					/>
				</Switch>
				</center>
				</div>
			</Router>
		);
	}
}

export default Navigation;