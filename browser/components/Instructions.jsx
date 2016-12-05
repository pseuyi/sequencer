import React, { Component } from 'react'
import store from '../store'
import { toggleInstructionsPage } from '../reducers/timelineReducer';

export default class Instructions extends Component {
	constructor () {
		super()
		this.state = {
			open: false
		}
	};

	// for use with some button in controls to re-open  instruction
	toggle = () => {
	  this.setState({open: !this.state.open});
	};

	render () {
		return (
			<div>
			{
				this.state.open?
                null : 
				<div id='instructions-modal' onClick={this.props.toggleInstructionsPage}>
					<p className='top' id="top">
					</p>
					<h1>instructions</h1>
                    <div id='instructions-close'>
						<p id='close-instructions' onClick={this.toggle}>x</p>
					</div>
                    <div className="col-md-3 col-xs-4 instruction-div">
						<div>
						<p>drag and drop: ⇧ + click</p>
						<br>
						</br>
						</div>
						<div>
						<video name="VideoName" src="/videos/dragdrop.mov" preload="true" autoPlay="true" width="100%" height="100%">
						</video>
						</div>
                    </div>
                    <div className="col-md-3 col-xs-4 instruction-div">
						<div>
						<p>delete: two finger click</p>
						<br></br>
						</div>
						<div>
						<video name="VideoName" src="/videos/delete.mov" preload="true" autoPlay="true" width="100%" height="100%">
						</video>
						</div>
                    </div>
                    <div className="col-md-3 col-xs-4 instruction-div">
						<div>
						<p>orbit: ⌥ + click for orbit controls zoom: pinch, pan: two fingers</p>
						</div>
						<div>
						<video name="VideoName" src="/videos/orbitzoom.mov" preload="true" autoPlay="true" width="100%" height="100%">
						</video>
						</div>
                    </div>
				</div>
			}
  		</div>
		)
	}
}


<div className="col-md-3 col-xs-4 instruction-div">
    <p>test</p>
</div>