//store.subscribe().getState()

// loads up all the buffers
Tone.Buffer.on('load', function(){
})
// function to convert coords to time
// sample players
var sample1 = new Tone.Player("./sounds/aura_arp_pad.wav").toMaster();
//play as soon as the buffer is loaded
// player.autostart = true;
var sample2 = new Tone.Player("./sounds/128_beat_1.wav").toMaster();
var sample3 = new Tone.Player("./sounds/bring_me_pad.wav").toMaster();
var sample4 = new Tone.Player("./sounds/bringing_me_dolphins_fx.wav").toMaster();
var sample5 = new Tone.Player("./sounds/heaven_vox.wav").toMaster();
var sample6 = new Tone.Player("./sounds/128_beat_2.wav").toMaster();

// function for loading sample assuming sample storage array
// let samples = []
// function (filePath) {
// 	samples.push(new Tone.Player(filePath).toMaster());
// }


// effects
var distortion = new Tone.Distortion(0.3).toMaster();
var pitchDown = new Tone.PitchShift (-3).toMaster();
var pitchUp = new Tone.PitchShift (3).toMaster();
var reverb = new Tone.JCReverb(0.4).toMaster();
var vibra = new Tone.Vibrato(10, 0.5).toMaster()
// effect connections

// get the value from slider
let num;
window.nx.onload = function (){
	window.nxSlider.on('*', function(data){
			setBPM(data.value*240);
		})
}
// set bpm
function setBPM (num) {
	Tone.Transport.bpm.value = num;
}



// scheduling
Tone.Transport.scheduleOnce(function(time){
	sample1.connect(pitchDown);
	sample1.start();
}, 0);
// Tone.Transport.scheduleOnce(function(time){
// 	sample1.connect(pitchUp)
// }, 2);
Tone.Transport.scheduleRepeat(function(time){
	sample2.start();
}, '1m', 2, 4);
Tone.Transport.scheduleRepeat(function(time){
	sample3.start();
}, '1m', 1, 10);
Tone.Transport.schedule(function(time){
	sample4.start();
}, 5);
Tone.Transport.schedule(function(time){
	sample4.connect(reverb);
}, 7);
Tone.Transport.schedule(function(time){
	sample5.connect(vibra).start();
}, 4);
Tone.Transport.scheduleRepeat(function(time){
	sample6.start();
}, '1m', 6, 6);


document.querySelector("#theButton").addEventListener("click", function(){
  Tone.Transport.start();
});

// function for basic scheduling 
// map over samples storage and schedule each
// samples.forEach(sample=>{
//		schedule(sample, playStart, effects)
//	})
function schedule (sample, playStart, effects) {
	return Tone.Transport.schedule(function(time){
		effects.forEach(effect=>{
		//match effect to some object holding the master effects and connect sample to that
		})
		// once all effects are hooked up then start
		sample.start();
	}, playStart);
}
// function for loop scheduling
function scheduleRepeat (sample, interval, startTime, duration) {
	return Tone.Transport.schedule(function(time){
		sample.start();
	}, interval, startTime, duration);
}