
// loads up all the buffers
Tone.Buffer.on('load', function(){
})

// sample players
var sample1 = new Tone.Player("./sounds/aura_arp_pad.wav").toMaster();
//play as soon as the buffer is loaded
// player.autostart = true;
var sample2 = new Tone.Player("./sounds/128_beat_1.wav").toMaster();
var sample3 = new Tone.Player("./sounds/bring_me_pad.wav").toMaster();
var sample4 = new Tone.Player("./sounds/bringing_me_dolphins_fx.wav").toMaster();
var sample5 = new Tone.Player("./sounds/heaven_vox.wav").toMaster();


// effects
var distortion = new Tone.Distortion(0.3).toMaster();
var pitchShift = new Tone.PitchShift (-2).toMaster();
var reverb = new Tone.JCReverb(0.4).toMaster();
var vibra = new Tone.Vibrato(10, 0.5).toMaster()
// effect connections


// scheduling
Tone.Transport.scheduleOnce(function(time){
	sample1.connect(pitchShift);
	sample1.start();
}, 0);
Tone.Transport.scheduleRepeat(function(time){
	sample2.start();
}, '1m', 2, 12);
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

document.querySelector("#theButton").addEventListener("click", function(){
  Tone.Transport.start();
});

// basic scheduling function
function schedule (sample, playTime) {
	return Tone.Transport.schedule(function(time){
		sample.start();
	}, playTime);
}