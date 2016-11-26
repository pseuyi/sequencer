import { combineReducers } from 'redux';

import {isPlaying, events, sampleBrush} from './timelineReducer';

const rootReducer = combineReducers({
    isPlaying,
    events,
    sampleBrush
});


export default rootReducer;
