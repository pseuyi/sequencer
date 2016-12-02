import {connect} from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router';
import store from '../store'
import {play, stop, clearTimeline, startEditing, stopEditing, toggleSavePage, togglePatternPage, cancelBrush, toggleSplashPage, startClock} from '../reducers/timelineReducer'

export class Progress extends Component {
	constructor (props) {
		super(props)
		this.state = {
			time: 0,
		}
		this.update_time = this.update_time.bind(this)
	}

	componentDidMount() {
    this.clock = setInterval(this.update_time, 100);
  }
  update_time () {
    this.props.startClock(Math.round(Tone.Transport.seconds));
  }
  componentWillUnmount () {
    clearInterval(this.clock);
  }

	render () {
		return (
			<div id='progress'>
				{this.props.time}
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
    {play, stop, clearTimeline, startEditing, stopEditing, toggleSavePage, togglePatternPage, toggleSplashPage, cancelBrush, startClock}
)(Progress)