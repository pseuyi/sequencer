import React, { Component } from 'react'

export default class Navigation extends Component {
	constructor () {
		super()
		this.state = {
			open: false
		}
	}

	toggleNav = () => {
	  this.setState({open: !this.state.open});
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
			  		<a href="http://localhost:1337/">samples</a>
				    <a href="#">120 beat 1</a>
				    <a href="#">120 beat 2</a>
				    <a href="#">chorus</a>
				    <a href="#">aura arps</a>
				    <a href="#">dolplhins</a>
				    <a href="#">heaven vox</a>
				    <a href="#">strings</a>
				    <a href="#">hurt u so bass</a>
				  </div>
			  </div>
			  <div id='test-interface'></div>
  		</div>
		)
	}
}