import React from 'react'
import THREE from 'three'
console.log('THREE=', THREE)
import {Object3D, Mesh} from '../../js/react-threejs/src'

import {addObject} from '../reducers/timelineReducer'
import store from '../store'

export default class Cube extends Object3D {
    constructor() {
        super()
        // this.geometry = new THREE.BoxGeometry(1,1,1)
        // this.material = new THREE.MeshBasicMaterial({color: 'white'})
    }

    geom = new THREE.TorusKnotGeometry( 10, 5, 30, 10 );

    material = new THREE.MeshPhongMaterial({ color: '#5F7D99', shininess: 20, specular: '#15B9BB' })

    render() {
        return (
            <Mesh geometry={this.geom} material={this.material} onMouseDown={this.props.onMouseDown}>
                {this.props.children}
            </Mesh>
        )
    }
}

//on click
// cube_data = {
//   key: cube.key
//   sample: this.props.sample
//   coord: this.props.position.z
// }
