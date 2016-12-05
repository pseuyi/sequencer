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
					<div id="info-div">
						<div id="project-title">
							<p className='title'>pgb * vsu</p>
						</div>
						<div>
							<p id="description1">polyphonic game board virtual sampling unit</p>
						</div>
						<div id="d2">
							<p id="description2"> A web tool that allows for visual audio sequencing and sample editing.  Users can process .wav samples using various effects and dynamically sequence them on a pitch sensitive board. Finished patterns can be saved, loaded, and played again or shared with friends.</p>
						</div>
						<div className="enter">
							<p id="enter">
							ENTER
							</p>
						</div>
						<p id="description3" > Click 
							<svg fill="rgba(86, 101, 115, 0.7)" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg" onClick={this.props.toggleSplashPage}>
								<path d="M0 0h24v24H0z" fill="none"/>
								<path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
							</svg> for instructions
						</p>

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
// <div className='control-instructions'>					
// 	<ul>
// 	<p>to make a pattern: </p>
// 		<li>select a sample from menu on left</li>
// 		<li>click on the grid to sequence (patterns play from left to right)</li>
// 		<li>to add effects select from menu on right</li>
// 		<li>press play</li>
// 	</ul>

// 	<p>controls: delete element: right click | drag and drop element: shift + click | orbit control: alt + click | zooming: pinch | panning: two fingers</p>
// </div>
