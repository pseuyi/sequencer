import React from 'react'
import THREE from 'three'
import {Object3D, Mesh} from '../../js/react-threejs/src'

export default class Shadows extends React.Component {
    
  render() { 
    var component;
      if (this.props.object === 'cube') {
        component = <Mesh
        geometry={new THREE.CubeGeometry( 10, 10, 10 )} 
        material={new THREE.MeshPhongMaterial({ color: '#8FA3BD', shininess: 100, specular: '#ff69b4', transparent: true, opacity: 0.5 })}
        position={{ x: this.props.position.x, y: this.props.position.y, z: this.props.position.z}} />
      } else if (this.props.object === 'cylinder') {
        component = <Mesh
        geometry={new THREE.CylinderGeometry( 5, 5, 20, 32 )}
        material={new THREE.MeshPhongMaterial({specular: '#FFFF00',shininess: 100, transparent: true, opacity: 0.5})} 
        position={{ x: this.props.position.x, y: this.props.position.y, z: this.props.position.z}} />
      } else if (this.props.object === 'torus-large') {
        component = <Mesh
        geometry={new THREE.TorusGeometry( 20, 8, 36, 100 )}
        material={new THREE.MeshPhongMaterial( { color: 0xdddddd, specular: 0x009900, shininess: 100, shading: THREE.FlatShading, transparent: true , opacity: 0.5  } )} 
        position={{ x: this.props.position.x, y: this.props.position.y, z: this.props.position.z}} />
      } else if (this.props.object === 'dodecahedron') {
        component = <Mesh 
        geometry={new THREE.DodecahedronBufferGeometry(10)} 
        material={new THREE.MeshPhongMaterial({shininess: 100, color: '#212C3F', transparent: true , opacity: 0.5})} 
        position={{ x: this.props.position.x, y: this.props.position.y, z: this.props.position.z}} />
      } else if (this.props.object === 'torus-small') {
        component = <Mesh 
        geometry={new THREE.TorusGeometry( 16, 4, 36, 100 )} 
        material={new THREE.MeshPhongMaterial({ color: 0xffff00, specular: 0x00ff59, shininess: 100, transparent: true, opacity: 0.5})} 
        position={{ x: this.props.position.x, y: this.props.position.y, z: this.props.position.z}} />
      } else if (this.props.object === 'sphere') {
        component = <Mesh 
        geometry={new THREE.SphereGeometry(10, 100, 100, 10, Math.PI * 2, 0, Math.PI * 2)}
        material={new THREE.MeshNormalMaterial({transparent: true, opacity: 0.5})} 
        position={{ x: this.props.position.x, y: this.props.position.y, z: this.props.position.z}} />
      } else if (this.props.object === 'tube') {
        var CustomSinCurve = THREE.Curve.create(
            function ( scale ) { //custom curve constructor
                this.scale = ( scale === undefined ) ? 1 : scale;
            },
            function ( t ) { //getPoint: t is between 0-1
                var tx = t * 10 - 1.5;
                var ty = Math.sin( 1.8 * Math.PI * t );
                var tz = 0;
                return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );
            }
        );
        var path = new CustomSinCurve( 10 );
        component = <Mesh 
        geometry={new THREE.TubeGeometry( path, 20, 2, 8, false )}
        material={new THREE.MeshPhongMaterial( { color: '#7A818B', specular: '#FFFF00', shininess: 30, shading: THREE.FlatShading, transparent: true, opacity: 0.5} )} 
        position={{ x: this.props.position.x, y: this.props.position.y, z: this.props.position.z}} />
    } else if (this.props.object === 'torus-knot') {
        component = <Mesh 
        geometry={new THREE.TorusKnotGeometry( 10, 5, 30, 10 )}
        material={new THREE.MeshPhongMaterial({ color: '#5F7D99', shininess: 20, specular: '#15B9BB', transparent: true, opacity: 0.5})} 
        position={{ x: this.props.position.x, y: this.props.position.y, z: this.props.position.z}} />
    } else if (this.props.object === 'icosahedron') {
        component = <Mesh 
        geometry={new THREE.IcosahedronGeometry( 5 )}
        material={new THREE.MeshPhongMaterial({ color: '#07B8FD', shininess: 20, specular: '#C0C0C0', transparent: true, opacity: 0.5})} 
        position={{ x: this.props.position.x, y: this.props.position.y, z: this.props.position.z}} />
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