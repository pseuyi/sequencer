import React, { Component } from 'react'
import { AudioContextComponent, Destination } from 'react-audio'
import AudioSource from './components/AudioSource'

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
	render() {
		return (
		<AudioContextComponent audioContext={context}>
		<AudioSource>
		  <Gain />
		  <BiquadFilter />
		  <DynamicsCompressor />
		  <StereoPanner />
		  <Delay />
		  <WaveShaper />
		  <Destination />
		</AudioSource>
		</AudioContextComponent>
		)
	}
} 


