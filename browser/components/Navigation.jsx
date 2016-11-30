import React, { Component } from 'react'
import store from '../store'
import {setBrush, chooseFilter, cancelBrush, cancelFilter} from '../reducers/timelineReducer'

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
		super()
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
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: 'grey',
    accent1Color: 'grey',
		accent2Color: 'grey',
		accent3Color: 'grey',
    textColor: 'grey',
    canvasColor: 'black',
    borderColor: 'grey',
    disabledColor: 'grey',
    pickerHeaderColor: 'grey',
    clockCircleColor: 'grey'
  },
})
			// muiTheme.menuItem.selectedTextColor = 'white'
			muiTheme.dropDownMenu.accentColor= 'grey'
			
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
				store.dispatch(chooseFilter(data))
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
				  	'sidenav leftnav sidenav-revealed' : 'sidenav leftnav'} >
						<div>
							<DropDownMenu>
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/128_beat_1.wav", obj: 'tube'})}primaryText="beat 1 (128bpm)" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/128_beat_2.wav", obj: 'cylinder'})} primaryText="beat 2 (128bpm)" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/126_beat_1.wav", obj: 'cylinder'})} primaryText="beat 3 (126 bpm)" />
								<MenuItem primaryText="DRUM LOOP/KICKS" />
								</DropDownMenu>
						</div>
						<div>
						<DropDownMenu>
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/aura_arp_pad.wav", obj: 'dodecahedron'})} primaryText="aura arps" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/emotion_pad.wav", obj: 'dodecahedron'})} primaryText="pesh arps" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/haze_hit.wav", obj: 'dodecahedron'})} primaryText="haze hit" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/hurt_u_so_bass.wav", obj: 'torus-large'})} primaryText="hurt u so bass" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/moomin_808_bass.wav", obj: 'torus-small'})} primaryText="moomin 808 bass" />
								<MenuItem onClick={() => this.checkoutBrush({spl: "./sounds/heaven_vox.wav", obj: 'cube', color: 'white'})} primaryText="heaven vox" />
								<MenuItem primaryText="VOCALS" />
							</DropDownMenu>
						</div>
						<div>
							<DropDownMenu>
								<MenuItem primaryText="PADS" />
							</DropDownMenu>
						</div>
						<div>
							<DropDownMenu>
								<MenuItem primaryText="BASS" />
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
								<DropDownMenu>
									<MenuItem onClick={() => this.checkoutFilter({type: 'distortion'})} primaryText="distortion" />
									<MenuItem onClick={() => this.checkoutFilter({type: 'pingPong'})} primaryText="pingPong" />
									<MenuItem onClick={() => this.checkoutFilter({type: 'reverb'})} primaryText="reverb" />
									<MenuItem onClick={() => this.checkoutFilter({type: 'lowPass'})} primaryText="lowpass" />
									<MenuItem onClick={() => this.checkoutFilter({type: 'highPass'})} primaryText="highpass" />
									<MenuItem primaryText="EFFECTS" />
								</DropDownMenu>
							</div>
						</div>
					</div>
			  </div>

  		</div>
		)
	}
}

//"lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", or "peaking"

Navigation.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
        };


	

				    // <a onClick={() => this.checkoutBrush({spl: "./sounds/128_beat_2.wav", obj: 'cylinder'})}>beat 2 (128bpm)</a>
				    // <a onClick={() => this.checkoutBrush({spl: "./sounds/126_beat_1.wav", obj: 'cylinder'})}>beat 3 (126 bpm)</a>

				    // <a onClick={() => this.checkoutBrush({spl: "./sounds/aura_arp_pad.wav", obj: 'dodecahedron'})}>aura arps</a>
				    // <a onClick={() => this.checkoutBrush({spl: "./sounds/pesh_arp.wav", obj: 'dodecahedron'})}>pesh arps</a>
				    // <a onClick={() => this.checkoutBrush({spl: "./sounds/emotion_pad.wav", obj: 'dodecahedron'})}>emotion pad</a>
				    // <a onClick={() => this.checkoutBrush({spl: "./sounds/haze_hit.wav", obj: 'dodecahedron'})}>haze hit</a>

				    // <a onClick={() => this.checkoutBrush({spl: "./sounds/hurt_u_so_bass.wav", obj: 'torus-large'})}>hurt_u_so_bass</a>
				    // <a onClick={() => this.checkoutBrush({spl: "./sounds/moomin_808_bass.wav", obj: 'torus-small'})}>moomin 808 bass</a>

				    // <a onClick={() => this.checkoutBrush({spl: "./sounds/heaven_vox.wav", obj: 'cube', color: 'white'})}>heaven vox</a>
