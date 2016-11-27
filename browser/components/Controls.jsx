import React, { Component } from 'react'
import {connect} from 'react-redux'
import store from '../store'

export class Controls extends Component {
	constructor () {
		super()
		this.state = {
		}
	};

	// toggleNav = () => {
	//   this.setState({open: !this.state.open});
	// };

	render () {
		return (
			<div id='controls'>
				    <button value="test">testing</button>
  		</div>
		)
	}
}

const mapStateToProps = ({events}) => ({
    events
})
export default connect(
    mapStateToProps,
    null
)(Controls)