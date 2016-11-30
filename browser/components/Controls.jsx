import {connect} from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router';
import store from '../store'


import {play, stop, clearTimeline, startEditing, stopEditing, toggleSavePage, togglePatternPage, toggleSplashPage} from '../reducers/timelineReducer'


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

	players (filePath, time, effect, pitch, obj) {
		this.state.samples.push(
			{
				spl: new Tone.Player(filePath).toMaster(),
				time: time,
				effect: effect,
				pitch: pitch,
				obj: obj
			}
		);
	}

	schedule (sample, playStart, effect, pitch, obj) {
		var event = Tone.Transport.schedule(function(time){
			// if all drums are cylinders, do not pitch!!
			if(obj ==='cylinder' || obj === 'torus-small' || obj === 'torus-large') {
				effect? sample.connect(effects[effect]).start()
				: sample.start()
			}
			else {
				effect? sample.connect(effects[effect]).connect(pitch).start()
				// once all effects are hooked up then start
				: sample.connect(pitch).start();	
			}
			
		}, playStart);
		this.state.eventIds.push(event);
	}

	scheduleAll () {
		//e.preventDefault();
		// takes all store events and creates array of players
		this.props.events.map(evt=>{
			

			var pitch = new Tone.PitchShift (Math.floor((evt.position.y)/100)).toMaster();
			this.players(evt.spl, evt.time, evt.effect, pitch, evt.obj)
		})
		// takes locally stored array of players and schedules on timeline
		Tone.Buffer.on('load', ()=>{
		  //all buffers are loaded.   
			this.state.samples.map(evt=>{
				this.schedule(evt.spl, evt.time, evt.effect, evt.pitch, evt.obj)
			})
		})

	}
	playTransport (e) {
		e.preventDefault();
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
			
				{this.props.isPlaying ? 

					//stop button
					<svg fill="rgba(86, 101, 115, 0.7)" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={this.stopTransport}>
						<path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
						<path d="M0 0h24v24H0z" fill="none"/>
					</svg>
					:
					//play button
					<svg fill="rgba(86, 101, 115, 0.7)" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" onClick={this.playTransport}>
						<path d="M0 0h24v24H0z" fill="none"/>
						<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
					</svg>
				}


				{/* delete button */}
				<svg fill="rgba(86, 101, 115, 0.7)" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" onClick={this.clearAll}>
					<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
				<path d="M0 0h24v24H0z" fill="none"/>
				</svg>

				{/* add button */}
				<svg fill="rgba(86, 101, 115, 0.7)" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" onClick={this.props.patternPage? null : this.props.toggleSavePage }>
					<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
					<path d="M0 0h24v24H0z" fill="none"/>
				</svg>
				
				
				{/* pattern button */}
				<svg id='songs' fill="rgba(86, 101, 115, 0.7)" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" onClick={this.props.savePage? null: this.props.togglePatternPage}>
					<path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
					<path d="M0 0h24v24H0z" fill="none"/>
				</svg>

				{/* information button */}
				<svg fill="rgba(86, 101, 115, 0.7)" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" onClick={this.props.toggleSplashPage}>
					<path d="M0 0h24v24H0z" fill="none"/>
					<path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
				</svg>

				{/* upload button */}
				<svg fill="rgba(86, 101, 115, 0.7)" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
				<path d="M0 0h24v24H0z" fill="none"/>
					<path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
				</svg>

		  </div>
  	</div>
		)
	}
}

const mapStateToProps = ({events, edit, isPlaying, patternPage, savePage, splashPage}) => ({
    events: events,
    edit: edit,
    isPlaying: isPlaying,
    patternPage: patternPage,
    savePage: savePage,
	splashPage: splashPage,
})
export default connect(
    mapStateToProps,
    {play, stop, clearTimeline, startEditing, stopEditing, toggleSavePage, togglePatternPage, toggleSplashPage}
)(Controls)

const effects = {
	reverb: new Tone.JCReverb(0.4).toMaster(),
	pingPong: new Tone.PingPongDelay("4n", 0.2).toMaster(),
	distortion: new Tone.Distortion(0.3).toMaster(),
	lowpass: new Tone.Filter(350, 'lowpass').toMaster(),
	highpass: new Tone.Filter(200, "highpass"),
  pitchDown: new Tone.PitchShift (-3).toMaster(),
	pitchUp: new Tone.PitchShift (3).toMaster(),
}


//edit button
	// {
	// 			this.props.edit ? 
	// 			//pencil button
	// 			<svg fill="rgba(86, 101, 115, 0.7)" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" onClick={this.props.startEditing} value="EDIT">
	// 			<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
	// 			<path d="M0 0h24v24H0z" fill="none"/>
	// 			</svg>

	// 			:
	// 			//done button
	// 			<svg fill="rgba(86, 101, 115, 0.7)" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" onClick={this.props.stopEditing} value="STOP_EDIT" >
	// 			<path d="M0 0h24v24H0z" fill="none"/>
	// 			<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
	// 			</svg>
				
				
	// 			}
