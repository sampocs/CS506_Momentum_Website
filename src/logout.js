import React from 'react';
import firebase from './firebase';

const logOutUser = () => {
 firebase.auth().signOut();
};

const logout = () => {
 return <button onClick={logOutUser} children="logout" />;
};

export default logout;