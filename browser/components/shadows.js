import React from 'react'
import THREE from 'three'
import {Object3D, Mesh} from '../../js/react-threejs/src'

export default class Shadows extends Object3D {
    
  geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
  material = new THREE.MeshPhongMaterial({specular: '#FFFF00',shininess: 100});

  render() { 
    var component;
      if (this.props.object === 'cube') {
        component = <Mesh
        geometry={new THREE.CubeGeometry( 10, 10, 10 )} 
        material={new THREE.MeshPhongMaterial({ color: '#8FA3BD', shininess: 100, specular: '#ff69b4' })}
        position={{ x: event.position.x, y: event.position.y, z: event.position.z}} />
      } else if (this.props.object === 'cylinder') {
        component = <Mesh
        geometry={new THREE.CylinderGeometry( 5, 5, 20, 32 )}
        material={new THREE.MeshPhongMaterial({specular: '#FFFF00',shininess: 100})} 
        position={{ x: event.position.x , y: event.position.y, z: event.position.z}} />
      } else if (this.props.object === 'torus-large') {
        component = <Mesh
        geometry={new THREE.TorusGeometry( 20, 8, 36, 100 )}
        material={new THREE.MeshPhongMaterial( { color: 0xdddddd, specular: 0x009900, shininess: 100, shading: THREE.FlatShading } )} 
        position={{ x: event.position.x, y: event.position.y, z: event.position.z}} />
      } else if (this.props.object === 'dodecahedron') {
        component = <Mesh 
        geometry={event.id} 
        material={this.material(event)} 
        position={{ x: event.position.x, y: event.position.y, z: event.position.z}} />
      } else if (this.props.object === 'torus-small') {
        component = <Mesh 
        geometry={event.id} color={0xffff00} 
        material={this.material(event)} 
        position={{ x: event.position.x, y: event.position.y, z: event.position.z}} />
      } else if (this.props.object === 'sphere') {
        component = <Sphere 
        geometry={event.id}
        material={this.material(event)} 
        position={{ x: event.position.x, y: event.position.y, z: event.position.z}}/>
      } else if (this.props.object === 'tube') {
        component = <Tube 
        geometry={event.id}
        material={this.material(event)} 
        position={{ x: event.position.x, y: event.position.y, z: event.position.z}}/>
    } else if (this.props.object === 'torus-knot') {
        component = <TorusKnot 
        geometry={event.id}
        material={this.material(event)} 
        position={{ x: event.position.x, y: event.position.y, z: event.position.z}}/>
    } else if (this.props.object === 'icosahedron') {
        component = <Icosahedron 
        geometry={event.id}
        material={this.material(event)} 
        position={{ x: event.position.x, y: event.position.y, z: event.position.z}}/>
    } else {
        null;
    }

    return (
        <div>
                {component}
        </div>
    )
  }
}