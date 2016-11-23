import React from 'react'
import THREE from 'three'
import { Mesh, Object3D } from '../../js/react-threejs/src'
// http://threejs.org/examples/#webgl_geometry_dynamic
export default class Grid extends Mesh {
   constructor (...args) {
    super(...args)
    this.geometry = new THREE.PlaneBufferGeometry(500,500,1,1);
    
    // const material = this.material = new THREE.MeshBasicMaterial( { color: 0x0044ff, wireframe: true} );

    this.material = new THREE.ShaderMaterial( {

    uniforms: {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() }
    },
    vertexShader: `varying vec4 pos; varying vec2 vuv;
    void main() {
      gl_Position = pos = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      vuv = uv;
    }`
  ,
    fragmentShader: `varying vec4 pos; varying vec2 vuv;
    void main() {
      vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
      if (abs(mod(vuv.x * 1000.0, 20.0)) < 1.0) {
        color.r = vuv.x;
        color.b = 1.0;
      }
      if (abs(mod(vuv.y * 1000.0, 20.0)) < 1.0) { 
        color.g = vuv.y;
        color.b = 1.0;
      }
      gl_FragColor = color;
    }`

      } );
    
  }
  
  
  render () {
    const { material,geometry } = this
    return (
      <Mesh geometry={geometry} material={material}/>
    )
  }
}
