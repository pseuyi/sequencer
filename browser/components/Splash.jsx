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
					<p className='top' id="top">
						<span id='instructions'>play</span><span id='instructions'>reset</span><span id='instructions'>submit</span><span id='instructions'>patterns</span><span id='instructions'>instructions</span><span id='instructions'>share</span>
					</p>

					<h1>pgb * vsu</h1>
					<div id='visual-container'>
						<p className='visual-samples'>samples</p>
						<p className='visual-effects'>effects</p>
						
					</div>
					<p className='title'>polyphonic game board virtual sampling unit</p>
					<p className='splash-description'> A web tool that allows for visual audio sequencing and sample editing.  Users can process .wav samples using various effects and dynamically sequence them on a pitch sensitive board. Finished patterns can be saved, loaded, and played again or shared with friends.</p>
					<div className='control-instructions'>
						<p id='instructions'>instructions: delete element: right click | drag and drop element: shift + click | orbit control: alt + click</p>
					</div>
				</div>
				: null
			}
  		</div>
		)
	}
}