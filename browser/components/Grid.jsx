import React from 'react';
import THREE from 'three';
import { Mesh, Object3D } from '../../js/react-threejs/src';

export default class Grid extends React.Component {
  constructor (...args) {
    super(...args);
    this.geometry = new THREE.PlaneBufferGeometry(500,500,1,1);
    
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
          color.b = -(vuv.x - 0.9);
          color.r = 0.11;
          color.g = 0.11;
        }
        if (abs(mod(vuv.y * 1000.0, 20.0)) < 1.0) { 
          color.b = vuv.y - 0.8;
          color.r = 0.1;
          color.g = 0.1;
        }
        gl_FragColor = color;
      }`
    } );
  }

  // hover = (evt, hit) => {
  //   console.log('HOVER----', this.props.sampleBrush)
  //   const points = hit.point
  //   const position = {x: points.x, y: points.y};
  //   this.props.brushPosition(position)
  // }

  onDragOver = (evt, hit, timelineEvt) => {
    // console.log('ONDRAGOVER--------', timelineEvt)
    const points = hit.point
    const position = {x: points.x, y: points.y, z: 0.5};
    const id = timelineEvt.id;
    this.props.updatePosition(position, id)
  }

  onDragDrop = (evt, hit, timelineEvt) => {
  }

  addObject = (evt, hit, ) => {
    const points = hit.point
    const brushData = this.props.sampleBrush  
    // console.log('BRUSHDATA------', this.props)
    
    if (brushData) {
      const data = {
        position: {x: points.x, y: points.y, z: 0.5},
        spl: brushData.spl,
        obj: brushData.obj,
        effect: null, 
        time: Math.round((points.x + 250)/20)
      };
      this.props.addObject(data);
    }
  }
  
  render () {
    const { material,geometry } = this
    console.log("PROPS IN GRID", this.props);
    return (
      <Mesh onMouseDown={this.addObject} geometry={geometry} material={material} onDragOver={this.onDragOver} onDragDrop={this.onDragDrop} />

    )
  }
}