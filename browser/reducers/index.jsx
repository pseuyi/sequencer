import { combineReducers } from 'redux';

import {newObjCoords, isPlaying, events, sampleBrush} from './timelineReducer';

const rootReducer = combineReducers({
    isPlaying,
    events,
    sampleBrush, 
    newObjCoords
});


export default rootReducer;
