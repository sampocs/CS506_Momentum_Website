import React, { Component } from 'react';
import './App.css';
import Navigation from './Navigation';
import firebase from './firebase';
import Login from './login';
import MainProg from './MainProg';

class App extends Component {
 state = {
   authenticated: false,
 };
 
 componentDidMount() {
   firebase.auth().onAuthStateChanged((authenticated) => {
     authenticated ? this.setState(
	     () => ({
           authenticated: true,
         })
		) : this.setState(
		 () => ({
           authenticated: false,
         })
		);
   });
 }
 
 render() {
   return <Navigation authenticated={this.state.authenticated} />;
 }
}

export default App;
