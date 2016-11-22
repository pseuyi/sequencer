import React from 'react'
import { Object3D } from '../../js/react-threejs/src'
import Cube from './Cube'


// extened threejs cube-rotating example
// http://threejs.org/docs/index.html#Manual/Introduction/Creating_a_scene
export default class RenderObjects extends Object3D {

  constructor (...args) {
    super(...args)
    this.animate = ::this.animate

    this.state = {
      rotation: { x: 0, y: 0 },
    }
  }

  componentDidMount (...args) {
    super.componentDidMount(...args)
    this.animate()
  }

  // custom/example animation
  // rotating the cube
  animate () {
    requestAnimationFrame(this.animate)
    const { rotation } = this.state
    this.setState({
      rotation: {
        x: rotation.x + 0.1,
        y: rotation.y + 0.1,
      },
    })
  }

  // dragAndDrop() {

  // }

  render () {
    const { rotation } = this.state
    //should render an array of objects 
    return (
      <div>
        <Cube color={0xff0000} position={{ x: 5, y: 0, z: 0}} />
        <Cube color={0xff0000} position={{ x: 15, y: 0, z: 0}} />
        <Cube color={0xff0000} position={{ x: 15, y: 10, z: 0}} />
        <Cube color={0xff0000} position={{ x: 15, y: 10, z: 0}} />
    </div>)
  }
}

