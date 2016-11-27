import React, { Component } from 'react'
import {connect} from 'react-redux'
import store from '../store'
import {play, clearTimeline, startEditing, stopEditing} from '../reducers/timelineReducer'

export class Controls extends Component {
	constructor (props) {
		super(props)
		this.state = {
			samples: [],
			events: [
				{spl: './sounds/aura_arp_pad.wav',time: 1},
				{spl: './sounds/heaven_vox.wav',time: 3}
			]
		}

		this.schedule = this.schedule.bind(this)
		this.playTransport = this.playTransport.bind(this)
		this.scheduleAll = this.scheduleAll.bind(this)
	};

	// toggleNav = () => {
	//   this.setState({open: !this.state.open});
	// };
	componentDidMount () {
		Tone.Buffer.on('load', function(){
		})
		this.state.events.map(evt=>{
			this.players(evt.spl, evt.time)
		})
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
		Tone.Transport.schedule(function(time){
			// effects.forEach(effect=>{
			// //match effect to some object holding the master effects and connect sample to that
			// })
			// once all effects are hooked up then start
			sample.start();
		}, playStart);
	}

	scheduleAll (e) {
		e.preventDefault();
		console.log('processed samples on state', this.state.samples)
		this.state.samples.map(evt=>{
			this.schedule(evt.spl, evt.time)
		})
	}
	playTransport (e) {
		e.preventDefault();
		//this.props.play();

		Tone.Transport.start();
	}

	render () {
		console.log('controls props', this.props)
		return (
			<div id='controls'>
				<button id='schedule' value="test1" onClick={this.scheduleAll}>testschedule</button>
				<button id='play' value="test2" onClick={this.playTransport}>testplay</button>
  		</div>
		)
	}
}

const mapStateToProps = ({events}) => ({
    events
})
export default connect(
    mapStateToProps,
    {play, clearTimeline, startEditing, stopEditing}
)(Controls)