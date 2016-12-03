import React, { Component } from 'react'
import store from '../store'

export default class Splash extends Component {
	constructor () {
		super()
		this.state = {
			open: true
		}
	};

	// for use with some button in controls to re-open splash + instruction
	toggle = () => {
	  this.setState({open: !this.state.open});
	};

	render () {
		return (
			<div>
			{
				this.state.open?
				<div id='splash-modal' onClick={this.toggle}>
					<div id="instruction-videos">
						<video name="Video Name"src="/videos/demo.mov"  preload="true" autoPlay="autoplay" width="100%" height="100%">
						</video>
					</div>
				</div>
				: null
			}
  		</div>
		)
	}
}

// instructional labels (currently not used)
// <span>play</span><span>reset</span><span>submit</span><span>patterns</span><span>instructions</span><span>share</span>

// <video controls="controls" width="800" height="600" name="Video Name" src="/videos/adddelete.mov"></video>