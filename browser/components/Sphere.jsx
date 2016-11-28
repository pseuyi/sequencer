import React from 'react'
import {Mesh} from '../../js/react-threejs/src'
export default class Sphere extends Mesh {
    // constructor(props) {
    //     super(props)
    //     this.geometry = new THREE.BoxGeometry(1,1,1)
    //     this.material = new THREE.MeshBasicMaterial({color: 'white'})
    // }
    render() {

        var geometry = new THREE.SphereGeometry(3, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
        var material = new THREE.MeshNormalMaterial();
        var cube = new THREE.Mesh(geometry, material);

        return (
            <Mesh obj={cube}>
                {this.props.children}
            </Mesh>
        )
    }
}
