import React from 'react'
import THREE from 'three'
console.log('THREE=', THREE)
import {Mesh} from 'react-threejs'

export default class Cube extends Mesh {
    constructor(props) {
        super(props)
        this.geometry = new THREE.BoxGeometry(1,1,1)
        this.material = new THREE.MeshBasicMaterial({color: 'white'})
    }

    render() {
        return (
            <Mesh geometry={geometry} material={material}>
                {this.props.children}
            </Mesh>
        )
    }
}

