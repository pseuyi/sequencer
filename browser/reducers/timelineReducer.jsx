import { combineReducers } from 'redux';
import * as firebase from 'firebase'
// import store from '../store';

import initialState from './initialState';

// import store from '../store'
// store.subscribe(store.getState())
// console.log('store-----' , store)

const ADD_MY_OBJECT = 'ADD_MY_OBJECT';
const PLAY = 'PLAY';
const STOP = 'STOP';
const SAMPLE_BRUSH = 'CHECKOUT_BRUSH';
const NEW_COORDS = 'NEW_COORDS';
const CLEAR_TIMELINE = 'CLEAR_TIMELINE';
const EDIT = 'EDIT';
const STOP_EDITING = 'STOP_EDITING';
const DELETE_ONE = 'DELETE_ONE';
const FILTER_BRUSH = 'FILTER_BRUSH';
const SET_FILTER = 'SET_FILTER';
const CANCEL_FILTER = 'CANCEL_FILTER';
const CANCEL_BRUSH = 'CANCEL_BRUSH';
const UPDATE_POSITION = 'UPDATE_POSITION'
const FETCH_SONGS = 'FETCH_SONGS';
const SAVE_SONG = 'SAVE_SONG';
const TOGGLE_PATTERN_PAGE = 'TOGGLE_PATTERN_PAGE'
const TOGGLE_SAVE_PAGE = 'TOGGLE_SAVE_PAGE'
const LOAD = 'LOAD'
const SAVE_SONG_SUCCESS = 'SAVE_SONG_SUCCESS'
const TOGGLE_SPLASH_PAGE = 'TOGGLE_SPLASH_PAGE'
const BRUSH_POSITION = 'BRUSH_POSITION'
const START_CLOCK = 'START_CLOCK'
const STAGE_SAMPLE = 'STAGE_SAMPLE'
const CLEAR_STAGE = 'CLEAR_STAGE'
const ADD_EVENT = 'ADD_EVENT'
const CLEAR_EVENTS = 'CLEAR_EVENTS'
const SET_SONG_REF = 'SET_SONG_REF'
const CLEAR_SONG_KEY = 'CLEAR_SONG_KEY'
const ADD_TO_PATTERN = 'ADD_TO_PATTERN'
const COUNTER = 'COUNTER'

export const addObject = (myObject) => ({
  type: ADD_MY_OBJECT,
  myObject
})

export const play = () => ({
	type: PLAY
})
export const stop = () => ({
    type: STOP
})

export const setBrush = (data) => ({
    type: SAMPLE_BRUSH,
    data
})

export const cancelBrush = () => ({
    type: CANCEL_BRUSH,
})

export const cancelFilter = () => ({
    type: CANCEL_FILTER
})

export const startEditing = () => ({
    type: EDIT
})

export const stopEditing = () => ({
    type: STOP_EDITING
})

export const clearTimeline = () => ({
    type: CLEAR_TIMELINE
})

export const deleteOne = (id) => ({
    type: DELETE_ONE,
    id
})

export const setFilter = (id, effect) => ({
    type: SET_FILTER,
    id: id,
    effect: effect
})

export const chooseFilter = (data) => ({
    type: FILTER_BRUSH,
    data
})

export const updatePosition = (position, id) => ({
    type: UPDATE_POSITION,
    position,
    id
})

export const songCreate = () => ({
    type: SAVE_SONG,
    songSaved: true
})

export const saveSongSuccess = () => ({
    type: TOGGLE_SAVE_PAGE
})

export const songsFetch = (songs) => ({
    type: FETCH_SONGS,
    songs
})

export const togglePatternPage = () => ({
    type: TOGGLE_PATTERN_PAGE
})

export const toggleSavePage = () => ({
    type: TOGGLE_SAVE_PAGE
})

export const toggleSplashPage = () => ({
    type: TOGGLE_SPLASH_PAGE
})

export const loadPattern = (events) => ({
    type: LOAD,
    events
})

export const brushPosition = (position) => ({
    type: BRUSH_POSITION,
    position
})
export const startClock = (time) => ({
    type: START_CLOCK,
    time
})
export const stage = (sample) => ({
    type: STAGE_SAMPLE,
    sample
})
export const clearStage = () => ({
    type: CLEAR_STAGE
})

export const addEventId = (event) => ({
    type: ADD_EVENT,
    event
})
export const clearEventIds = () => ({
    type: CLEAR_EVENTS
})

