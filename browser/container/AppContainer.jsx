import React from 'react'
// import THREE from 'three'

import { Renderer, Camera, Scene, OrbitControls } from '../../react-threejs/src'
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

    render() {
        console.log('-----------------controls',OrbitControls)
        return (
            <Renderer size={{width: window.innerWidth, height: window.innerHeight}}>
            <Scene>
                    <Camera />                
                    <RenderCube />
            </Scene>
            </Renderer>
        )
    }
}

