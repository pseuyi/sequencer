import { combineReducers } from 'redux';
import { counter, songKey, songCreated, songs, isPlaying, events, sampleBrush, edit, filterBrush, patternPage, savePage, splashPage } from './timelineReducer';

const SCREEN_RESIZE = 'SCREEN_RESIZE'

export const screenResize = (width) => {
    return {
        type: SCREEN_RESIZE,
        screenWidth: width
    };
}

const screenWidth = (state = null, action) => {
    switch (action.type) {
        case SCREEN_RESIZE:
            return Object.assign({}, state, {
                screenWidth: action.screenWidth
            });
    }
    return state;
}

const rootReducer = combineReducers({
    screenWidth,
    isPlaying,
    events,
    sampleBrush, 
    edit, 
    filterBrush,
    patternPage,
    savePage,
    songs, 
    songCreated,
    splashPage, 
    songKey, 
    counter

});


export default rootReducer;
