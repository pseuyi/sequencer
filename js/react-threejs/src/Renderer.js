import React, { PropTypes } from 'react'
import THREE from 'three'
// import Stats from 'stats.js'
import Base from './Base'
import store from '../../../browser/store'
import {addObject, clearBrush, deleteOne} from '../../../browser/reducers/timelineReducer'
import Scene from './Scene';


export default class Renderer extends Base {

  static childContextTypes = {
    setCamera: PropTypes.func.isRequired,
    setScene: PropTypes.func.isRequired,
    getSize: PropTypes.func.isRequired,
    domElement: PropTypes.object.isRequired,
    audioListener: PropTypes.object.isRequired,
  };

  getChildContext () {
    return {
      setCamera: ::this.setCamera,
      setScene: ::this.setScene,
      getSize: ::this.obj.getSize,
      domElement: this.obj.domElement,
      audioListener: this.audioListener,
    }
  }
  setCamera (camera) {
    this.camera = camera
  }
  setScene (scene) {
    this.scene = scene
  }

  // sendCoords = (coords) => {
	// 	store.dispatch(newCoords(coords))
	// }

  static propTypes = {
    ...Base.propTypes,
    size: PropTypes.object.isRequired,
    obj: PropTypes.object,
  };

  constructor (props, ...rest) {
    super(props, ...rest)
    this.animate = ::this.animate
    this.audioListener = new THREE.AudioListener()

    // below is fps counter
    // this.stats = new Stats()

    this.obj = props.obj || new THREE.WebGLRenderer({
      antialias: true,
    })
    this.obj.name = this.obj.name || this.constructor.name
    this.obj.setSize(props.size.width, props.size.height)
    this.obj.setClearColor(0x000000)
    this.raycaster = new THREE.Raycaster()
  }

  componentDidMount () {
    const setSize = () =>
      this.setState({
        size: {
          width: window.innerWidth,
          height: window.innerHeight
          }
    })
    window.addEventListener('resize', setSize)
    setSize()
    this.refs.container.appendChild(this.obj.domElement) // fixme
    // this.refs.container.appendChild(this.stats.dom)
    this.animate()
  }

  componentWillUnmount () {
    // temperately not considering Renderer being unmounted
    // it is singleton & dominating
  }

  // rendering scene with camera
  animate () {
    requestAnimationFrame(this.animate)
    this.obj.render(this.scene, this.camera)
    // this.stats.update()
  }

  positionFromMouseEvent(evt) {
    const {width, height} = this.obj.getSize()
    console.log('size', width, height)
    return {
      x: ( evt.clientX / width ) * 2 - 1,
      y: - ( evt.clientY / height ) * 2 + 1,
    }
  }

  getIntersections(evt) {
    const pos = this.positionFromMouseEvent(evt)
    this.raycaster.setFromCamera(pos, this.camera)
    return this.raycaster.intersectObjects(this.scene.children, true)
  }
//move this to appContainer
//PROBLEM: need to figure out how to identify 
//the 3D object that we click on the grid 
//in order to find it in the events array 
//(it needs to be something unique)
  onMouseDown = evt => {
    evt.preventDefault()
    const hits = this.getIntersections(evt)
    console.log('Renderer::onMouseDown hits=', hits)
    console.log('hit event ids=', hits.map(hit => hit.object.eventId_debug))
    for (let hit of hits) {
      const object = hit.object
      if (object.handlers && object.handlers.onMouseDown) {
        console.log('...dispatching onMouseDown to object:', object, 'hit:', hit)
        //console.log(object.material, object.material.color)
        // if (object.material.color)
        //   object.material.color.set( "white" )
        // else {
        //   console.log('object:', object, 'has no material color')
        // }
        object.handlers.onMouseDown(evt, hit)

        break;
      }
    }
    return

  //   console.log('hits is', hits)
  //   const object = hits[0].object
  //   const points = hits[0].point
  //   const brushData = store.getState().sampleBrush;
  // if(store.getState().edit){
  //   if(evt.type === 'contextmenu') {
  // //     if ( object.type === "Mesh" ) {
  // //       Scene.remove( object );
  // //       store.getState().events.splice( store.getState().events.indexOf( object ), 1 );
  // //     }
  //     console.log('THIS AND EVT', typeof object, evt, evt.type)
  //     const coordsObj = {x: points.x, y: points.y}
  //     store.dispatch(deleteOne(object.id))
  //   } else{ 
  //        if (store.getState().filterBrush && object.type === "Mesh"){
  //         console.log("IN COLORSET", object.type)
  //         //identify object, search events, change filter property
  //           //to the value of store.getState().filterBrush 
  //         //can we use this set function to delete and drag and drop things??
  //         object.material.color.set( "white" );
  //       }
  //       if (brushData) {
  //         const data = {
  //           position: {x: points.x, y: points.y, z: 0.5},
  //           spl: brushData.spl,
  //           obj: brushData.obj,
  //           color: brushData.color,
  //           id: store.getState().events.length-1, 
  //           filter: null, 
  //           time: Math.round((points.x + 250)/3)
  //         }
  //         store.dispatch(addObject(data));
  //       }
  //     }
  //   }
  //        //what is this taking care of?
  //       if (object.handlers && object.handlers.onClick) {
  //         object.handlers.onClick(evt)
  //       }
    
  }

  // onMouseDown = evt => {
    //     const {pageX: x, pageY: y} = evt
    //     console.log('did begin pan at', x, y)
    //     this.setState({
    //         panGesture: {
    //             start: {x, y},
    //             cameraStart: this.state.camera.position,
    //         }
    //     })
    // }
    // onMouseMove = evt => {
    //     const {pageX: x, pageY: y} = evt
    //     const {panGesture} = this.state
    //     if (!panGesture) return
    //     const newPos = {
    //                     x: x - panGesture.start.x + panGesture.cameraStart.x,
    //                     z: y - panGesture.start.y + panGesture.cameraStart.z,
    //                 }
    //     console.log('panned to', newPos)
    //     this.setState({
    //         camera: {
    //             position: newPos
    //         }
    //     })
    // }
    // onMouseUp = () => this.setState({panGesture: null})


  render() { 
    return (
    <div onMouseDown={this.onMouseDown} onContextMenu={evt => evt.preventDefault()}>
      <div ref="container"></div>
      <div hidden>{this.props.children}</div>
    </div>)
  }
}

// onContextMenu={this.onMouseDown}
