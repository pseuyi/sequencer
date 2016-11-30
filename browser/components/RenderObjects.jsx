import React from 'react'
import { Object3D } from '../../js/react-threejs/src'
import Cube from './Cube'
import TorusSmall from './TorusSmall'
import TorusLarge from './TorusLarge'
import Cylinder from './Cylinder'
import Dodecahedron from './Dodecahedron';
import Sphere from './Sphere'
import Tube from './Tube'
import TorusKnot from './TorusKnot'
import Icosahedron from './Icosahedron'


// extened threejs cube-rotating example
// http://threejs.org/docs/index.html#Manual/Introduction/Creating_a_scene
export default class RenderObjects extends Object3D {

  constructor (...args) {
    super(...args)
    this.animate = ::this.animate

    this.state = {
      rotation: { x: 0, y: 0 },
      panGesture: null,
      camera: {
        position: {x: 0, y: 0, z: 100}
      },
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


  onMouseDown = (timelineEvt) => (evt, hit) => {
  //   alert(
  //   "Key Pressed: " + String.fromCharCode(evt.charCode) + "\n"
  //   + "charCode: " + evt.charCode + "\n"
  //   + "SHIFT key pressed: " + evt.shiftKey + "\n"
  //   + "ALT key pressed: " + evt.altKey + "\n"
  // );

    if (evt.buttons === 2) {
      this.props.deleteObj(timelineEvt.id)
    }
    // if (evt.buttons === 1 && !evt.shiftKey) {
    //   this.props.addFilter(timelineEvt.id, this.props.filterBrush.type)
    // }

  }

  onDragStart = (timelineEvt) => (evt, hit) => {
    console.log('ONDRAGSTART', timelineEvt)
      if (evt.buttons === 1 && evt.shiftKey) {
        return timelineEvt;
      }

  }


  render () {
    const { rotation } = this.state
    // should render an array of object 
    return (
      // the number 2: 0 0 0 0 0 0 1 1
      // the number 2: 0 0 0 0 0 0 1 0
      // 1 & 2       : 0 0 0 0 0 0 1 0
      <div>
        
      {
        this.props.events && this.props.events.map((event, idx) => {
          
          if(event.obj === 'cube') {
            return <Cube
            key={event.id} color={0xff0000} 
            onMouseDown={this.onMouseDown(event)}
            position={{ x: event.position.x, y: event.position.y, z: event.position.z}} />
          } else if (event.obj === 'cylinder') {
              return <Cylinder
              key={event.id}
              onMouseDown={this.onMouseDown(event)} 
              onMouseMove={this.onMouseMove}
              onDragStart={this.onDragStart(event)}
              position={{ x: event.position.x , y: event.position.y, z: event.position.z}} />
          } else if (event.obj === 'torus-large') {
              return <TorusLarge
              key={event.id}
              onMouseDown={this.onMouseDown(event)}
              position={{ x: event.position.x, y: event.position.y, z: event.position.z}} />
          } else if (event.obj === 'dodecahedron') {
              return <Dodecahedron 
              key={event.id} 
              onMouseDown={this.onMouseDown(event)}
              position={{ x: event.position.x, y: event.position.y, z: event.position.z}} />
          } else if (event.obj === 'torus-small') {
              return <TorusSmall 
              key={event.id} color={0xffff00} 
              onMouseDown={this.onMouseDown(event)}
              position={{ x: event.position.x, y: event.position.y, z: event.position.z}} />
          } else if (event.obj === 'sphere') {
              return <Sphere 
              key={event.id}
              onMouseDown={this.onMouseDown(event)} 
              position={{ x: event.position.x, y: event.position.y, z: event.position.z}}/>
          } else if (event.obj === 'tube') {
              return <Tube 
              key={event.id}
              onMouseDown={this.onMouseDown(event)} 
              position={{ x: event.position.x, y: event.position.y, z: event.position.z}}/>
          } else if (event.obj === 'torus-knot') {
              return <TorusKnot 
              key={event.id}
              onMouseDown={this.onMouseDown(event)} 
              position={{ x: event.position.x, y: event.position.y, z: event.position.z}}/>
          } else if (event.obj === 'icosahedron') {
              return <Icosahedron 
              key={event.id}
              onMouseDown={this.onMouseDown(event)} 
              position={{ x: event.position.x, y: event.position.y, z: event.position.z}}/>
          } 
        })
      }
    </div>)
  }
}

// test shapes
        //<Tube position={{x: 0, y: -5, z: 0}} />
        //<TorusLarge position={{x: -50, y: 10, z: 0}} />
        //<TorusKnot rotation={rotation} position={{x: 0, y: -5, z: 0}} />
        //<Icosahedron rotation={rotation} position={{x: -50, y: -30, z: 0}} />
        //<Sphere rotation={rotation} position={{x: -100, y: -30, z: 10}} />


