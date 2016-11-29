import React, { Component } from 'react'
import store from '../store'

export default class Save extends Component {
	constructor () {
		super()
		this.state = {
			open: false
		}
	};

	// for use with some button in controls to re-open splash + instruction
	toggle = () => {
	  this.setState({open: !this.state.open});
	};

	render () {
		return (
			<div>
			<h1>SAVE FORM</h1>
  		</div>
		)
	}
}