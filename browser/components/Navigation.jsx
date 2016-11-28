import React, { Component } from 'react'
import store from '../store'
import {setBrush, setFilter, cancelBrush, cancelFilter} from '../reducers/timelineReducer'

export default class Navigation extends Component {
	constructor () {
		super()
		this.state = {
			open: false,
			openR: false
		}
	};

	toggleNav = () => {
	  this.setState({open: !this.state.open});
	};
	toggleNavR = () => {
	  this.setState({openR: !this.state.openR});
	};

	checkoutBrush = (data) => {
		if(store.getState().edit){
				store.dispatch(cancelFilter());
				store.dispatch(setBrush(data))
		}
	}

	checkoutFilter = (data) => {
			if(store.getState().edit){
				store.dispatch(cancelBrush());
				store.dispatch(setFilter(data))
		}
	}

	render () {
		return (
			<div>
			  <div id='navigationL' onMouseOver={()=>this.toggleNav()} onMouseOut={()=>this.toggleNav()} style={this.state.open? {width: '250px'} : {width: '2.7%'}}>

			    <svg id='chevron-right' fill="rgba(86, 101, 115, 0.7)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={this.state.open? {display: 'none'} : {display: 'block'}}>
			      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
			      <path d="M0 0h24v24H0z" fill="none"/>
			    </svg>
				  <div id="mySidenavL" className={this.state.open?
				  	'sidenav leftnav sidenav-revealed dropdown' : 'sidenav leftnav dropdown '} >
						<ul className="dropdown-menu multi-level">
				  	<li className="dropdown-submenu">
							<a tabIndex="-1" href="#">samples</a>
							<ul className="dropdown-menu">
								<li><a tabIndex="-1" href="#" onClick={() => this.checkoutBrush({spl: "./sounds/128_beat_1.wav", obj: 'cylinder'})}>beat 1 (128bpm)</a></li>
								<li><a tabIndex="-1" href="#" onClick={() => this.checkoutBrush({spl: "./sounds/128_beat_2.wav", obj: 'cylinder'})}>beat 2 (128bpm)</a></li>
								<li><a onClick={() => this.checkoutBrush({spl: "./sounds/126_beat_1.wav", obj: 'cylinder'})}>beat 3 (126 bpm)</a></li>

								<li><a onClick={() => this.checkoutBrush({spl: "./sounds/aura_arp_pad.wav", obj: 'dodecahedron'})}>aura arps</a></li>
								<li><a onClick={() => this.checkoutBrush({spl: "./sounds/pesh_arp.wav", obj: 'dodecahedron'})}>pesh arps</a></li>
								<li><a onClick={() => this.checkoutBrush({spl: "./sounds/emotion_pad.wav", obj: 'dodecahedron'})}>emotion pad</a></li>
								<li><a onClick={() => this.checkoutBrush({spl: "./sounds/haze_hit.wav", obj: 'dodecahedron'})}>haze hit</a></li>

								<li><a onClick={() => this.checkoutBrush({spl: "./sounds/hurt_u_so_bass.wav", obj: 'torus-large'})}>hurt_u_so_bass</a></li>
								<li><a onClick={() => this.checkoutBrush({spl: "./sounds/moomin_808_bass.wav", obj: 'torus-small'})}>moomin 808 bass</a></li>

								<li><a onClick={() => this.checkoutBrush({spl: "./sounds/heaven_vox.wav", obj: 'cube', color: 'white'})}>heaven vox</a></li>
							</ul>
						</li>
						</ul>
				  </div>
			  </div>

			  <div id='navigationR' onMouseOver={()=>this.toggleNavR()} onMouseOut={()=>this.toggleNavR()} style={this.state.openR? {width: '250px'} : {width: '2.7%'}}>

			    <svg id='chevron-left' fill="rgba(86, 101, 115, 0.7)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={this.state.openR? {display: 'none'} : {display: 'block'}}>
					    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
					    <path d="M0 0h24v24H0z" fill="none"/>
					</svg>
				  <div id="mySidenavR" className={this.state.openR?
				  	'sidenav rightnav sidenav-revealed' : 'sidenav rightnav'} >
				  	<span>filters</span>
			  		<a onClick={() => this.checkoutBrush({spl: "http://localhost:1337/", obj: 'cube', color: 'white'})}>reverb</a>
						<a onClick={() => this.checkoutFilter({type: 'lowPass'})}>lowpass</a>
						<a onClick={() => this.checkoutFilter({type: 'highPass'})}>highpass</a>
						<a onClick={() => this.checkoutFilter({type: 'bandpass'})}>bandpass</a>
						<a onClick={() => this.checkoutFilter({type: 'lowshelf'})}>lowshelf</a>
						<a onClick={() => this.checkoutFilter({type: 'highshelf'})}>highshelf</a>
						<a onClick={() => this.checkoutFilter({type: 'notch'})}>notch</a>
						<a onClick={() => this.checkoutFilter({type: 'allpass'})}>allpass</a>
						<a onClick={() => this.checkoutFilter({type: 'peaking'})}>peaking</a>
				  </div>
			  </div>

  		</div>
		)
	}
}

//"lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", or "peaking"
