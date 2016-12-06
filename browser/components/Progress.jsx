import {connect} from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router';
import store from '../store'
import {play, stop, clearTimeline, startEditing, stopEditing, startClock, clearClock, clearStage, clearEventIds} from '../reducers/timelineReducer'

export class Progress extends Component {
	constructor (props) {
		super(props)
		this.state = {
			status: 4,
		}
		this.update = this.update.bind(this)
		this.autoStop = this.autoStop.bind(this)
	}

	componentDidMount() {
    this.clock = setInterval(this.update, 100);
    this.status = setInterval(this.update, 100);
  }
  update () {
    this.props.startClock(Tone.Transport.seconds);
    if(this.state.status===0) setTimeout(this.autoStop, 1000)
    else this.setState({status: Tone.Transport._onceEvents._timeline.length});
  }
  componentWillUnmount () {
    clearInterval(this.clock);
    clearInterval(this.status);
  }

  autoStop () {
		this.props.stop();
		Tone.Transport.stop();
		this.props.clearClock();
		this.props.startEditing();
		window.document.getElementById('interface').style.display = "initial";
		this.props.clearStage();
		this.props.clearEventIds();
	}

	render () {
		var pos = this.props.time/25
		return (
			<div id='progress'>
				  <div className="full-bar">
          	<div className="progress-bar" style={{width: `${pos*100}%`}}></div>
        	</div>
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
    {play, stop, clearTimeline, startEditing, stopEditing, startClock, clearClock, clearStage, clearEventIds}
)(Progress)

// for testing
// {this.props.time}
// <p>events left: {this.state.status}</p>