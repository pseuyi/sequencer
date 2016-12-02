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
      size: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      controls: 0,
    };
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(0, 0, 150)
  }

  componentDidMount() {
    const setSize = () =>
      this.setState({
        size: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      });
    
    window.addEventListener('resize', setSize, false);
    setSize();
    this.props.startEditing();
  }

  switchControls = () => {
    this.setState({
      controls: (++this.state.controls) % 3
    })
  }

  // onCameraChange = (...args) => {console.log('camera changed', args) }

  render() {
    console.log('isPlaying?', this.props.isPlaying)
    const {width, height} = this.state.size
    return (
      <div>
        <Splash />
          <Controls />
          { this.props.patternPage && !this.props.savePage? <PatternsContainer /> : <div></div> }
          { this.props.savePage && !this.props.patternPage? <Save /> : <div></div> }
          { this.props.splashPage ? <Splash /> : <div></div> }
          { this.props.isPlaying? null:  <Navigation />}
        <div>
          <Renderer
            size={this.state.size}>
            <Scene>
              {do {
                if (this.state.controls === 0) {
                  (<OrbitControls
                      onChange={this.onCameraChange}
                      camera={this.camera}
                      />)
                } else if (this.state.controls === 1) {
                  (<FirstPersonControls position={{ z: 15 }}>
                    <Camera position={{x: 0, y: 0, z: 150}} />
                  </FirstPersonControls>)
                } else if (this.state.controls === 2) {
                  (<PointerLockControls position={{ y: 10, z: 15 }}>
                    <Camera position={{x: 0, y: 0, z: 150}} />
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

const mapStateToProps = ({isPlaying, songCreated, edit, patternPage, savePage, splashPage}) => ({
  isPlaying: isPlaying,
  edit: edit,
  patternPage: patternPage,
  savePage: savePage, 
  songCreated: songCreated,
  splashPage: splashPage
})

export default connect(
  mapStateToProps,
  {startEditing}
)(AppContainer)
