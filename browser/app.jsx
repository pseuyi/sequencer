'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
// import {Renderer, Camera, Scene} from 'react-threejs'

import AppContainer from './container/AppContainer'

render (
  <AppContainer />,
  document.getElementById("main")
)