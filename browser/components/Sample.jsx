import React, { Component } from 'react'
import AudioSource from 'react-audio/lib/nodes/inputs/shared/AudioSource'

export default class Sample extends AudioSource {
	//what do to do start playing sound below?
	loadSound(url) {
		return new Promise( (resolve, reject) => {              
			var request = new XMLHttpRequest();
			request.open('GET', url, true);
			request.responseType = 'arraybuffer';
			console.log("this.context in loadSound", this.context)
			// Decode asynchronously
			request.onload = () =>
				this.context.audioContext.decodeAudioData(request.response, resolve)
			request.send();
		})
	}

	// playSound() {
	// 	this.loadSound('/sounds/heaven_vox.wav')
	// 	console.log("PLAYSOUND", source)
	            
	// }

	
	componentDidMount() {
		if (this.node)
			this.node.start()
	}	

	componentWillMount(source) {
		this.node = this.context.audioContext.createBufferSource();

		var { node, audioNodeChain } = this
		// // code below comes from oscillator componen sets first node
		// var { audioContext } = this.context
		// 	console.log("this.context", this.context)
		// 	node = source;
		// // else console.error('Not supported in this browser')
		this.loadSound(this.props.url).then(buffer => {
			this.node.buffer = buffer;
			super.componentWillMount();
		});
		// audioNodeChain.setSource(node)
		// update.call(this) this is redudant copied from oscillator

		// not sure what this is	
	}
}
