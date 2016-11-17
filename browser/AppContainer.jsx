import React, { Component } from 'react'
import { AudioContextComponent } from 'react-audio'
import { AudioSource } from './components/AudioSource'

var Context = window.AudioContext || window.webkitAudioContext
var context = new Context();

function loadSound(url) {
  var request = new XMLHttpRequest();
  request.open('GET', '/sound-file.wav', true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      dogBarkingBuffer = buffer;
    }, onError);
  }
  request.send();
}

export default class AppContainer extends Component {
	componentDidMount () {
	}
	render(){
		<AudioContextComponent audioContext={context} >
			<AudioSource />
		</AudioContextComponent>	
	}
}

// AudioContext sets audioContext and passes that to children

