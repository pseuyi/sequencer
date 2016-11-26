import React, { PropTypes } from 'react'
import THREE from 'three'
import Stats from 'stats.js'
import Base from './Base'
import store from '../../../browser/store'
import {addObject, clearBrush, deleteOne} from '../../../browser/reducers/timelineReducer'


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
    this.stats = new Stats()

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
    this.refs.container.appendChild(this.stats.dom)
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
    this.stats.update()
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

  onClick = evt => {
    evt.preventDefault()
    const hits = this.getIntersections(evt)
    console.log('hits is', hits)
    const object = hits[0].object
    const points = hits[0].point
    const brushData = store.getState().sampleBrush;
  if(evt.type === 'contextmenu') {
      console.log('THIS AND EVT', object.id, evt, evt.type)
      store.dispatch(deleteOne(object.id))
    } else {
      if (brushData && store.getState().edit) {
        const data = {
          position: {x: points.x, y: points.y, z: 0.5},
          spl: brushData.spl,
          obj: brushData.obj,
          color: brushData.color,
          id: object.id
        }
        store.dispatch(addObject(data));
      }
    }
    //what is this taking care of?
    if (object.handlers && object.handlers.onClick) {
      object.handlers.onClick(evt)
    }
  }


  render() { 
    return (
    <div onClick={this.onClick} onContextMenu={this.onClick}>
      <div ref="container"></div>
      <div hidden>{this.props.children}</div>
    </div>)
  }
}
