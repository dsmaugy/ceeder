import * as THREE from 'three';
import { LineSegments } from 'three';

class Branch extends THREE.Mesh {
    constructor(props) {
        super();
        this.name = 'branch';
        this.length = 0.5;
        this.isLeafSegment = false;

        const { r1, r2 } = props;

        this.geometry = new THREE.CylinderGeometry(r1, r2, this.length, 8);
        this.material = new THREE.MeshPhongMaterial({
            color: new THREE.Color('rgb(71, 43, 37)'),
            emissive: new THREE.Color('rgb(148, 66, 61)'),
            specular: new THREE.Color('rgb(237, 105, 97)'),
            shininess: 10,
            transparent: 1,
            flatShading: true,
            opacity: 1,
        });
    }
}

class Leaves extends THREE.Mesh {
    constructor(props) {
        // Call parent Group() constructor
        super();

        const size = props && props.size !== undefined ? props.size : 0.1;
        const complexity =
            props && props.complexity !== undefined ? props.complexity : 1;

        this.scale.y = Math.random() * 0.5 + 0.2;
        this.rotation.z = (Math.random() - 1) / 2;
        this.rotation.x = (Math.random() - 1) / 5;

        this.name = 'leaves';
        this.geometry = new THREE.IcosahedronGeometry(size, complexity);
        this.material = new THREE.MeshPhongMaterial({
            color: new THREE.Color('rgb(226,35,213)'),
            emissive: new THREE.Color('rgb(255,128,64)'),
            specular: new THREE.Color('rgb(255,155,255)'),
            shininess: 10,
            transparent: 1,
            flatShading: true,
            opacity: 1,
        });
    }
}

class Bush extends THREE.Group {
    constructor(parent) {
        super();
        this.complexity = 1;
        this.name = 'bush';
        this.segments = new Map();

        const bush = new THREE.Group();
        const seed = new Leaves();
        bush.add(seed);
        this.add(bush);
    }

    init() {
        // add new segment leaf group to current tree
        const group = new THREE.Group();
        const segment = new Branch({ r1: 2 / 50, r2: 4 / 50 });

        segment.id = 1;
        this.segments.set(segment.id, segment);

        group.position.copy(this.position);
        group.add(segment);
        this.add(group);

        const dir = this.up;
        segment.position.y += segment.length / 2;

        dir.multiplyScalar(segment.length);

        const leaves = new Leaves({ size: 0.5, complexity: 0 });
        leaves.position.copy(segment.position);
        leaves.position.y += segment.length;
        group.add(leaves);
    }

    grow(position, rotation, complexity) {
        this.segments.forEach((parent) => {});
        const group = new THREE.Group();
        const segment = new Branch({ r1: 2 / 50, r2: 4 / 50 });
        group.position.copy(position);
        group.add(segment);
        this.add(group);

        const dir = this.up;
        segment.position.y += segment.length / 2;

        // rotate about z axis
        group.rotation.z = rotation.rz;
        dir.applyAxisAngle(new THREE.Vector3(0, 0, 1), rotation.rz);

        // rotate about y axis
        group.rotation.y = rotation.ry;
        dir.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation.ry);

        dir.multiplyScalar(segment.length);

        const numChildrenBranches = Math.floor(Math.random() * complexity);
        for (let i = 0; i < numChildrenBranches; i++) {
            this.grow(
                new THREE.Vector3(
                    dir.x + position.x,
                    dir.y + position.y,
                    dir.z + position.z
                ),
                {
                    rz: (Math.random() * Math.PI) / 2,
                    ry:
                        rotation.ry +
                        ((Math.PI * 2) / numChildrenBranches) * i +
                        (Math.random() * Math.PI) / 6 -
                        Math.PI / 3,
                },
                complexity - 1
            );
        }

        if (numChildrenBranches == 0) {
            segment.isLeafSegment = true;
            const leaves = new Leaves({ size: 0.5, complexity: 0 });
            leaves.position.copy(segment.position);
            leaves.position.y += segment.length / 2;
            group.add(leaves);
        }
    }
}

export default Bush;
