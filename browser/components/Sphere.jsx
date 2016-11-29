import React from 'react'
import {Object3D, Mesh} from '../../js/react-threejs/src'

export default class Sphere extends Object3D {


    geometry = new THREE.SphereGeometry(6, 100, 100, 0, Math.PI * 2, 0, Math.PI * 2);
    material = new THREE.MeshNormalMaterial();

    render() {
        return (
            <Mesh geometry={this.geometry} material={this.material} onMouseDown={this.props.onMouseDown}>
                {this.props.children}
            </Mesh>
        )
    }
}
