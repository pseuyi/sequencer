import React from 'react'
import {Mesh} from '../../js/react-threejs/src'
export default class Sphere extends Mesh {
    // constructor(props) {
    //     super(props)
    //     this.geometry = new THREE.BoxGeometry(1,1,1)
    //     this.material = new THREE.MeshBasicMaterial({color: 'white'})
    // }
    render() {
        const meshMaterial = new THREE.MeshBasicMaterial({ color: 0xFF00FF, wireframe: true });
        var sphere = new THREE.SphereGeometry( 5 )
        
        return (
            <Mesh geometry={sphere} material={meshMaterial} position={{x: 10, y: 10, z: 10}}>
                {this.props.children}
            </Mesh>
        )
    }
}
