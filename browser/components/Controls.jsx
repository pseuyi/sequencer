import {connect} from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router';
import store from '../store'
import {play, stop, clearTimeline, startEditing, stopEditing, toggleSavePage, togglePatternPage, cancelBrush, toggleSplashPage, toggleInstructionsPage} from '../reducers/timelineReducer'

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
		// schedule once puts player on timeline and removes it after its played
		var event = Tone.Transport.scheduleOnce(function(time){
			// if all drums are cylinders, do not pitch!!
			if(obj ==='cylinder' || obj === 'torus-small' || obj === 'torus-large') {
				effect? sample.connect(effects[effect]).start()
				: sample.start()
			}
			else {
				if(effect) {
					sample.connect(effects[effect])
				}
				// once all effects are hooked up then start
				sample.connect(pitch).start();
			}
		}, playStart);
		this.state.eventIds.push(event);
	}

	scheduleAll () {
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
		//toggle for bpm counter
		window.document.getElementById('interface').style.display = "none";
		console.log('is there anything on the timeline?', Tone.Transport)
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
		window.document.getElementById('interface').style.display = "initial";
	}


	clearAll (e) {
		e.preventDefault();
		this.props.clearTimeline();
		this.state.eventIds.map(id=>{
			Tone.Transport.clear(id)
		})
		this.setState({samples:[], eventIds:[]});
	}

	_handleTwitter() {
		window.open("https://twitter.com/share", "", "width=500,height=500")
	}



	render () {
		const {_handleTwitter} = this

		return (
		<div onMouseMove={this.props.cancelBrush}>
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

				{/* instructions button */}
				<svg fill="rgba(86, 101, 115, 0.7)" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" onClick={this.props.savePage ? null: this.props.toggleInstructionsPage}>
					<path d="M0 0h24v24H0z" fill="none"/>
					<path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
				</svg>

				{/* upload button */}
				<svg fill="rgba(86, 101, 115, 0.7)" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" onClick={_handleTwitter}>
					<path d="M0 0h24v24H0z" fill="none"/>
					<path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
				</svg>
		  </div>
  	</div>

		)
	}
}

const mapStateToProps = ({events, edit, isPlaying, patternPage, savePage, splashPage, instructionsPage}) => ({
  events: events,
  edit: edit,
  isPlaying: isPlaying,
  patternPage: patternPage,
  savePage: savePage,
	splashPage: splashPage,
	instructionsPage: instructionsPage
})
export default connect(
    mapStateToProps,
    {play, stop, clearTimeline, startEditing, stopEditing, toggleSavePage, togglePatternPage, toggleSplashPage, cancelBrush, toggleInstructionsPage}
)(Controls)

const effects = {
	reverb: new Tone.JCReverb(0.4).toMaster(),
	pingPong: new Tone.PingPongDelay("4n", 0.2).toMaster(),
	distortion: new Tone.Distortion(0.3).toMaster(),
	lowPass: new Tone.Filter(350, 'lowpass').toMaster(),
	highPass: new Tone.Filter(200, "highpass"),
  pitchDown: new Tone.PitchShift (-3).toMaster(),
	pitchUp: new Tone.PitchShift (3).toMaster(),
}
const timeline = new Tone.Timeline();
