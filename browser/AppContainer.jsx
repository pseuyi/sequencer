import React, { Component } from 'react'
import { AudioContextComponent, Destination } from 'react-audio'
import Sample from './components/Sample'

var Context = window.AudioContext || window.webkitAudioContext
var context = new Context();
var testBuffer = null;

// function loadSound(url) {
//   var request = new XMLHttpRequest();
//   request.open('GET', '/sounds/heaven_vox.wav', true);
//   request.responseType = 'arraybuffer';

//   // Decode asynchronously
//   request.onload = function() {
//     context.decodeAudioData(request.response, function(buffer) {
//       testBuffer = buffer;
//     }, onError);
//   }
//   request.send();
// }

// function playSound(buffer) {
//   var source = context.createBufferSource();
//   source.buffer = buffer;                    
//   source.start(0);                         
// }


import { 
  Oscillator,
  BiquadFilter,
  Delay,
  DynamicsCompressor,
  StereoPanner,
  Gain,
  WaveShaper
} from 'react-audio'

// in a React render()


export default class AppContainer extends Component {
  componentDidMount() {
    this.animate()
  }

  animate = time => {
    if (this.state && !this.state.startTime) { this.setState({startTime: time}) }
    requestAnimationFrame(this.animate)
    this.setState({time})
  }

	render() {
    console.log(this.state)
    if (!this.state || !this.state.startTime || !this.state.time) {
      return null
    }
		return (
		<AudioContextComponent audioContext={context}> {
      (this.state.time < 500)
      ? <Sample url='/sounds/heaven_vox.wav' >
        <Gain />
        <DynamicsCompressor />
        <StereoPanner />
        <Delay />
        <WaveShaper />
        <Destination />
      </Sample>
      : <Sample url='/sounds/emotion_pad.wav' >
        <Gain />
        <BiquadFilter />
        <DynamicsCompressor />
        <StereoPanner />
        <Delay />
        <WaveShaper />
        <Destination />
      </Sample>
    } </AudioContextComponent>
		)
	}
} 


