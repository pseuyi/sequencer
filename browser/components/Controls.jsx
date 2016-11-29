import {connect} from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router';
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

	players (filePath, time, effect, pitch) {
		this.state.samples.push(
			{
				spl: new Tone.Player(filePath).toMaster(),
				time: time,
				effect: effect,
				pitch: pitch,
			}
		);
	}

	schedule (sample, playStart, effect, pitch) {
		var event = Tone.Transport.schedule(function(time){
			if(effect) sample.connect(effects[effect]).connect(pitch).start();
			// once all effects are hooked up then start
			else sample.connect(pitch).start();
			
		}, playStart);
		this.state.eventIds.push(event);
	}

	scheduleAll () {
		//e.preventDefault();
		// takes all store events and creates array of players
		this.props.events.map(evt=>{
			

			var pitch = new Tone.PitchShift (Math.floor((evt.position.y)/200)).toMaster();
			this.players(evt.spl, evt.time, evt.effect, pitch)
		})
		// takes locally stored array of players and schedules on timeline
		Tone.Buffer.on('load', ()=>{
		  //all buffers are loaded.   
			this.state.samples.map(evt=>{
				this.schedule(evt.spl, evt.time, evt.effect, evt.pitch)
			})
		})

	}
	playTransport (e) {
		e.preventDefault();
		console.log('samples array', this.state.samples)
		this.scheduleAll();
		this.props.play();
		Tone.Transport.start();

		this.props.stopEditing();
	}
	stopTransport (e) {
		e.preventDefault();
		this.props.stop();
		Tone.Transport.stop();
		this.state.eventIds.map(id=>{
			Tone.Transport.clear(id)
		})
		this.setState({samples:[], eventIds:[]});

		this.props.startEditing();
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
		return (
			<div>
			<div id='controls'>

				{
					this.props.isPlaying? 
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
				<svg id='songs' fill="rgba(86, 101, 115, 0.7)" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
					<path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
					<path d="M0 0h24v24H0z" fill="none"/>
				</svg>

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

const effects = {
	reverb: new Tone.JCReverb(0.4).toMaster(),
	pingPong: new Tone.PingPongDelay("4n", 0.2).toMaster(),
	distortion: new Tone.Distortion(0.3).toMaster(),
	owpass: new Tone.Filter(),
	highpass: new Tone.Filter(200, "highpass"),
  pitchDown: new Tone.PitchShift (-3).toMaster(),
	pitchUp: new Tone.PitchShift (3).toMaster(),
}
