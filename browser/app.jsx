'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import AppContainer from './container/AppContainer'

import store from './store'
// import {Renderer, Camera, Scene} from 'react-threejs'

store.subscribe(()=>{console.log(store.getState())})

render (
  <Provider store={store}>
  	<AppContainer />
  </Provider>,
  document.getElementById("main")
)