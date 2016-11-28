import React, { Component } from 'react'
import {connect} from 'react-redux'
import store from '../store'
import {play, stop, clearTimeline, startEditing, stopEditing} from '../reducers/timelineReducer'

export class Controls extends Component {
	constructor (props) {
		super(props)
		this.state = {
			samples: [],
			eventIds: []
		}

		this.schedule = this.schedule.bind(this)
		this.playTransport = this.playTransport.bind(this)
		this.stopTransport = this.stopTransport.bind(this)
		this.scheduleAll = this.scheduleAll.bind(this)
		this.clearAll = this.clearAll.bind(this)
	};

	componentDidMount () {

	}

	players (filePath, time) {
		this.state.samples.push(
			{
				spl: new Tone.Player(filePath).toMaster(),
				time: time
			}
		);
	}

	schedule (sample, playStart) {
		var event = Tone.Transport.schedule(function(time){
			// effects.forEach(effect=>{
			// //match effect to some object holding the master effects and connect sample to that
			// })
			// once all effects are hooked up then start
			sample.start();
		}, playStart);
		console.log('local state samples', this.state.samples)
		console.log('eventid', event)
		this.state.eventIds.push(event);
	}

	scheduleAll () {
		//e.preventDefault();
		// takes all store events and creates array of players
		this.props.events.map(evt=>{
			this.players(evt.spl, evt.time)
		})
		console.log('processed samples on state', this.state.samples)
		// takes locally stored array of players and schedules on timeline
		Tone.Buffer.on('load', ()=>{
		  //all buffers are loaded.   
			this.state.samples.map(evt=>{
				console.log('scheduling sample')
				this.schedule(evt.spl, evt.time)
			})
		})

	}
	playTransport (e) {
		e.preventDefault();
		//this.props.play();
		// console.log(this.props.events[0].time)
		this.scheduleAll();
		this.props.play();
		Tone.Transport.start();
	}
	stopTransport (e) {
		e.preventDefault();
		this.props.stop();
		Tone.Transport.stop();
		console.log('event id array', this.state.eventIds)
		this.state.eventIds.map(id=>{
			console.log('clearing scheduled evt')
			Tone.Transport.clear(id)
		})
		this.setState({samples:[], eventIds:[]});
		console.log('local state', this.state)
	}
	clearAll (e) {
		e.preventDefault();
		this.props.clearTimeline();
		this.state.eventIds.map(id=>{
			Tone.Transport.clear(id)
		})
		this.setState({samples:[], eventIds:[]});
	}

	render () {
		console.log('controls props', this.props)
		return (
			<div>
			<div id='controls'>

				{this.props.isPlaying? 
					<button id='stop' value="stop" onClick={this.stopTransport}>stop</button>
					:
					<button id='play' value="play" onClick={this.playTransport}>play</button>
				}
				<button onClick={this.clearAll} value="RESET">reset</button>

	       {
	       this.props.edit ? 

	       <button onClick={this.props.stopEditing} value="STOP_EDIT" >Stop Editing</button>

	       :

	        <button onClick={this.props.startEditing} value="EDIT">edit</button>
	   		}

  		</div>
  		</div>
		)
	}
}

const mapStateToProps = ({events, edit, isPlaying}) => ({
    events: events,
    edit: edit,
    isPlaying: isPlaying
})
export default connect(
    mapStateToProps,
    {play, stop, clearTimeline, startEditing, stopEditing}
)(Controls)