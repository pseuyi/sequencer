import {connect} from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router';
import store from '../store'
import {play, stop, clearTimeline, startEditing, stopEditing, startClock} from '../reducers/timelineReducer'

export class Progress extends Component {
	constructor (props) {
		super(props)
		this.state = {
			status: 'wacky',
		}
		this.update = this.update.bind(this)
		this.autoStop = this.autoStop.bind(this)
	}

	componentDidMount() {
    this.clock = setInterval(this.update, 1000);
    this.status = setInterval(this.update, 1000);
  }
  update () {
    this.props.startClock(Math.round(Tone.Transport.seconds));

    if(this.state.status===0) setInterval(this.autoStop(), 5000)
    else this.setState({status: Tone.Transport._onceEvents._timeline.length});
  }
  componentWillUnmount () {
    clearInterval(this.clock);
    clearInterval(this.status);
  }

  autoStop () {
		this.props.stop();
		Tone.Transport.stop();
		this.props.startEditing();
		window.document.getElementById('interface').style.display = "initial";
	}

	render () {
		return (
			<div id='progress'>
				{this.props.time} 
				<p>events left: {this.state.status}</p>
			</div>
		)
	}
}

const mapStateToProps = ({isPlaying, time}) => ({
  isPlaying: isPlaying,
  time: time
})
export default connect(
    mapStateToProps,
    {play, stop, clearTimeline, startEditing, stopEditing, startClock}
)(Progress)