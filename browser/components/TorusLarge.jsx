import React from 'react'
import {Mesh} from '../../js/react-threejs/src'

export default class TorusLarge extends Mesh {
    // constructor(props) {
    //     super(props)
    //     this.geometry = new THREE.BoxGeometry(1,1,1)
    //     this.material = new THREE.MeshBasicMaterial({color: 'white'})
    // }
    
    geometry = new THREE.TorusGeometry( 20, 8, 36, 100 );
    material = new THREE.MeshPhongMaterial( { color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } );

    render() { 
        return (
            <Mesh geometry={this.geometry} material={this.material}>
                {this.props.children}
            </Mesh>
        )
    }
}

// { color: #4b614a, emissive: #1b341a, specular: #2616b3, shininess: 100, wireframe: false, }