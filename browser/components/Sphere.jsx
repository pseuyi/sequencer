import React from 'react'
import {Object3D, Mesh} from '../../js/react-threejs/src'
export default class Sphere extends Object3D {
    // constructor(props) {
    //     super(props)
    //     this.geometry = new THREE.BoxGeometry(1,1,1)
    //     this.material = new THREE.MeshBasicMaterial({color: 'white'})
    // }
    render() {
        const meshMaterial = new THREE.MeshBasicMaterial({ color: "white", wireframe: true });
        var sphere = new THREE.SphereGeometry( 5 )
        
        return (
            <Mesh geometry={sphere} material={meshMaterial} onMouseDown={this.props.onMouseDown}>
                {this.props.children}
            </Mesh>
        )
    }
}
