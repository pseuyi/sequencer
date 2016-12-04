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
					<h1>INSTRUCTIONS</h1>
                    <div id='instructions-close'>
						<p id='close-instructions' onClick={this.toggle}>x</p>
					</div>
                    <div className="col-md-3 col-xs-4 instruction-div">
                        <p>test</p>
                    </div>
                    <div className="col-md-3 col-xs-4 instruction-div">
                        <p>test</p>
                    </div>
                    <div className="col-md-3 col-xs-4 instruction-div">
                        <p>test</p>
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