import React, { Component } from 'react'
import {connect} from 'react-redux'
import store from '../store'
import { toggleInstructionsPage } from '../reducers/timelineReducer';

export class Instructions extends Component {
	constructor () {
		super()
		// this.state = {
		// 	open: false
		// }
	};
	// for use with some button in controls to re-open  instruction
	// toggle = () => {
	//   this.setState({open: !this.state.open});
	// };

	render () {
		return (
			<div>
				<div id='instructions-modal'>
					<p className='top' id="top">
					</p>
					<h3>instructions</h3>
					<h4>how to make a pattern</h4>
					<p>press esc to exit out of edit mode</p>
           <div id='close-btn-container'>
						<button id='instructions-close' onClick={this.props.toggleInstructionsPage}>x</button>
					</div>
                    <div className="col-md-3 col-xs-4 instruction-div">
						<div>
						<p>add sample: click on left panel and select</p>
						<br>
						</br>
						</div>
						<div>
						<video name="VideoName" src="/videos/add.mov" preload="true" autoPlay="true" loop="true" width="100%" height="100%">
						</video>
						</div>
                    </div>
                    <div className="col-md-3 col-xs-4 instruction-div">
						<div>
						<p>delete: two finger click</p>
						<br></br>
						</div>
						<div>
						<video name="VideoName" src="/videos/delete.mov" preload="true" autoPlay="true" width="100%" height="100%" loop="true">
						</video>
						</div>
                    </div>
                    <div className="col-md-3 col-xs-4 instruction-div">
						<div>
						<p>add filter on sample: click on right panel</p>
						<br>
						</br>
						</div>
						<div>
						<video name="VideoName" src="/videos/filter.mov" preload="true" autoPlay="true" width="100%" height="100%" loop="true">
						</video>
						</div>
                    </div>
					<div className="col-md-3 col-xs-4 instruction-div">
						<div>
						<p>drag and drop: ⇧ + click</p>
						<br>
						</br>
						</div>
						<div>
						<video name="VideoName" src="/videos/dragdrop.mov" preload="true" autoPlay="true" width="100%" height="100%" loop="true">
						</video>
						</div>
                    </div>
					<div className="col-md-3 col-xs-4 instruction-div">
						<div>
						<p>orbit control: ⌥ + click + drag</p>
						<br></br>
						</div>
						<div>
						<video name="VideoName" src="/videos/orbit.mov" preload="true" autoPlay="true" loop="true" width="100%" height="100%">
						</video>
						</div>
                    </div>
					<div className="col-md-3 col-xs-4 instruction-div">
						<div>
						<p>zoom: pinch, pan: two fingers</p>
						<br>
						</br>
						</div>
						<div>
						<video name="VideoName" src="/videos/zoom.mov" preload="true" autoPlay="true" loop="true" width="100%" height="100%">
						</video>
						</div>
           </div>
				</div>
			
  		</div>
		)
	}
}
const mapStateToProps = ({instructionsPage}) => ({instructionsPage})

export default connect(
    mapStateToProps,
    { toggleInstructionsPage }
    )(Instructions)

// <div className="col-md-3 col-xs-4 instruction-div">
//     <p>test</p>
// </div>