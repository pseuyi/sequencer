import { combineReducers } from 'redux';
import initialState from './initialState'

const ADD_MY_OBJECT = 'ADD_MY_OBJECT';
const PLAY = 'PLAY'

export const addObject = (myObjects) => ({
  type: ADD_MY_OBJECT, 
  myObjects
})
export const play = () => ({
	type: PLAY
})
const isPlaying = (state = false, action) => {
    switch(action.type){
        case PLAY: 
        	return true; 
        default: return state;
    }
}

const events = (state = [], action) => {
    switch(action.type){
        case ADD_MY_OBJECT: return action.myObjects; 
        default: return state;
    }
}

export default combineReducers({
	isPlaying,
	events
});


// export default function artists (state = initialArtists, action) {
//   switch (action.type) {
//     case RECEIVE_ARTISTS: return action.artists;
//     default: return state;
//   }
// }