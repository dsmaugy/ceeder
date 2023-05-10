import * as THREE from 'three';

class Branch extends THREE.Mesh {
    constructor(props) {
        super();
        this.name = 'branch';
        this.currComplexity = 0;

        const { r1, r2 } = props;
        this.length = 0.7;

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

        this.scale.multiplyScalar((size * complexity) / 2);
        this.scale.y = Math.random() * 0.5 + 0.2;
        this.rotation.z = (Math.random() - 1) / 2;
        this.rotation.x = (Math.random() - 1) / 5;

        this.name = 'leaves';
        this.geometry = new THREE.IcosahedronGeometry(size, 0);
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
        this.maxComplexity = 4;
        this.name = 'bush';
        this.segments = [];

        const bush = new THREE.Group();
        const seed = new Leaves();
        bush.add(seed);
        this.add(bush);
    }

    init() {
        // add new segment leaf group to current tree
        const group = new THREE.Group();
        const segment = new Branch({ r1: 2 / 40, r2: 4 / 40 });

        segment.currComplexity = this.maxComplexity;
        this.segments.push(segment);

        group.position.copy(this.position);
        group.add(segment);
        this.add(group);

        const dir = this.up;
        segment.dir = dir;
        segment.rz = 0;
        segment.ry = 0;
        segment.position.y += segment.length / 2;

        dir.multiplyScalar(segment.length);

        const leaves = new Leaves({
            size: 0.5,
            complexity: segment.currComplexity,
        });
        leaves.position.copy(segment.position);
        leaves.position.y += segment.length / 2;
        group.add(leaves);
    }

    animatedGrow() {
        this.currComplexity--;
        if (this.currComplexity == 0) {
            return;
        }

        const newSegments = [];
        this.segments.forEach((parentSegment) => {
            // get parameters for each parent
            const position = new THREE.Vector3().addVectors(
                parentSegment.dir,
                parentSegment.position
            );

            const numChildrenBranches = Math.floor(
                Math.random() * parentSegment.currComplexity * 2
            );

            // if parent has no child branches
            for (let i = 0; i < numChildrenBranches; i++) {
                const newComplexity = parentSegment.currComplexity - 1;

                // get the parent rotation
                const rz = (Math.random() * Math.PI) / 2;
                const ry =
                    parentSegment.ry +
                    ((Math.PI * 2) / numChildrenBranches) * i +
                    (Math.random() * Math.PI) / 6 -
                    Math.PI / 3;

                const group = new THREE.Group();
                this.add(group);

                // create child segment
                const segment = new Branch({
                    r1: 2 / 50 / Math.log(newComplexity),
                    r2: 4 / 50 / Math.log(newComplexity),
                });
                segment.position.y += segment.length / 2;
                group.position.copy(position);
                group.add(segment);

                // get new direction and update child segment with new direction
                const dir = this.up;
                group.rotation.z = rz;
                dir.applyAxisAngle(new THREE.Vector3(0, 0, 1), rz);
                group.rotation.y = ry;
                dir.applyAxisAngle(new THREE.Vector3(0, 1, 0), ry);
                dir.multiplyScalar(segment.length);
                segment.dir = dir;
                segment.ry = ry;
                segment.rz = rz;

                // update complexity
                segment.currComplexity = newComplexity;
                newSegments.push(segment);

                const leaves = new Leaves({
                    size: 0.5,
                    complexity: newComplexity,
                });
                leaves.position.copy(segment.position);
                leaves.position.y += segment.length / 2;
                group.add(leaves);
            }
        });

        // update segments;
        this.segments = newSegments;
    }
}

export default Bush;
