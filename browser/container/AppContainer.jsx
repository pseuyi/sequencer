import React from 'react'
// import THREE from 'three'

import { Renderer, Camera, Scene, OrbitControls } from 'react-threejs'
import RenderCube from '../components/RenderCube'

export default class AppContainer extends React.Component{
    constructor() {
        super()
        this.state = {
            x: 0,
            y: 0,
            z: -5
        }
        
    }

    render() {
        return (
            <Renderer size={{width: window.innerWidth, height: window.innerHeight}}>
            <Scene>
                <OrbitControls position={{ x: 0, y: 0, z: -5 }} rotation={{ x: 0, y: 0, z: 3 }}>
                    <Camera />
                </OrbitControls>
                
                     <RenderCube />
            </Scene>
            </Renderer>
        )
    }
}

