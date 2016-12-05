import React, { Component } from 'react';
import store from '../store';
import {setBrush, chooseFilter, cancelBrush, cancelFilter} from '../reducers/timelineReducer';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';


// const muiTheme = getMuiTheme({}, {
//   menuItem: {
//     selectedTextColor: 'white',
//   },
// });



export default class Navigation extends Component {
	constructor () {
		super();
		this.state = {
			open: false,
			openR: false,
			value1: 'Samples',
			value2: 'More Samples',
			value3: 'EFFECTS'
			
		}
	};

	getChildContext() {
			const muiTheme = getMuiTheme({
  palette: {
    primary1Color: 'D8DBE2',
    accent1Color: 'D8DBE2',
		accent2Color: 'D8DBE2',
		accent3Color: 'D8DBE2',
    textColor: 'D8DBE2',
    canvasColor: 'black',
    borderColor: 'D8DBE2',
    disabledColor: 'D8DBE2',
    pickerHeaderColor: 'D8DBE2',
    clockCircleColor: 'D8DBE2'
  },
})
			muiTheme.menuItem.textColor = 'D8DBE2'
			muiTheme.dropDownMenu.accentColor= 'D8DBE2'
			
			// muiTheme.palette.textColor = 'red'
			// muiTheme.appBar.color= 'red'
			// muiTheme.appBar.textColor= 'red'
			// muiTheme.cardText.textColor= 'red'

			//accent2Color - samplecolor
			//canvascolor - menu on click


      return { muiTheme: muiTheme };
  }
	
	handleChange = (event, index, value) => this.setState({value});

	toggleNav = () => {
	  this.setState({open: !this.state.open});
	}

	toggleNavR = () => {
	  this.setState({openR: !this.state.openR});
	};

	checkoutBrush = (data) => {
		if(store.getState().edit){
				store.dispatch(cancelFilter());
				store.dispatch(setBrush(data));
		}
	};

	checkoutFilter = (data) => {
			if(store.getState().edit){
				store.dispatch(cancelBrush());
				store.dispatch(chooseFilter(data));
		}
	};

