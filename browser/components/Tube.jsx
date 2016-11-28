import React from 'react'
import {Object3D, Mesh} from '../../js/react-threejs/src'

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

export default class Tube extends Object3D {
    geometry = new THREE.TubeGeometry( path, 20, 2, 8, false );
    material = new THREE.MeshPhongMaterial( { color: '#7A818B', specular: '#FFFF00', shininess: 30, shading: THREE.FlatShading } );

    render() { 
        return (
            <Mesh geometry={this.geometry} material={this.material}>
                {this.props.children}
            </Mesh>
        )
    }
}