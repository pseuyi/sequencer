import React from 'react'
import THREE from 'three'
console.log('THREE=', THREE)
import {Mesh} from 'react-threejs'

export default class Cube extends Mesh {

    render() {
        const geometry = new THREE.BoxGeometry(1,1,1)
        const material = new THREE.MeshBasicMaterial({color: 'white'})
        return (
            <Mesh geometry={geometry} material={material}>
                {this.props.children}
            </Mesh>
        )
    }
}

