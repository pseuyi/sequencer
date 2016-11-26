import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import creatLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import initialState from './reducers/initialState'
import {screenResize} from './reducers/index'

const store = createStore(rootReducer, initialState, applyMiddleware(creatLogger(), thunkMiddleware))

window.addEventListener('resize', () => {
    store.dispatch(screenResize(window.innerWidth));
});

export default store;