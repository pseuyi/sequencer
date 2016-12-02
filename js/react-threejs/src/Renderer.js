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
    setControls: PropTypes.func.isRequired,
    getSize: PropTypes.func.isRequired,
    domElement: PropTypes.object.isRequired,
    audioListener: PropTypes.object.isRequired,
  };

  getChildContext () {
    return {
      setCamera: ::this.setCamera,
      setScene: ::this.setScene,
      setControls: ::this.setControls,
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
  setControls (controls) {
    this.controls = controls
    // this.controls.enabled = false
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
    // console.log('size', width, height)
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

  //FIX: have to click twice to get controls which prevents me from being able to turn them off onMouseUp
  onMouseDown = evt => {
    evt.preventDefault()
    const hits = this.getIntersections(evt)
    // console.log('hit event ids=', hits.map(hit => hit.object.eventId_debug))
    for (let hit of hits) {
      const object = hit.object
      const pickedUp = object.handlers &&
        object.handlers.onDragStart && object.handlers.onDragStart(evt, hit)
      console.log('RENDERER::PICKEDUP', pickedUp, 'HANDLERS', object.handlers)
      if (pickedUp) {
        this.setState({
          dragging: pickedUp,

          // Remember that we should re-enable the controls after the drag is over.
          shouldReenableControls: this.controls && this.controls.enabled,
        })

        // Disable camera controls during the drag.
        if (this.controls && this.controls.enabled)
          this.controls.enabled = false;
        break;
      }
      if (object.handlers && object.handlers.onMouseDown) {
        object.handlers.onMouseDown(evt, hit)

        break;
      }
    }
  }


  onMouseMove = evt => {
    const hits = this.getIntersections(evt)
    for (let hit of hits) {
      const object = hit.object
      if (object.handlers && object.handlers.onMouseMove && store.getState().sampleBrush) {
        object.handlers.onMouseMove(evt, hit)
        break;
      }
      if (this.state.dragging) {
          if (object.handlers && object.handlers.onDragOver) {
            object.handlers.onDragOver(evt, hit, this.state.dragging)
            break
          }

      }
    }
  }

  onMouseUp = evt => {
    // if (this.controls.enabled) {
    //   console.log('onMouseUp::CAMERA', this.camera, 'EVT', evt)
    //   // this.controls.enabled = false
    //   return;
    // }
    if (this.state.dragging) {
          console.log('DROP!!!!--------')

      // Reenable controls if we disabled them when the drag started.
      if (this.state.shouldReenableControls) {
        console.log('reenabling controls', this.controls)
        this.controls.enabled = true
        this.setState({
          shouldReenableControls: null,
        })
      }

      const hits = this.getIntersections(evt)
      for (let hit of hits) {
        const object = hit.object
        if (object.handlers && object.handlers.onDragDrop) {
          object.handlers.onDragDrop(evt, hit, this.state.dragging)

          this.setState({
            dragging: null,
          })
          // this.controls.enabled = false;
          break
        }
      }
    }
  }


  render() { 
    return (
    <div
      onMouseDown={this.onMouseDown}
      onMouseMove={this.onMouseMove}
      onMouseUp={this.onMouseUp}
      onContextMenu={evt => evt.preventDefault()}>
      <div ref="container"></div>
      <div hidden>{this.props.children}</div>
    </div>)
  }
}

// onContextMenu={this.onMouseDown}
