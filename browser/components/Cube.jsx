import React from 'react'
import THREE from 'three'
import {Object3D, Mesh} from '../../js/react-threejs/src'
import {addObject} from '../reducers/timelineReducer'
import store from '../store'

export default class Cube extends Object3D {

  data = {
      key: 1,
      sample: 'sounds/pesh_arp.wav',
      coords: this.props.position.z
  }

  geometry = new THREE.CubeGeometry( 10, 10, 10 )
  material = new THREE.MeshPhongMaterial({ color: '#8FA3BD', shininess: 100, specular: '#ff69b4' })

  render() {
    return (
      <Mesh geometry={this.geometry} material={this.material} onMouseDown={this.props.onMouseDown} onDragStart={this.props.onDragStart}>
        {this.props.children}
      </Mesh>
    )
  }
}
