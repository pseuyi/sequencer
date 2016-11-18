import store from './store'

// what does below do
store.subscribe()
// need state at time play button is hit
store.getState()

// set an audiocontext

Tone.Buffer.on('load', function(){
// load sound files
// load all into buffer
//all buffers are loaded.   
// web audio loading

// set sources to buffer
})

// what to schedule? need to know from store state
// for each loaded sound, need to schedule below what do to and at what time
// store state [{what it is, what time}]
let eventId = Tone.Transport.schedule(function(time){
    //invoked when the Transport starts

    sourceThing = {what it is}
    source.start(time)

}, {what time});
// set second param 'time' based on where object is in grid (in seconds)

// .schedule returns an unique id that can be put on store state

// onClick event listens for play
// if store says playing run below
Tone.Transport.start();

// when do we need to call stop? a) when stop clicked b) when end is reached
Tone.Transport.stop()


document.querySelector("#theButton").addEventListener("click", function(){
    //get the current time
    var now = Tone.now();
    //schedule relative to 'now'
    sine.start(now);
    sine.stop(now + 2);
});