import React from 'react';
import firebase from './firebase';

const logOutUser = () => {
 firebase.auth().signOut();
};

const logout = () => {
 return <button class="button" onClick={logOutUser} children="Logout"><span>Logout</span></button>;
};

export default logout;