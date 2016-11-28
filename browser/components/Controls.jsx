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
					<svg fill="rgba(86, 101, 115, 0.7)" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" onClick={this.stopTransport}>
						<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
						<path d="M0 0h24v24H0z" fill="none"/>
					</svg>
					:
					<svg fill="rgba(86, 101, 115, 0.7)" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" onClick={this.playTransport}>
						<path d="M0 0h24v24H0z" fill="none"/>
						<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
					</svg>
				}
		
				<svg fill="rgba(86, 101, 115, 0.7)" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" onClick={this.clearAll}>
					<path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
					<path d="M0 0h24v24H0z" fill="none"/>
				</svg>

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