import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import creatLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import initialState from './reducers/initialState'

export default createStore(rootReducer, initialState, applyMiddleware(creatLogger(), thunkMiddleware))