	render () {
		return (
			<div>
			  <div id='navigationL' onMouseOver={()=>this.toggleNav()} onMouseOut={()=>this.toggleNav()} style={this.state.open? {width: '250px'} : {width: '2.7%'}}>

			    <svg id='chevron-right' fill="rgba(86, 101, 115, 0.7)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={this.state.open? {display: 'none'} : {display: 'block'}}>
			      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
			      <path d="M0 0h24v24H0z" fill="none"/>
			    </svg>

				  <div id="mySidenavL" className={this.state.open?
				  	'sidenav leftnav sidenav-revealed' : 'sidenav leftnav'} >

						<div>
						<span id="sample-name">SAMPLES</span>
							<DropDownMenu>
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/128_beat_1.wav", obj: 'cylinder'})}primaryText="beat 1 (128bpm)" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/128_beat_2.wav", obj: 'cylinder'})} primaryText="beat 2 (128bpm)" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/126_beat_1.wav", obj: 'cylinder'})} primaryText="beat 3 (126 bpm)" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/assembly_line_beat.wav", obj: 'cylinder'})} primaryText="assemblly line" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/deeper_beat.wav", obj: 'cylinder'})} primaryText="deeper beat" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/god_made_me_funky_beat.wav", obj: 'cylinder'})} primaryText="god made me funky beat" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/life_could_beat.wav", obj: 'cylinder'})} primaryText="life could beat" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/mystery_beat.wav", obj: 'cylinder'})} primaryText="mystery beat" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/shaker_beat.wav", obj: 'cylinder'})} primaryText="shaker beat" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/skree_beat.wav", obj: 'cylinder'})} primaryText="skree beat" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/x-static_bass.wav", obj: 'cylinder'})} primaryText="x-static bass drum" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/synthy_kick.wav", obj: 'cylinder'})} primaryText="synthy kick" />
								<MenuItem primaryText="DRUM LOOP/KICKS" />
							</DropDownMenu>
						</div>
						<div>
							<DropDownMenu>
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/aura_arp_pad.wav", obj: 'torus-knot'})} primaryText="aura arps" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/aura_rise.wav", obj: 'torus-knot'})} primaryText="aura rise" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/pesh_arp.wav", obj: 'torus-knot'})} primaryText="pesh arps" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/emotion_pad.wav", obj: 'dodecahedron'})} primaryText="emotion pad" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/bring_me_pad.wav", obj: 'dodecahedron'})} primaryText="bring me pad" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/enchanted_pad.wav", obj: 'dodecahedron'})} primaryText="enchanted pad" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/360_pad.wav", obj: 'dodecahedron'})} primaryText="360 pad" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/moomin_piano.wav", obj: 'torus-knot'})} primaryText="moomin piano" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/headless_strings.wav", obj: 'torus-knot'})} primaryText="headless strings" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/liberty_chord.wav", obj: 'dodecahedron'})} primaryText="liberty chord" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/solution_synth.wav", obj: 'dodecahedron'})} primaryText="solution synth" />
								<MenuItem primaryText="PADS/ARPS" />
							</DropDownMenu>
						</div>
						<div>
							<DropDownMenu>
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/hurt_u_so_bass.wav", obj: 'torus-large'})} primaryText="hurt u so bass" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/moomin_808_bass.wav", obj: 'torus-small'})} primaryText="moomin 808 bass" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/ghost_sub.wav", obj: 'torus-large'})} primaryText="ghost sub" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/jazzy_bass.wav", obj: 'torus-small'})} primaryText="jazzy bass" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/night_bass.wav", obj: 'torus-large'})} primaryText="night bass" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/times_bass.wav", obj: 'torus-small'})} primaryText="times bass" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/type_bass.wav", obj: 'torus-small'})} primaryText="type bass" />
								<MenuItem primaryText="BASS" />
							</DropDownMenu>
						</div>
						<div>
							<DropDownMenu>
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/heaven_vox.wav", obj: 'cube', color: 'white'})} primaryText="heaven vox" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/careless_synth_vox.wav", obj: 'cube', color: 'purple'})} primaryText="careless synth vox" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/stoned_vox.wav", obj: 'tube', color: 'white'})} primaryText="stoned vox" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/pure_vocal.wav", obj: 'tube', color: 'white'})} primaryText="pure vocal" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/dreams_vox.wav", obj: 'tube', color: 'white'})} primaryText="dreams vox" />
								<MenuItem primaryText="VOCALS" />
							</DropDownMenu>
						</div>
						<div>
							<DropDownMenu>
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/haze_hit.wav", obj: 'icosahedron'})} primaryText="haze hit" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/mars_hit.wav", obj: 'cube'})} primaryText="mars hit" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/blue_water_fx.wav", obj: 'icosahedron'})} primaryText="blue water fx" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/bringing_me_dolphins_fx.wav", obj: 'sphere'})} primaryText="bringing me dolphins fx" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/r5_808_clap.wav", obj: 'sphere'})} primaryText="808 clap" />
								<MenuItem primaryText="FX/OTHER" />
							</DropDownMenu>
						</div>
 				  
				  </div>
			  </div>

			  <div id='navigationR' onMouseOver={()=>this.toggleNavR()} onMouseOut={()=>this.toggleNavR()} style={this.state.openR? {width: '250px'} : {width: '2.7%'}}>
			    <svg id='chevron-left' fill="rgba(86, 101, 115, 0.7)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={this.state.openR? {display: 'none'} : {display: 'block'}}>
					    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
					    <path d="M0 0h24v24H0z" fill="none"/>
					</svg>
					<div>
						<div id="mySidenavR" className={this.state.openR?
							'sidenav rightnav sidenav-revealed' : 'sidenav rightnav'} >
							<div>
									<span>EFFECTS</span>
									<MenuItem onClick={() => this.checkoutFilter({type: 'distortion'})} primaryText="distortion" />
									<MenuItem onClick={() => this.checkoutFilter({type: 'pingPong'})} primaryText="pingPong" />
									<MenuItem onClick={() => this.checkoutFilter({type: 'reverb'})} primaryText="reverb" />
									<MenuItem onClick={() => this.checkoutFilter({type: 'lowPass'})} primaryText="lowpass" />
									<MenuItem onClick={() => this.checkoutFilter({type: 'highPass'})} primaryText="highpass" />
							</div>
						</div>
					</div>
			  </div>
			</div>
		)
	}
}

Navigation.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
        };
