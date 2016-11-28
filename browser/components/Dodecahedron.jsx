import React from 'react'
import THREE from 'three'
console.log('THREE=', THREE)
import {Object3D, Mesh} from '../../js/react-threejs/src'

export default class Dodecahedron extends Object3D {
    // constructor(props) {
    //     super(props)
    //     this.geometry = new THREE.BoxGeometry(1,1,1)
    //     this.material = new THREE.MeshBasicMaterial({color: 'white'})
    // }
    
    geometry = new THREE.DodecahedronBufferGeometry(10);
    material = new THREE.MeshPhongMaterial({shininess: 100, color: '#212C3F'});

    render() { 
        return (
            <Mesh geometry={this.geometry} material={this.material} onMouseDown={this.props.onMouseDown}>
                {this.props.children}
            </Mesh>
        )
    }
}
