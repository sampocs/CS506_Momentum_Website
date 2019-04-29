import React, { Component } from 'react';
import Calendar from 'react-calendar';
import './App.css';
import firebase from './firebase.js';
import Collapsible from 'react-collapsible';
import Select from 'react-select';
import styles from './Calendar.css';

class App extends Component {
  constructor() {
	  super();
	  this.state = {
		  date: new Date(),
		  habit: [],
		  completed: [],
		  notes: [],
		  type: [],
		  goal: [],
		  progress: [],
		  post: '',
		  email: '',
		  loading: true,
		  modules: null,
		  update: true,
		  selectedOption: '',
		  error: '',
	  };
	  this.withChange = this.withChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
  }
	
  componentDidMount() {
	  this.habitRetrieval();
  }
  
  componentDidUpdate() {
	  this.habitRetrieval();
  }
	
	//retrieve habits from database
	habitRetrieval() {
	  const ref = firebase.database().ref('users/' + this.state.selectedOption + '/history');
	  
	  //retrieve tasks by date
	  const currDate = this.state.date.toJSON().substr(0,10);
	  const post = ref.child(currDate).orderByKey();
	  
	  if (this.state.update == true) {
	  this.setState ({
		  update: false
	  });
	  
	  post.once('value', snap => {
		  this.setState({
			  habit: [],
			  completed: [],
			  notes: [],
			  type: [],
			  goal: [],
			  progress: [],
		  });
		  
		  //retrieve details of habits
		  snap.forEach(child => {
			  this.setState({
				  habit: this.state.habit.concat([child.key]),
				  completed: this.state.completed.concat([child.val().completed]),
				  notes: this.state.notes.concat([child.val().notes]),
				  type: this.state.type.concat([child.val().type]),
				  //goal: this.state.goal.concat([child.val().habitInfo.goal]),
				  //progress: this.state.progress.concat([child.val().habitInfo.progress]),
			  });
			  
			  //print out habit's details
			  const postList = this.state.habit.map((dataList, index) =>
				<p>
				<center>
				<Collapsible trigger={dataList}>
				<div class='content'>
				<b>Completed: </b>
				{(() => {
					switch (this.state.completed[index].toString()) {
						case 'false': return ' Incomplete';
						default: return ' Completed';
					}
				}) ()}
				<br />
				<b>Notes: </b>
				{(() => {
					switch (this.state.notes[index]) {
						case '': return ' None';
						default: return ' ' + this.state.notes[index];
					}
				})()}
				<br />
				<b>Type: </b>{this.state.type[index]}
				<br />
				{(() => {
					switch (this.state.type[index]) {
						case 'PROGRESS': return 'Goal: ' + this.state.goal[index] + ', Progress: ' + this.state.progress[index];
						default: return ' ' + this.state.notes[index];
					}
				})()}
				</div>
				</Collapsible>
				</center>
				<hr />
				</p>
			  );
			  
			  //finished loading
			  this.setState({
				  post: postList,
				  //loading: false
			  });
		  });
		});
		
		if (this.state.loading === true) {
			this.setState({
				post: 'No habits found.',
				//loading: false
			});
		}
	  }
	}
  
  onChange = date => {
	  this.setState({
		  date,
		  update: true,
		  //loading: true
	  });
  }
  
  handleChange = selectedOption => {
	  this.setState({ 
		selectedOption,
		update: true,
		//loading: true
	});
  }
  
  //START OF AUTH
  withChange(e) {
	  this.setState({
		  [e.target.name]: e.target.value,
	  });
  }
  
  handleSubmit(e) {
	  e.preventDefault();
	  let hash = 0, i, chr;
	  if (this.state.email.length === 0) return hash;
	  for (i = 0; i < this.state.email.length; i++) {
		  chr = this.state.email.charCodeAt(i);
		  hash = ((hash << 5) - hash) + chr;
		  hash |= 0;
	  }
	  
	  this.setState({
		  selectedOption: hash.toString(),
	  });
	  
	  this.checkEmail();
  }
  
  checkEmail() {
	  const tempRef = firebase.database().ref('users/');
	  tempRef.on('value', (snapshot) => {
		  let items = snapshot.val();
		  
		  for(let item in items) {
			  if(item === this.state.selectedOption) {
				  this.setState({
					  loading: false,
				  });
			  }
		  }
		  
		  if (this.state.loading === true) {
			  this.setState({
				  error: 'No corresponding email found.',
			  });
		  }
	  });
  }
  //END OF AUTH
	
  render() {
	const {loading, modules, selectedOption} = this.state;
	
    return loading ? (
		<center>
	  	<div className="Auth">
		<h1>Please enter your email</h1>
		<form onSubmit={this.handleSubmit}>
			<input type="text" name="email" onChange={this.withChange} value={this.state.email} />
			<button>Log in</button>
		</form>
		<h1>{this.state.error}</h1>
		</div>
		</center>
    ) : (
      <div className="App">
        <header className="Calendar">
		<h1>Welcome, {this.state.email}</h1>
		<form onSubmit={this.withSubmit}>
			<button>Log out</button>
		</form>
		<center>
		<button class="button"><span>Momentum Tracker </span></button>
		<Calendar 
			onChange={this.onChange}
			value={this.state.date}
			calendarType="US"
		/>
		</center>
        </header>
		<div className="Container">
			<section className="add-item">
			<section className="display-date">
			<center><td>{this.state.date.toJSON().substr(0,10)} Habits</td></center>
			</section>
			<div className="habits">
			<ul>{this.state.post}</ul>
			</div>
			</section>
		</div>
      </div>
    );
  }
}

export default App;
