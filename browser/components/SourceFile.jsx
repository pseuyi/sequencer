import AudioSource from './shared/AudioSource'

export default class SourceAudio extends AudioSource {
	componentWillMount() {
		var { audioContext } = this.context
		if (audioContext.createOscillator)
			this.node = audioContext.createOscillator()
		else
			console.error('SourceAudio not supported in this browser')

		super.componentWillMount()
	}

	componentDidMount() {
		if (this.node)
			this.node.start()
	}
}
