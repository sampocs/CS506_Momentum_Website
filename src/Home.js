import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Home extends Component {
	handleClick = () => {
		this.props.history.push('/login');
	}
	
	render() {
	  return (
		<div>
		  <center>
			<h1>Welcome to Momentum!</h1>
			<br/>
			<button className="button" onClick={this.handleClick}><span>Log in</span></button>
		  </center>
		</div>
	  );
	}
};


export default Home;