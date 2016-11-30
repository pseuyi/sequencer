import React from 'react'
import THREE from 'three'
import {Object3D, Mesh} from '../../js/react-threejs/src'

import {addObject} from '../reducers/timelineReducer'
import store from '../store'

export default class Icosahedron extends Object3D {
    constructor() {
        super()
        // this.geometry = new THREE.BoxGeometry(1,1,1)
        // this.material = new THREE.MeshBasicMaterial({color: 'white'})
    }

    geom = new THREE.IcosahedronGeometry( 5 )

    material = new THREE.MeshPhongMaterial({ color: '#07B8FD', shininess: 20, specular: '#C0C0C0' })

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
