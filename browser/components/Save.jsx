
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
			<div>
			{
				this.state.open ?
				null :
				<div id='save-modal'>
					<h1>submit your pattern</h1>
					<div id='close-x'>
						<p id='save-close' onClick={this.toggle}>x</p>
					</div>
					<form onSubmit={this.handleSubmit} >
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

							<button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
							<i className="material-icons">mood</i>
							</button>

					</form>
				</div>
				
			}
			</div>
		)
	}
}

const mapStateToProps = ({events}) => ({events})

export default connect(
    mapStateToProps,
    {createSong, saveSongSuccess},
    )(Save)