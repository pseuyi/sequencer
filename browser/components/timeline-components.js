import React from 'react'


import Cube from './Cube';
import Cylinder from './Cylinder';
import Dodecahedron from './Dodecahedron';
import Icosahedron from './Icosahedron'
import TorusSmall from './TorusSmall';
import TorusLarge from './TorusLarge';
import Sphere from './Sphere'
import TorusKnot from './TorusKnot'
import Tube from './Tube'

import {Mesh} from '../../js/react-threejs/src'
// import {onMouseDown, onDragStart} from './RenderObjects'

const shinyRed = new THREE.MeshPhongMaterial({
    color: 'red', shininess: 20, specular: '#C0C0C0'
})

// materialForEffect(effect: String) -> Material
const materialForEffect = effect => shinyRed

const TimelineComponent = ({geometry: originalGeom, material: originalMaterial}) =>
    ({
       effect=null,
       isShadow=false,
       geometry=originalGeom,
       material=originalMaterial,
       onMouseDown, onDragStart,
       position, rotation,
       children, }) =>
    <Mesh
        geometry={geometry}
        material={effect ? materialForEffect(effect) : material}
        onMouseDown={onMouseDown}
        onDragStart={onDragStart}
        position={position}>
        {children}
    </Mesh>


// const MAP = {
//     icosahedron: TimelineComponent({
//         geometry: new THREE.IcosahedronGeometry(5),
//         material: new THREE.MeshPhongMaterial({ color: '#07B8FD', shininess: 20, specular: '#C0C0C0' })
//     })
// }

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

const MAP = {
    cube: TimelineComponent({
        geometry: new THREE.CubeGeometry( 10, 10, 10 ),
        material: new THREE.MeshPhongMaterial({ color: '#8FA3BD', shininess: 100, specular: '#ff69b4' })
    }),
    'torus-small': TimelineComponent({
        geometry: new THREE.TorusGeometry( 3.5, 1, 16, 100),
        material: new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true})
    }),
    'torus-large': TimelineComponent({
        geometry: new THREE.TorusGeometry( 20, 8, 36, 100),
        material: new THREE.MeshPhongMaterial( { color: 0xdddddd, specular: 0x009900, shininess: 100, shading: THREE.FlatShading}),
    sphere: TimelineComponent({
        geometry: new THREE.SphereGeometry(10, 100, 100, 10, Math.PI * 2, 0, Math.PI * 2),
        material: new THREE.MeshNormalMaterial({})
        })
    }),
    tube: TimelineComponent({
        geometry: new THREE.TubeGeometry( new CustomSinCurve( 10 ), 20, 2, 8, false),
        material: new THREE.MeshPhongMaterial( { color: '#7A818B', specular: '#FFFF00', shininess: 30, shading: THREE.FlatShading})
    }),
    'torus-knot': TimelineComponent({
        geometry: new THREE.TorusKnotGeometry( 10, 5, 30, 10 ),
        material: new THREE.MeshPhongMaterial({ color: '#5F7D99', shininess: 20, specular: '#15B9BB' })
    }),
    icosahedron: TimelineComponent({
        geometry: new THREE.IcosahedronGeometry(5),
        material: new THREE.MeshPhongMaterial({ color: '#07B8FD', shininess: 20, specular: '#C0C0C0' })
    }),
    dodecahedron: TimelineComponent({
        geometry: new THREE.DodecahedronBufferGeometry(10),
        material: new THREE.MeshPhongMaterial({shininess: 100, color: '#212C3F'})
    }),
    cylinder: TimelineComponent({
        geometry: new THREE.CylinderGeometry( 5, 5, 20, 32 ),
        material: new THREE.MeshPhongMaterial({specular: '#FFFF00',shininess: 100}),
    })
}


export default function componentFor(string) {
    return MAP[string]
}