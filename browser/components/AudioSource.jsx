import React, { Component } from 'react'
import AudioNodeChain  from './AudioNodeChain'

export default class AudioSource extends Component {
	constructor() {
		super()
		console.log(AudioNodeChain)
		this.audioNodeChain = new AudioNodeChain()
		// this.playSound = this.playSound.bind(this);
		this.loadSound = this.loadSound.bind(this);
		this.state = {testBuffer: null}

		console.log('made a new chain', this.audioNodeChain)
	}

	//what do to do start playing sound below?
	loadSound(url) {
		return new Promise( (resolve, reject) => {
			var source = this.context.audioContext.createBufferSource();                    
			var request = new XMLHttpRequest();
			request.open('GET', url, true);
			request.responseType = 'arraybuffer';
			console.log("this.context in loadSound", this.context)
			// Decode asynchronously
			request.onload = () =>
				this.context.audioContext.decodeAudioData(request.response, (buffer) => {
					source.buffer = buffer;
					// this.addNode(source);
					// this.audioNodeChain.setSource(source);
					console.log("LOADSOUND", source)
					// source.connect(this.context.audioContext.destination)
					console.log('one more?', this.audioNodeChain)
				//   this.setState({testBuffer: buffer})
					resolve(source);
				});
			request.send();
		})
	}

	// playSound() {
	// 	this.loadSound('/sounds/heaven_vox.wav')
	// 	console.log("PLAYSOUND", source)
	            
	// }	



	getChildContext() {
		var { audioNodeChain } = this
		return { audioNodeChain }
	}

	componentWillMount(source) {
		var { node, audioNodeChain } = this
		// // code below comes from oscillator componen sets first node
		// var { audioContext } = this.context
		// 	console.log("this.context", this.context)
		// 	node = source;
		// // else console.error('Not supported in this browser')
		this.loadSound('/sounds/heaven_vox.wav').then(source => {
			this.node = source;
			super.componentWillMount();
		});
		// audioNodeChain.setSource(node)
		// update.call(this) this is redudant copied from oscillator

		// not sure what this is
		
	}

	componentDidMount() {
			var { node, audioNodeChain } = this
	// set off the node chain
		if (this.node)
			console.log("node", this.node)
			this.node.start()
	
		// this.playSound();
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