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
					<p className='top'>
						<span>play</span><span>reset</span><span>submit</span><span>patterns</span><span>instructions</span><span>share</span>
					</p>

					<h1>pgb * vsu</h1>
					<p className='title'>polyphonic game board virtual sampling unit</p>
					<p className='splash-description'> A web tool that allows for visual audio sequencing and sample editing.  Users can process .wav samples using various effects and dynamically sequence them on a pitch sensitive board. Finished patterns can be saved, loaded, and played again or shared with friends.</p>
				</div>
				: null
			}
  		</div>
		)
	}
}