import React, { Component } from 'react'
import { AudioNodeChain}  from 'react-audio'

export default class AudioSource extends Component {
	constructor() {
		super()
		this.audioNodeChain = new AudioNodeChain()
	}

	getChildContext() {
		var { audioNodeChain } = this
		return { audioNodeChain }
	}

	componentWillMount() {
		var { node, audioNodeChain } = this
		audioNodeChain.setSource(node)
		update.call(this)
		// code below comes from oscillator componen sets first node
		var { audioContext } = this.context
			this.node = this.context.audioContext
		else
			console.error('Not supported in this browser')
		// not sure what this is
		super.componentWillMount()
	}

	componentDidMount() {
	// set off the node chain
		if (this.node)
			this.node.start()
	}

	componentDidUpdate() {
		update.call(this)
	}

	componentWillUnmount() {
		var { node } = this
		this.audioNodeChain.remove(node)
	}


	render() {
		return <div>{this.props.children}</div>
	}
}

// component is passing 'this.context.audioNodeChain' to its children
AudioSource.childContextTypes = {
	audioNodeChain: React.PropTypes.any.isRequired
}

// component has access to this.context.audioContext from AudioContextComponent
AudioSource.contextTypes = {
	audioContext: React.PropTypes.any.isRequired
}