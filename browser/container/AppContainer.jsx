import React from 'react'
import THREE from 'three'
import { Renderer, Camera, Scene, Mesh, AudioListener,
  OrbitControls,
  PointerLockControls,
  FirstPersonControls, } from '../../js/react-threejs/src'
import RenderObjectsContainer from '../container/RenderObjectsContainer'
import GridContainer from './GridContainer'
import PatternsContainer from './PatternsContainer'

import Sphere from '../components/Sphere'
import Splash from '../components/Splash'
import Navigation from '../components/Navigation'
import Controls from '../components/Controls'
import Save from '../components/Save'

import {connect} from 'react-redux'
import store from '../store'
import {startEditing} from '../reducers/timelineReducer'
import {deleteOne, addObject} from '../reducers/timelineReducer'

export class AppContainer extends React.Component {
    constructor() {
        super()
        this.state = {
           camera: {
                position: {x: 0, y: 0, z: 300}
            },
            windowSize: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            controls: 0,
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
        this.props.startEditing();

        window.addEventListener('keydown', ({ altKey }) => {
            if (altKey) this.switchControls()
        })
    }

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
        //console.log('panned to', newPos)
        this.setState({
            camera: {
                position: newPos
            }
        })
   
    }

    switchControls = () => {
        this.setState({
            controls: (++this.state.controls) % 3
        })
    }

    render() {
        return (
            <div>
                <Splash />
                { this.props.patternPage? <PatternsContainer /> : null }
                { this.props.savePage? <Save /> : null }
                <Navigation />
                <Controls />

                <div onWheel={this.onWheel}>
                    <Renderer
                        size={{width: window.innerWidth, height: window.innerHeight}}>
                        <Scene>
                        {do {
                                  if (this.state.controls === 0) {
                                    (<OrbitControls position={{ x: 9, y: 21, z: 20 }} rotation={{ x: 2, y: 0, z: 3 }}>
                                      <Camera position={this.state.camera.position} />
                                    </OrbitControls>)
                                  } else if (this.state.controls === 1) {
                                    (<FirstPersonControls position={{ z: 15 }}>
                                      <Camera position={this.state.camera.position} />
                                    </FirstPersonControls>)
                                  } else if (this.state.controls === 2) {
                                    (<PointerLockControls position={{ y: 10, z: 15 }}>
                                      <Camera position={this.state.camera.position} />
                                    </PointerLockControls>)
                                  }
                                }}

                            {
                                this.props.edit?
                                <GridContainer position={{x: 0, y: -5, z: 0}} />
                                : null
                            }
                            
                            <RenderObjectsContainer />
                        </Scene>
                    </Renderer>
                    
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({edit, patternPage, savePage}) => ({
    edit: edit,
    patternPage: patternPage,
    savePage: savePage
})
export default connect(
    mapStateToProps,
    {startEditing}
)(AppContainer)
