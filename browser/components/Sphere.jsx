import React from 'react'
import {Object3D, Mesh} from '../../js/react-threejs/src'
export default class Sphere extends Object3D {
    // constructor(props) {
    //     super(props)
    //     this.geometry = new THREE.BoxGeometry(1,1,1)
    //     this.material = new THREE.MeshBasicMaterial({color: 'white'})
    // }
    render() {

        var geometry = new THREE.SphereGeometry(6, 100, 100, 0, Math.PI * 2, 0, Math.PI * 2);
        var material = new THREE.MeshNormalMaterial();
        var cube = new THREE.Mesh(geometry, material);

        return (

            <Mesh obj={cube} onMouseDown={this.props.onMouseDown}>

                {this.props.children}
            </Mesh>
        )
    }
}
