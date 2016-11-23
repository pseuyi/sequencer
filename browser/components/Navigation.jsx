import React, { Component } from 'react'
import store from '../store'
import {setBrush} from '../reducers/timelineReducer'

export default class Navigation extends Component {
	constructor () {
		super()
		this.state = {
			open: false
		}
	};

	toggleNav = () => {
	  this.setState({open: !this.state.open});
	};

	checkoutBrush = (data) => {
		store.dispatch(setBrush(data))
	}

	render () {
		return (
			<div>
			  <div id='navigation' onMouseOver={()=>this.toggleNav()} onMouseOut={()=>this.toggleNav()} style={this.state.open? {width: '250px'} : {width: '2.7%'}}>

			    <svg id='chevron-right' fill="rgba(86, 101, 115, 0.7)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={this.state.open? {display: 'none'} : {display: 'block'}}>
			      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
			      <path d="M0 0h24v24H0z" fill="none"/>
			    </svg>

				  <div id="mySidenav" className={this.state.open?
				  	'sidenav sidenav-revealed' : 'sidenav'} >
			  		<a onClick={() => this.checkoutBrush({spl: "http://localhost:1337/", obj: 'cube', color: 'white'})}>samples</a>
				    <a onClick={() => this.checkoutBrush({spl: "http://localhost:1337/"})}>120 beat 1</a>
				    <a onClick={() => this.checkoutBrush({spl: "http://localhost:1337/"})}>120 beat 2</a>
				    <a onClick={() => this.checkoutBrush({spl: "http://localhost:1337/"})}>chorus</a>
				    <a onClick={() => this.checkoutBrush({spl: "http://localhost:1337/"})}>aura arps</a>
				    <a onClick={() => this.checkoutBrush({spl: "http://localhost:1337/"})}>dolplhins</a>
				    <a onClick={() => this.checkoutBrush({spl: "http://localhost:1337/"})}>heaven vox</a>
				    <a onClick={() => this.checkoutBrush({spl: "http://localhost:1337/"})}>strings</a>
				    <a onClick={() => this.checkoutBrush({spl: "http://localhost:1337/"})}>hurt u so bass</a>
				  </div>
			  </div>
			  <div id='test-interface'></div>
  		</div>
		)
	}
}