export const createSong = (events, songName, userName) => {

  return (dispatch) => {
      //fix below --> need songID
    firebase.database().ref(`/songs`)
      .push({events, songName, userName, time: firebase.database.ServerValue.TIMESTAMP})
      .then(() => {
        dispatch(songCreate());
      });
  };
};

export const addObjectToFB = (data) => {
    return (dispatch) => {
        firebase.database().ref(`/songs`)
        .child('username').set(data)
        .then(()=> {
            console.log("SAVED TO FB")
        })
    }
}
//songs: {
    //songId: {
    //     events,
    //     songName,
    //     userName
    // }
// }


// export const employeesFetch = () => {
//   const { currentUser } = firebase.auth();

//   return (dispatch) => {
//     firebase.database().ref(`/users/${currentUser.uid}/employees`)
//       .on('value', snapshot => {
//         dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
//       });
//   };
// };

export const fetchSongs = () => {
  return (dispatch) => {
    const ref = firebase.database().ref(`/songs`)
    // console.log("FETCHSONGS---REF: ", ref)
    ref.on('value', snapshot => {
        // console.log("FETCHSONGS---SNAPSHOT: ", Object.keys(snapshot.val())[0])
          let obj = snapshot.val();
          const songArr = Object.keys(obj).map(key => {
            //   console.log("KEY IN FETCHSONGS OBJ", key)
              return obj[key]
          }
         
          );
          for(let i = 0; i<songArr.length; i++){
              songArr[i].key = Object.keys(obj)[i]
          }

        //    console.log("SONGSFROMDB", songArr)

        //     function compare(a,b) {
        //         if (a.time > b.time)
        //             return -1;
        //         if (a.time < b.time)
        //             return 1;
        //         return 0;
        //     }
        //     let ends = songArr.slice(22, songArr.length)

        //     ends.sort(compare);
        //     console.log("SORTED ARRAY?", ends)
        
        dispatch(songsFetch(songArr));
      });
  };
};


//  orderByKey().endAt().limit(100)

// export const deleteSong = (song) => {
//     return (dispatch) => {
//         console.log('IN DELETESONG', song)
//         // var adaRef = firebase.database().ref("users/ada");
// var key = adaRef.key;
// key = adaRef.child("name/last").key;
//         let ref = firebase.database().ref(`/songs`)
//         .child(song.getKey()).removeValue();
//     }
// }

// export const newCoords = (coords) => ({
//     type: NEW_COORDS,
//     coords
// })

// export const newObjCoords = (state = null, action) => {
//     switch(action.type){
//         case NEW_COORDS: return action.coords
//         default: return state;
//     }
// }


export const songs = (state = [], action) => {
    switch(action.type){
        case FETCH_SONGS: {
        //     let obj = action.songs;
        //   const songArr = Object.keys(obj).map(key => obj[key]);
        //    console.log("SONGSFROMDB", Array.isArray(songArr))

            function compare(a,b) {
                if (a.time > b.time)
                    return -1;
                if (a.time < b.time)
                    return 1;
                return 0;
            }
            action.songs.sort(compare);
            console.log("SORTED ARRAY?", action.songs)
            return action.songs
            // let obj = action.songs;
            // const songArr = Object.keys(obj).map(key => obj[key]);
            // return songArr;

        }
        default: return state;
    }
}

export const songCreated = (state = false, action) => {
    switch(action.type){
        case SAVE_SONG: return action.songSaved;
        default: return state;
    }
}

// export const songSaved = (state = false, action) => {
//     switch(action.type){
//         case SAVE_SONG_SUCCESS: return action.successSaved
//         default: return state;
//     }
// }

export const isPlaying = (state = false, action) => {
    switch(action.type){
        case PLAY: return true;
        case STOP: return false;
        default: return state;
    }
}


let nextId = 0;

export const events = (state = [], action) => {

    switch(action.type){
        case ADD_MY_OBJECT: {
            return state.concat(
                Object.assign({id: nextId++}, action.myObject)
            )
        } case CLEAR_TIMELINE: {
            console.log("CLEARTIMELINE")
            return [];
        } case DELETE_ONE: {
            const filtered = state.filter((evt) => {

              return evt.id !== action.id
            })
            return filtered;
        } case SET_FILTER: {
            const updated = state.map((evt) => {
                if(evt.id===action.id) {
                    return Object.assign({}, evt, {effect: action.effect})
                }
                return evt
            })
            return updated;
        } case UPDATE_POSITION: {
            const updated = state.map((evt) => {
                if(evt.id===action.id) {
                    return Object.assign({}, evt, {position: action.position})
                }
                return evt
            })
            return updated;
        } case LOAD: return action.events || state;
        case ADD_TO_PATTERN: {
            return state.concat(
                Object.assign(action.object)
            )
        }
        default: return state;
    }
}

