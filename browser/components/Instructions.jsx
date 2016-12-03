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
				<div id='instructions-modal' onClick={this.toggle}>
					<p className='top' id="top">
						
					</p>

					<h1>INSTRUCTIONS</h1>
					<p className='title'>polyphonic game board virtual sampling unit</p>
					<p className='splash-description'> A web tool that allows for visual audio sequencing and sample editing.  Users can process .wav samples using various effects and dynamically sequence them on a pitch sensitive board. Finished patterns can be saved, loaded, and played again or shared with friends.</p>
					<div className='control-instructions'>
					</div>
					<div id="instruction-videos">
						<div className="video-bg"><img id='gif' src="/videos/add_delete.gif" alt="demo" title="demo" />
						<p>controls: delete element: right click | drag and drop element: shift + click | orbit control: alt + click | zooming: pinch | panning: two fingers</p>
						</div>
						<div className="video-bg"><img id='gif' src="/videos/add_delete.gif" alt="demo" title="demo" />
						</div>
						<p>to make a pattern: select a sample from menu on left</p>
						<div className="video-bg"><img id='gif' src="/videos/add_delete.gif" alt="demo" title="demo" />
						<p>click on the grid to sequence (patterns play from left to right) to add effects select from menu on rightpress play</p>
						</div>
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