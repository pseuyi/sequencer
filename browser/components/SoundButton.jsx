import React, {Component} from 'react'
import THREE from 'three'
import { Mesh, Object3D } from '../../js/react-threejs/src'
import Cube from './Cube';
// http://threejs.org/examples/#webgl_geometry_dynamic
export default class Button extends Component {
    componentDidMount (...args) {
    super.componentDidMount(...args)
    this.addMyObject = this.addMyObject.bind(this);
    }

    addMyObject(){
        <Cube />
    }
    

  render () {

    return (
      <button onClick={this.addMyObject}></button>
    )
  }
}