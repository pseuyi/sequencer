import React from 'react'
import { Object3D } from '../../js/react-threejs/src'
import Cube from './Cube'
import TorusSmall from './TorusSmall'
import TorusLarge from './TorusLarge'
import Cylinder from './Cylinder'
import Dodecahedron from './Dodecahedron';


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
    // console.log("RENDEROBJECTS", this.props)
    //should render an array of object 
    return (
      <div>
      {
        this.props.events && this.props.events.map((event, idx) => {
            if(event.obj === 'cube') {
              return <Cylinder color={0xffff00} position={{ x: -40, y: 30, z: 0}} />
            } else {
              return <TorusLarge key={idx} color={0xffff00} position={{ x: -15, y: -15, z: 0}} />
            }
        })
      }
    </div>)
  }
}


//  {
//           this.props.events && this.props.events.map((event)=> {
//             if(event.obj === 'cube') return <Cube color={0xff0000} position={{ x: 0, y: 0, z: 100}} />
//           })
//         }

// <TorusSmall color={0xffff00} position={{ x: 25, y: 20, z: 0}} />
//         <TorusLarge color={0xffff00} position={{ x: -15, y: -15, z: 0}} />
//         <Cylinder color={570xffff00} position={{ x: -40, y: 30, z: 0}} />
//         <Dodecahedron color={0xffff00} position={{ x: -60, y: 30, z: 0}} />
//         <Cube onClick={()=>{console.log('hi, i am the wire cube')}} color={0xff0000} position={{ x: 0, y: 0, z: 100}} />