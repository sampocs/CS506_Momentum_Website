import React, { Component } from 'react';
import Calendar from 'react-calendar';
import firebase from './firebase.js';
import Collapsible from 'react-collapsible';
import Select from 'react-select';
import styles from './Calendar.css';

class MainProg extends Component {
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
			update: true,
			selectedOption: '',
			error: '',
		};
	}

	componentDidMount() {
		let hash = 0, i, chr;
		if (this.props.email.length === 0) return hash;
		for (i = 0; i < this.props.email.length; i++) {
			chr = this.props.email.charCodeAt(i);
			hash = ((hash << 5) - hash) + chr;
			hash |= 0;
		}

		this.setState({
			//email: this.props.email,
			email: localStorage.getItem("myEmail"),
			selectedOption: hash.toString(),
		});

		this.habitRetrieval();
	}

	componentDidUpdate() {
		this.habitRetrieval();
	}

	//retrieve habits from database
	habitRetrieval() {
		const ref = firebase.database().ref('users/' + this.state.selectedOption + '/history');

		//retrieve tasks by date
		const currDate = this.state.date.toJSON().substr(0, 10);
		const post = ref.child(currDate).orderByKey();

		if (this.state.update == true) {
			this.setState({
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
										})()}
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
						loading: false
					});
				});
			});

			if (this.state.loading === true) {
				this.setState({
					post: 'No habits found.',
					loading: false
				});
			}
		}
	}

	onChange = date => {
		this.setState({
			date,
			update: true,
			loading: true
		});
	}

	handleChange = selectedOption => {
		this.setState({
			selectedOption,
			update: true,
			loading: true
		});
	}

	render() {
		const { loading, selectedOption } = this.state;

		return loading ? (
			<center>
				<div className="Auth">
					<h1>
						Loading...
		</h1>
				</div>
			</center>
		) : (
				<div className="App">
					<div className="Container">
						<div className="calendar-container">
							<Calendar
								onChange={this.onChange}
								value={this.state.date}
								calendarType="US"
							/>
						</div>
						<div className="habit-container">
							<section className="add-item">
								<section className="display-date">
									<center><td>Habits for {this.state.date.toJSON().substr(0, 10)}</td></center>
								</section>
								<div className="habits">
									<ul>{this.state.post}</ul>
								</div>
							</section>
						</div>
					</div>
				</div>
			);
	}
}

export default MainProg;
