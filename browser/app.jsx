'use strict'

import { Provider } from 'react-redux'
import React from 'react'
import {render} from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'
import store from './store'

import AppContainer from './container/AppContainer'
import Songs from './components/Songs'



// import {Renderer, Camera, Scene} from 'react-threejs'

store.subscribe(()=>{console.log(store.getState())})

render (
  <Provider store={store}>
    <Router history={hashHistory}>
  	  <Route path='/' component={AppContainer} />
      <Route path='/songs' component={Songs} />
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