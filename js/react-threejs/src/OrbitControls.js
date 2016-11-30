import React, { PropTypes } from 'react'
import THREE from 'three'
import _OrbitControls from '../threex/controls/OrbitControls'
import Object3D from './Object3D'

export default class OrbitControls extends Object3D {

  static contextTypes = {
    ...Object3D.contextTypes,
    domElement: PropTypes.object.isRequired,
    setControls: PropTypes.func.isRequired,
    setCamera: PropTypes.func.isRequired,
  };

  constructor (...args) {
    super(...args)
    this.animate = ::this.animate
    this.frame = null
  }

  // override
  componentDidMount (...args) {
    super.componentDidMount(...args)

    const { domElement, setControls } = this.context
    this.controls = new _OrbitControls(this.obj, domElement)

    // this.controls.target.set(0, 0, 100)
    this.update()
    setControls(this.controls)
    this.timer = new THREE.Clock()
    this.animate()
  }

  // override
  componentWillUnmount (...args) {
    cancelAnimationFrame(this.frame)
    this.controls.dispose()
    this.controls = null
    super.componentWillUnmount(...args)
  }

  componentDidUpdate() {
    this.update()
  }

  //this component is backed up by an object three node which in this case is the camera
  update() {
    if (this.obj !== this.props.camera) {
      this.obj = this.props.camera
      if (this.controls) {
        this.controls.object = this.obj
      }
      this.context.setCamera(this.obj)
    }

    if (this.props.onChange && this.controls)
      this.controls.addEventListener('change', this.props.onChange)
    //super.update()
  }

  animate () {
    this.frame = requestAnimationFrame(this.animate)
    this.controls.update(this.timer.getDelta())
  }

  // very weird, a PI-y needed for orbit controls
  render () {
    return <orbit-controls>{this.props.children}</orbit-controls>
    // (<Object3D rotation={{ y: Math.PI }}>
    //   {this.props.children}
    // </Object3D>)
  }
}
