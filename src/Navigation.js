import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Home from './Home';
import Login from './login';
import ProtectedRoute from './ProtectedRoute';
import Logout from './logout';
import MainProg from './MainProg';
import './Navigation.css';
import firebase from './firebase';

class Navigation extends Component {
	constructor(props) {
		super(props);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.state = {
			email: '',
			changedEmail: false
		};
	}

	handleEmailChange = (newEmail) => {
		this.setState({
			email: newEmail,
			changedEmail: true
		});
	};

	logOutUser = () => {
		firebase.auth().signOut();
	}

	render() {
		return (
			<Router>
				<div>
					<center>
						{this.renderRedirect}
						{this.props.authenticated && (
							<div className="NavHeadBar">
								<h2>{this.state.email}</h2>
								<NavLink to="/Login"><button class="button" onClick={this.logOutUser}><span>Logout</span></button></NavLink>
							</div>

						)}

						<Switch>
							<Route exact path="/" component={Home} />
							<Route
								authenticated={this.props.authenticated}
								render={(props) => <Login {...props} handleEmailChange={this.handleEmailChange} ema={this.state.changedEmail ? this.state.email : this.props.email} />}
								path="/login"
							/>
							<ProtectedRoute
								authenticated={this.props.authenticated}
								render={(props) => <MainProg {...props} email={this.state.changedEmail ? this.state.email : this.props.email} />}
								path="/MainProg"
							/>
							<Route
								authenticated={this.props.authenticated}
								render={(props) => <Logout {...props} />}
								path="/logout"
							/>
						</Switch>
					</center>
				</div>
			</Router>
		);
	}
}

export default Navigation;