// import store from './store'

// what does below do
//store.subscribe()
// need state at time play button is hit
//store.getState()

// set an audiocontext
// window.AudioContext = window.AudioContext || window.webkitAudioContext;
// var context = new AudioContext();
// var testSample = null;

// function load(url) {
//   var request = new XMLHttpRequest();
//   request.open('GET', url, true);
//   request.responseType = 'arraybuffer';

//   // Decode asynchronously
//   request.onload = function() {
//     context.decodeAudioData(request.response, function(buffer) {
//       testSample = buffer;
//     }, onError);
//   }
//   request.send();
// }

// function playSound(buffer) {
//   var source = context.createBufferSource();
//   source.buffer = buffer;             
//   source.connect(context.destination);     
//   source.start(0);                       
// }

//Tone.Buffer.on('load', function(){
// load sound files
	// load('/sounds/heaven_vox.wav');
// all buffers are loaded. 
// set sources to buffer.

//})

// what to schedule? need to know from store state 
// when to schedule? when placing piece (schedule that piece) but also play piece one time (use scheduleOnce)
	// when moving the piece around, use eventId to change the time it is played
// for each loaded sound, need to schedule below what do to and at what time
// store state [{what it is, what time}]
// let eventId = Tone.Transport.schedule(function(time){
//     //invoked when the Transport starts

//     sourceThing = {what it is}
//     source.start(time)

// }, {what time});
// set second param 'time' based on where object is in grid (in seconds)
// .schedule returns an unique id that can be put on store state

//delete tone if removed
//Tone.Transport.clear(event);

// onClick event listens for play
// if store says playing run below
//Tone.Transport.start();

// when do we need to call stop? a) when stop clicked b) when end is reached
//Tone.Transport.stop()



// var sampler = new Sampler("./sounds/heaven_vox.wav", function(){
// 	//repitch the sample down a half step
// 	sampler.triggerAttack(-1);
// }).toMaster();

var player = new Tone.Player("./sounds/heaven_vox.wav").toMaster();
//play as soon as the buffer is loaded
// player.autostart = true;

Tone.Transport.schedule(function(time){
	player.start();
}, 0);

document.querySelector("#theButton").addEventListener("click", function(){
  //get the current time
  // var now = Tone.now();
  Tone.Transport.start();
  //schedule relative to 'now'
	// playSound(testSample)
});