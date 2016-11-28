

import React from 'react'
import THREE from 'three'
console.log('THREE=', THREE)
import {Mesh} from '../../js/react-threejs/src'

export default class Cylinder extends Mesh {
    
    geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
    material = new THREE.MeshPhongMaterial({specular: '#FFFF00',shininess: 100});

    render() { 
        return (
            <Mesh geometry={this.geometry} material={this.material}>
                {this.props.children}
            </Mesh>
        )
    }
}
