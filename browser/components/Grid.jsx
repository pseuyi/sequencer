import React from 'react'
import THREE from 'three'
import { Mesh, Object3D } from '../../js/react-threejs/src'
// http://threejs.org/examples/#webgl_geometry_dynamic
export default class Grid extends Mesh {
   constructor (...args) {
    super(...args)
    const geometry = this.geometry = new THREE.Geometry();
    var size = 100, step = 3;
     for ( var i = - size; i <= size; i += step ) {
        geometry.vertices.push( new THREE.Vector3( parseFloat(-size), parseFloat(0), parseFloat(i) ) );
        geometry.vertices.push( new THREE.Vector3(   parseFloat(size), parseFloat(0), parseFloat(i) ) );
        geometry.vertices.push( new THREE.Vector3( parseFloat(i), parseFloat(0), parseFloat(-size) ) );
        geometry.vertices.push( new THREE.Vector3( parseFloat(i), parseFloat(0),   parseFloat(size) ) );
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
