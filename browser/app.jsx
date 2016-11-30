
import { Provider } from 'react-redux'
import React from 'react'
import {render} from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'
import store from './store'
import * as firebase from 'firebase'
import AppContainer from './container/AppContainer'
import SongsContainer from './container/SongsContainer'


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

  export default fb; 
// import {Renderer, Camera, Scene} from 'react-threejs'
store.subscribe(()=>{console.log(store.getState())})

render (
  <Provider store={store}>
    <Router history={hashHistory}>
  	  <Route path='/' component={AppContainer} />
      <Route path='/songs' component={SongsContainer} />
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