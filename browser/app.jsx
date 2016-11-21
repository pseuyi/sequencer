'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import AppContainer from './AppContainer'

import store from './store'
// import {Renderer, Camera, Scene} from 'react-threejs'

render (
  <Provider store={store}>

  </Provider>,
  document.getElementById("main")
)