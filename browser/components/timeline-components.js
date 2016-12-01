import Cube from './Cube';
import TorusSmall from './TorusSmall';
import TorusLarge from './TorusLarge';
import Cylinder from './Cylinder';
import Dodecahedron from './Dodecahedron';
import Sphere from './Sphere'
import Tube from './Tube'
import TorusKnot from './TorusKnot'
import Icosahedron from './Icosahedron'


const TimelineComponent = ({geometry, material}) => ({isShadow=false, children}) =>
    <Mesh
        geometry={geometry}
        material={material}
        onMouseDown={this.props.onMouseDown}
        onDragStart={this.props.onDragStart}>
        {children}
    </Mesh>


const MAP = {
    cube: Cube,
    'torus-small': TorusSmall,
    'torus-large': TorusLarge,
    sphere: Sphere,
    tube: Tube,
    'torus-knot': TorusKnot,
    icosahedron: TimelineComponent({
        geometry: new THREE.IcosahedronGeometry(5),
        material: new THREE.MeshPhongMaterial({ color: '#07B8FD', shininess: 20, specular: '#C0C0C0' })
    }),
    dodecahedron: Dodecahedron,
    cylinder: Cylinder,
}



export default function componentFor(string) {
    return MAP[string]
}