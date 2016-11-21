import React from 'react'
import THREE from 'three'
import { Renderer, Camera, Scene, Mesh } from '../../js/react-threejs/src'
import RenderCube from '../components/RenderCube'
import Sphere from '../components/Sphere'
import Grid from '../components/Grid'

export default class AppContainer extends React.Component{
    constructor() {
        super()
        this.state = {
           panGesture: null,
           camera: {
                position: {x: 0, y: 0, z: 0}
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
    render() {
        //console.log('-----------------controls',OrbitControls)
        return (
            <div onMouseDown={this.onMouseDown}
                onMouseMove={this.onMouseMove}
                onMouseUp={this.onMouseUp}>
            <Renderer
                size={{width: window.innerWidth, height: window.innerHeight}}>
                <Scene>
                    <Camera position={this.state.camera.position} />
                    <Mesh geometry={this.geometry} material={this.material} />
                    <Grid position={{x: 0, y: -5, z: 0}}/>
                    <Sphere position={{x: 0, y: 2, z: 0}}/>
                    <RenderCube />
                </Scene>
            </Renderer>
            </div>
        )
    }
}
