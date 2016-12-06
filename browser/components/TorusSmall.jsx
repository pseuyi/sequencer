import React from 'react'
import {Object3D, Mesh} from '../../js/react-threejs/src'

export default class TorusSmall extends Object3D {
    // constructor(props) {
    //     super(props)
    //     this.geometry = new THREE.BoxGeometry(1,1,1)
    //     this.material = new THREE.MeshBasicMaterial({color: 'white'})
    // }
    
    geometry = new THREE.TorusGeometry( 16, 4, 36, 100 );
    material = new THREE.MeshPhongMaterial({ color: 0xffff00, specular: 0x00ff59, shininess: 100});

    render() { 
        return (
            <Mesh geometry={this.geometry} material={this.material} onMouseDown={this.props.onMouseDown} onDragStart={this.props.onDragStart}>
                {this.props.children}
            </Mesh>
        )
    }
}