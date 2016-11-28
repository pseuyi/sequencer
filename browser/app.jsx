'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import AppContainer from './container/AppContainer'
import * as firebase from 'firebase'

import store from './store'
// import {Renderer, Camera, Scene} from 'react-threejs'

var config = {
    apiKey: "AIzaSyB0DO82ptZcRYz55xYKw0wHfvXBluo5XoY",
    authDomain: "pgb-vsu.firebaseapp.com",
    databaseURL: "https://pgb-vsu.firebaseio.com",
    storageBucket: "pgb-vsu.appspot.com",
    messagingSenderId: "130166279152"
  };
  firebase.initializeApp(config);

store.subscribe(()=>{console.log(store.getState())})

render (
  <Provider store={store}>
  	<AppContainer />
  </Provider>,
  document.getElementById("main")
)