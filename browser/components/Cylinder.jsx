import React from 'react'
import THREE from 'three'
import {Object3D, Mesh} from '../../js/react-threejs/src'

export default class Cylinder extends Object3D {
    
  geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
  material = new THREE.MeshPhongMaterial({specular: '#FFFF00',shininess: 100});

  render() { 
    return (
      <Mesh geometry={this.geometry} material={this.material} onMouseDown={this.props.onMouseDown} onDragStart={this.props.onDragStart}>
        {this.props.children} 
      </Mesh>
    )
  }
}
