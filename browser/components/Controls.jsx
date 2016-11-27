import React, { Component } from 'react'
import store from '../store'

export  class Controls extends Component {
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
			<div>

  		</div>
		)
	}
}

const mapStateToProps = ({edit}) => ({
    edit
})
export default connect(
    mapStateToProps,
    null
)(Controls)