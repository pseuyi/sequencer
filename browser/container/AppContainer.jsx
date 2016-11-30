import React from 'react';
import THREE from 'three';
import {connect} from 'react-redux';
import store from '../store';
import { Renderer, 
  Camera, 
  Scene, 
  Mesh, 
  AudioListener, //I don't think we need this?
  OrbitControls,
  PointerLockControls,
  FirstPersonControls } from '../../js/react-threejs/src';
import RenderObjectsContainer from '../container/RenderObjectsContainer';
import GridContainer from './GridContainer';
import PatternsContainer from './PatternsContainer';
import Sphere from '../components/Sphere';
import Splash from '../components/Splash';
import Navigation from '../components/Navigation';
import Controls from '../components/Controls';
import Save from '../components/Save';
import {startEditing} from '../reducers/timelineReducer';
import {deleteOne, addObject} from '../reducers/timelineReducer';

export class AppContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      camera: {
        position: {x: 0, y: 0, z: 150}
      },
      windowSize: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      controls: 0,
    };
  }

  componentDidMount() {
    const setSize = () =>
      this.setState({
        size: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      });
    
    window.addEventListener('resize', setSize);
    setSize();
    this.props.startEditing();
  }

  //show them the other controls maybe better?
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
    this.setState({
      camera: {
        position: newPos
      }
    })
  }

  addObjectHandler = (evt) => {
    console.log('add object handler this', this)
    evt.preventDefault()
    const brushData = store.getState().sampleBrush;
    console.log("brushData", brushData);
    console.log("EVT", evt)
    if (brushData) {
      console.log("IN IF STATEMENT", evt.pageX, evt.pageY)
      const data = {
        position: {x: evt.pageX, y: evt.pageY},
        spl: brushData.spl,
        obj: brushData.obj,
        color: brushData.color
      }
      this.props.addObject(data);
    }
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
                  (<OrbitControls position={this.state.camera.position} rotation={{ x: 2, y: 0, z: 3 }}>
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
