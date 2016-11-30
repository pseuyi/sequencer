import React from 'react'
import THREE from 'three'

import { Renderer, Camera, Scene, Mesh } from '../../js/react-threejs/src'
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
           panGesture: null,
           camera: {
                position: {x: 0, y: 0, z: 300}
            },
            windowSize: {
                width: window.innerWidth,
                height: window.innerHeight
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
        this.props.startEditing();
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

    // addObjectHandler = (evt) => {
    //     console.log('add object handler this', this)
    //     evt.preventDefault()
    //     const brushData = store.getState().sampleBrush;
    //     console.log("brushData", brushData);
    //     console.log("EVT", evt)
    //     if (brushData) {
    //         console.log("IN IF STATEMENT", evt.pageX, evt.pageY)
    //         const data = {
    //             position: {x: evt.pageX, y: evt.pageY},
    //             spl: brushData.spl,
    //             obj: brushData.obj,
    //             color: brushData.color
    //         }
    //         this.props.addObject(data);

    //     }
    // }

    // handleSelection = () = {
    //     //get some data
    // }

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
                            <Camera position={this.state.camera.position} />

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
