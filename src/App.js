import React, { Component } from 'react';
import './App.css';
import Navigation from './Navigation';
import firebase from './firebase';

class App extends Component {
 state = {
   authenticated: false,
 };
 
 componentDidMount() {
   this.unsubscribe = firebase.auth().onAuthStateChanged(
     (user) => {
       if (user) {
         this.setState({
           authenticated: true,
           email: user.email
         })
       }
       else {
         this.setState({
           authenticated: false,
           email: ''
         })
       }
   });
 }
 componentWillUnmount() {
   this.unsubscribe();
 }
 
 render() {
   return <Navigation authenticated={this.state.authenticated} email={this.state.email}/>;
 }
}

export default App;
