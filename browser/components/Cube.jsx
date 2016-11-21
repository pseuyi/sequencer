import React from 'react'
import THREE from 'three'
console.log('THREE=', THREE)
import {Mesh} from '../../react-threejs/src'

export default class Cube extends Mesh {
    // constructor(props) {
    //     super(props)
    //     this.geometry = new THREE.BoxGeometry(1,1,1)
    //     this.material = new THREE.MeshBasicMaterial({color: 'white'})
    // }
    
    geometry = new THREE.CubeGeometry( 5, 5, 5 )
    material = new THREE.MeshBasicMaterial({ color: 0xFF00FF, wireframe: true });

    render() { 
        return (
            <Mesh geometry={this.geometry} material={this.material}>
                {this.props.children}
            </Mesh>
        )
    }
}

