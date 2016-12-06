
import { Provider } from 'react-redux'
import React from 'react'
import {render} from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import store from './store'
import * as firebase from 'firebase'
import AppContainer from './container/AppContainer'
import PatternsContainer from './container/PatternsContainer'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const config = {
        apiKey: "AIzaSyB0DO82ptZcRYz55xYKw0wHfvXBluo5XoY",
        authDomain: "pgb-vsu.firebaseapp.com",
        databaseURL: "https://pgb-vsu.firebaseio.com",
        storageBucket: "pgb-vsu.appspot.com",
        messagingSenderId: "130166279152"
    };

const fb = firebase  
  .initializeApp(config)
  .database()
  .ref();

// var load = document.getElementById('loadText')
// $('<div className="loading">Loading...</div>').appendTo('#pattern-modal')

export default fb; 
// import {Renderer, Camera, Scene} from 'react-threejs'
//store.subscribe(()=>{console.log(store.getState())})


render (
  <Provider store={store}>
    <Router history={browserHistory}>
  	  <Route path='/' component={AppContainer} />
    </Router>
  </Provider>,
  document.getElementById("main")
)

import {cancelBrush} from './reducers/timelineReducer'

window.addEventListener('keydown', evt => {
  if (evt.keyCode === 27 /* escape */) {
    console.log(cancelBrush())
    store.dispatch(cancelBrush())
  }
})