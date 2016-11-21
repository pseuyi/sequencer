import React from 'react'
import THREE from 'three'
import { Mesh, Object3D } from '../../js/react-threejs/src'
// http://threejs.org/examples/#webgl_geometry_dynamic
export default class Grid extends Object3D {
   constructor (...args) {
    super(...args)
    const geometry = this.geometry = new THREE.Geometry();
    var size = 100, step = 5;
     for ( var i = - size; i <= size; i += step ) {
        geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
        geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );
        geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
        geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );
    }
   
    const material = new THREE.LineBasicMaterial( { color: 0x0044ff} );
    this.mesh = new THREE.LineSegments( geometry, material );
  }
    componentDidMount (...args) {
    super.componentDidMount(...args)
    }
  render () {
    const { mesh } = this
    return (
      <Mesh obj={mesh} />
    )
  }
}
