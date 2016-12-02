
import React, { Component } from 'react'
import store from '../store'
import { connect } from 'react-redux';
import { saveSongSuccess, createSong } from '../reducers/timelineReducer';
import * as firebase from 'firebase';

export class Save extends Component {
	constructor () {
		super()
		this.state = {
			open: false
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	};

	// for use with some button in controls to re-open splash + instruction
	toggle = () => {
	  this.setState({open: !this.state.open});
	}

	handleSubmit(e) {
    e.preventDefault();
    console.log("HANDLESUBMIT", this.props.events, e.target.title.value, e.target.author.value)
    this.props.createSong(this.props.events, e.target.title.value, e.target.author.value)
		this.props.saveSongSuccess();
}

	render () {
		return (
			<div id='save-modal'>
				<h1>Submit Your Pattern</h1>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label id="save-title">
							<input placeholder="title" name="title" />
						</label>
					</div>
					<div>
						<label>
							<input placeholder="author" name="author" />
						</label>
					</div>
				  <p></p>
				  <button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
  <i className="material-icons">mood</i>
</button>
				</form>
  		</div>
		)
	}
}

const mapStateToProps = ({events}) => ({events})

export default connect(
    mapStateToProps,
    {createSong, saveSongSuccess},
    )(Save)