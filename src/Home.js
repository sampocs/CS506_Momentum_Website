import React from 'react'; 
import Background from './img/bg.jpg';

var appStyle = {
	backgroundImage: 'url(${Background})'
}

const Home = () => { 
  return ( 
	<section style={ appStyle }>
	<center>
    <button class="headButton"><h1>Welcome to the website version of Momentum Tracker!</h1></button>
    </center>
	</section>
  ); 
}; 
export default Home;