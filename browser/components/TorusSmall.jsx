import React from 'react'
import {Object3D, Mesh} from '../../js/react-threejs/src'

export default class TorusSmall extends Object3D {
    // constructor(props) {
    //     super(props)
    //     this.geometry = new THREE.BoxGeometry(1,1,1)
    //     this.material = new THREE.MeshBasicMaterial({color: 'white'})
    // }
    
    geometry = new THREE.TorusGeometry( 3.5, 1, 16, 100 );
    material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true});

    render() { 
        return (
            <Mesh geometry={this.geometry} material={this.material} onMouseDown={this.props.onMouseDown}>
                {this.props.children}
            </Mesh>
        )
    }
}