import { combineReducers } from 'redux';
import * as firebase from 'firebase'

import initialState from './initialState';

const ADD_MY_OBJECT = 'ADD_MY_OBJECT';
const PLAY = 'PLAY';
const STOP = 'STOP';
const SAMPLE_BRUSH = 'CHECKOUT_BRUSH';
const CLEAR_BRUSH = 'CLEAR_BRUSH';
const NEW_COORDS = 'NEW_COORDS';
const CLEAR_TIMELINE = 'CLEAR_TIMELINE';
const EDIT = 'EDIT';
const STOP_EDITING = 'STOP_EDITING';
const DELETE_ONE = 'DELETE_ONE';
const FILTER_BRUSH = 'FILTER_BRUSH';
const SET_FILTER = 'SET_FILTER';
const CANCEL_FILTER = 'CANCEL_FILTER';
const CANCEL_BRUSH = 'CANCEL_BRUSH';
const FETCH_SONGS = 'FETCH_SONGS';
const SAVE_SONG = 'SAVE_SONG';
const TOGGLE_PATTERN_PAGE = 'TOGGLE_PATTERN_PAGE'
const TOGGLE_SAVE_PAGE = 'TOGGLE_SAVE_PAGE'
const LOAD = 'LOAD'

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

export const songCreate = () => ({
    type: SAVE_SONG, 
    songSaved: true
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

export const loadPattern = (events) => ({
    type: LOAD,
    events
})

export const createSong = (events, songName, userName) => {
  return (dispatch) => {
      //fix below --> need songID
    firebase.database().ref(`/songs`)
      .push({events, songName, userName})
      .then(() => {
        dispatch(songCreate());
      });
  };
};
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
    firebase.database().ref(`/songs`)
      .on('value', snapshot => {
          console.log("SONGSFROMDB", snapshot.val())
        dispatch(songsFetch(snapshot.val()));
      });
  };
};



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
            let obj = action.songs;
            const songArr = Object.keys(obj).map(key => obj[key]);
            return songArr;
            
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
        } case LOAD: return action.events || state;
        
        default: return state;
    }
}

export const sampleBrush = (state = null, action) => {
    console.log("SAMPLEBRUSH", action.data)
    switch(action.type){
        case SAMPLE_BRUSH: return action.data;
        case CANCEL_BRUSH: return null; 
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
