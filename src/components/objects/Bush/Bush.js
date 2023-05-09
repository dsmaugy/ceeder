import * as THREE from 'three';

class Branch extends THREE.Mesh {
    constructor(parent) {
        super();
        this.name = 'branch';
        this.len = 8;

        const { r1, r2 } = parent;

        this.geometry = new THREE.CylinderGeometry(r1, r2, 8, 8);
        this.mat = new THREE.MeshPhongMaterial({
            color: new THREE.Color('rgb(226,35,213)'),
            emissive: new THREE.Color('rgb(255,128,64)'),
            specular: new THREE.Color('rgb(255,155,255)'),
            shininess: 10,
            shading: THREE.FlatShading,
            transparent: 1,
            opacity: 1,
        });
    }
}

class Leaves extends THREE.Mesh {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.name = 'leaves';
        this.geometry = new THREE.IcosahedronGeometry(0.1, 1);
        this.mat = new THREE.MeshPhongMaterial({
            color: new THREE.Color('rgb(226,35,213)'),
            emissive: new THREE.Color('rgb(255,128,64)'),
            specular: new THREE.Color('rgb(255,155,255)'),
            shininess: 10,
            shading: THREE.FlatShading,
            transparent: 1,
            opacity: 1,
        });
    }
}

class Bush extends THREE.Group {
    constructor(parent) {
        super();
        this.state = {};
        this.name = 'bush';

        const bush = new THREE.Group();
        const seed = new Leaves();
        bush.add(seed);
        this.add(bush);
    }

    init() {
        const segment = new Branch(4, 2);
        const dir = this.quaternion.multiplyScalar(segment.length);
    }

    grow() {}
}

export default Bush;