export const sampleBrush = (state = null, action) => {
    console.log("SAMPLEBRUSH", action.data)
    switch(action.type){
        case SAMPLE_BRUSH: return Object.assign({}, action.data, {position: {x: null, y: null}});
        case CANCEL_BRUSH: return null;
        case BRUSH_POSITION: {
            // console.log('REDUCERBRUSH---', action.position)
            return Object.assign({}, state, {position: action.position})
        }
        default: return state
    }
}

export const edit = (state = false, action) => {
    switch(action.type){
        case EDIT: return true;
        case STOP_EDITING: return false;
        default: return state;
    }
}

export const filterBrush = (state = null, action) => {
    switch(action.type){
        case FILTER_BRUSH: return action.data;
        case CANCEL_FILTER: return null;
        default: return state
    }
}

export const patternPage = (state = false, action) => {
    switch(action.type){
        case TOGGLE_PATTERN_PAGE: return !state;
        default: return state
    }
}
export const savePage = (state = false, action) => {
    switch(action.type){
        case TOGGLE_SAVE_PAGE: return !state;
        default: return state
    }
}

export const splashPage = (state = false, action) => {
    switch(action.type){
        case TOGGLE_SPLASH_PAGE: return !state;
        default: return state
    }
}
export const time = (state = Tone.Transport.seconds, action) => {
    switch(action.type){
        case START_CLOCK: return action.time;
        default: return state
    }
}
export const stagedSamples = (state = [], action) => {
    switch(action.type){
        case STAGE_SAMPLE: return state.concat(action.sample);
        case CLEAR_STAGE: return [];
        default: return state
    }
}
export const eventIds = (state = [], action) => {
    switch(action.type){
        case ADD_EVENT: return state.concat(action.event);
        case CLEAR_EVENTS: return [];
        default: return state
    }
}

export const setSongRef = (songKey) => ({
    type: SET_SONG_REF, 
    songKey
})

export const clearSongKey = () => ({
    type: CLEAR_SONG_KEY
})

export const songKey = (state = null, action) => {
    switch(action.type){
        case SET_SONG_REF: return action.songKey;
        case CLEAR_SONG_KEY: return null;
        default: return state
    }
}

// Needs SET_SONG_REF,
export const loadSong = song => dispatch => {
    const key = song.key;
    dispatch(setSongRef(key))
    // console.log('IN LOAD SONG', ref)
    // const ref = firebase.database().ref(`songs`);
    // console.log('IN LOAD SONG', ref.child(key).child('userName'));
    // .on('value', snap => dispatch(loadPattern(snap.val())))
}

export const addToPattern = (object) => ({
    type: ADD_TO_PATTERN, 
    object
})

export const initCounter = (number) =>  ({
    type: COUNTER,
    num: number
    
})

export const counter = (state = 5000, action) => {
    switch(action.type){
        case COUNTER: return action.num; 
        default: return state;
    }
}
// Components need to get songRef off state and pass it in
export const addTimelineEvent = (songKey, event, events, counter) => dispatch => {

    let eventsLength = events.length;
    const ref = firebase.database().ref(`/songs`)
    .child(songKey).child('events')

    // ref.on('value', snapshot => {
    //     const events = snapshot.val();
    //     eventsLength = events.length;
    // })
    let newCount = 1000;
    event.id = counter;
    console.log("ADDTIMELINEEVENT---", event)
    dispatch(addToPattern(event));
    // console.log("IN ADDTIMELINEEVENT bladh", eventsLength)
    
    // firebase.database().ref(`/songs`)
    // .child(songKey).child('events').child(eventsLength).set(event)
    // .then( () => {
    //     console.log("IN ADDTIMELINEEVENT PUSHED?")
    // })
    
    // const ref = songRef.push({event})
    // ref.child('id').set(ref.key)
}


// export default combineReducers({
// 	isPlaying,
// 	events,
//     sampleBrush
// });


// export default function artists (state = initialArtists, action) {
//   switch (action.type) {
//     case RECEIVE_ARTISTS: return action.artists;
//     default: return state;
//   }
// }