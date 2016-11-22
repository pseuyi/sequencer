import React from 'react'
import THREE from 'three'
console.log('THREE=', THREE)
import {Mesh} from '../../js/react-threejs/src'

import {addObject} from '../reducers/timelineReducer'
import store from '../store'

export default class Cube extends Mesh {
    // constructor() {
    //     super()
    //     // this.geometry = new THREE.BoxGeometry(1,1,1)
    //     // this.material = new THREE.MeshBasicMaterial({color: 'white'})
    // }

    addCube = (data) =>
        store.dispatch(addObject(data))
  

    
    geometry = new THREE.CubeGeometry( 5, 5, 5 )
    material = new THREE.MeshBasicMaterial({ color: 0xFF00FF, wireframe: true })

    render() { 
    console.log('CUBE props are', this.props)
        return (
            <Mesh geometry={this.geometry} material={this.material}>
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
