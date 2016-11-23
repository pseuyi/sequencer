import React from 'react'
import THREE from 'three'
import { Renderer, Camera, Scene, Mesh } from '../../js/react-threejs/src'
import RenderObjects from '../components/RenderObjects'
import Sphere from '../components/Sphere'
import Grid from '../components/Grid'
import Navigation from '../components/Navigation'
import {connect} from 'react-redux'
import {play} from '../reducers/renderObjectsReducer'

export class AppContainer extends React.Component {
    constructor() {
        super()
        this.state = {
           panGesture: null,
           camera: {
                position: {x: 0, y: 0, z: 100}
           }
        }   
    }
    componentDidMount() {
        const setSize = () =>
            this.setState({
                size: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            })
        window.addEventListener('resize', setSize)
        setSize()
    }
    geometry = new THREE.BoxGeometry(1,1,1)
    material = new THREE.MeshBasicMaterial({
        color: 'red',
        side: THREE.DoubleSide,
    })
    onMouseDown = evt => {
        const {pageX: x, pageY: y} = evt
        console.log('did begin pan at', x, y)
        this.setState({
            panGesture: {
                start: {x, y},
                cameraStart: this.state.camera.position,
            }
        })
    }
    onMouseMove = evt => {
        const {pageX: x, pageY: y} = evt
        const {panGesture} = this.state
        if (!panGesture) return
        const newPos = {
                        x: x - panGesture.start.x + panGesture.cameraStart.x,
                        z: y - panGesture.start.y + panGesture.cameraStart.z,
                    }
        console.log('panned to', newPos)
        this.setState({
            camera: {
                position: newPos
            }
        })
    }
    onMouseUp = () => this.setState({panGesture: null})
    onWheel = evt => {
        evt.preventDefault()
        const {deltaX: x, deltaY: y, ctrlKey} = evt
        const yAxis = ctrlKey ? 'z' : 'y'
        const otherAxis = ctrlKey ? 'y' : 'z'
        const yMultiplier = ctrlKey ? 1 : -1
        const sensitivity = 0.2
        const newPos = {
                        x: this.state.camera.position.x + sensitivity * x,
                        [yAxis]: this.state.camera.position[yAxis] + yMultiplier * sensitivity * y,
                        [otherAxis]: this.state.camera.position[otherAxis]
                    }
        console.log('panned to', newPos)
        this.setState({
            camera: {
                position: newPos
            }
        })
   
    }
    render() {
        //console.log('-----------------controls',OrbitControls)
        return (
            <div>
                <Navigation />
                <div onWheel={this.onWheel}>
                    <Renderer
                        size={{width: window.innerWidth, height: window.innerHeight}}>
                        <Scene>
                            <Camera position={this.state.camera.position} />
                            <Mesh geometry={this.geometry} material={this.material} />
                            <Grid position={{x: 0, y: -5, z: 0}}/>
                            <RenderObjects />
                        </Scene>
                    </Renderer>
                    <button onClick={this.props.play} value="PLAY" style={{position: 'fixed', top:0, right:0}}>play</button>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    {play}
)(AppContainer)
