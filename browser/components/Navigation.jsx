import React, { Component } from 'react'

export default class Navigation extends Component {
	constructor () {
		super()
		this.openNav=this.openNav.bind(this);
		this.closeNav=this.closeNav.bind(this);
	}

	openNav () {
	  document.getElementById("mySidenav").style.width = "250px";
	  document.getElementById("chevron-right").style.display ='none';
	  document.getElementById("navigation").style.width = "250px";
	}

	closeNav() {
	  document.getElementById("mySidenav").style.width = "0";
	  document.getElementById("chevron-right").style.display ='block';
	  document.getElementById("navigation").style.width = "2.7%";
	}

	render () {
		return (
			<div>
			  <div id='navigation' onMouseOver={()=>this.openNav()} onMouseOut={()=>this.closeNav()}>

			    <svg id='chevron-right' fill="rgba(86, 101, 115, 0.7)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
			      <path d="M0 0h24v24H0z" fill="none"/>
			    </svg>

				  <div id="mySidenav" className="sidenav" >
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