import * as Dat from 'dat.gui';
import { Scene, Color, ArrowHelper, Vector3, AxesHelper, TextureLoader, RepeatWrapping, ClampToEdgeWrapping, MirroredRepeatWrapping, CubeTextureLoader, Fog, MeshBasicMaterial } from 'three';
import { Flower, Land } from 'objects';
import { BasicLights } from 'lights';
import { SphereGeometry, MeshToonMaterial, Mesh, Euler } from 'three';

const SPHERE_RADIUS = 3

function getFaceCentroid(geometry, face) {
    return geometry.vertices[face.a].clone()
            .add(geometry.vertices[face.b])
            .add(geometry.vertices[face.c])
            .divideScalar(3);
}

const origin = new Vector3( 0, 0, 0 );
const length = 1;
const hex = 0xffff00;
const UP_VECTOR = new Vector3(0, 1, 0);

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
        };

        const spaceTexture = new TextureLoader().load("src/components/textures/nebula.png");

        const backgroundSphere = new SphereGeometry(200, 40, 20);
        backgroundSphere.scale(-1, 1, 1);
        const backgroundMat = new MeshBasicMaterial({map: spaceTexture});
        const backgroundMesh = new Mesh(backgroundSphere, backgroundMat);
        this.add(backgroundMesh);

        // Add meshes to scene
        // const land = new Land();
        // const flower = new Flower(this);

        const geometry = new SphereGeometry(SPHERE_RADIUS);
        const material = new MeshToonMaterial( { color: 0x00ff00} );
        material.wireframe = false;
        this.sphere = new Mesh(geometry, material);

        console.log(this.sphere);
        const faceOne = this.sphere.geometry.faces[30];
        const faceTwo = this.sphere.geometry.faces[20];

        const faceOneCentroid = getFaceCentroid(this.sphere.geometry, faceOne);
        const faceTwoCentroid = getFaceCentroid(this.sphere.geometry, faceTwo);

        const flowerTest = new Flower(this.sphere);
        const flowerTwo = flowerTest.clone();

        flowerTest.position.copy(faceOneCentroid);

        // taken from https://stackoverflow.com/questions/9038465/three-js-object3d-cylinder-rotation-to-align-to-a-vector
        flowerTest.quaternion.setFromUnitVectors(UP_VECTOR, faceOne.normal);
        console.log(faceOne);

        flowerTwo.position.copy(faceTwoCentroid);
        flowerTwo.quaternion.setFromUnitVectors(UP_VECTOR, faceTwo.normal);

        // X is red, Y is green, Z is blue
        this.sphere.add(flowerTest, flowerTwo, new ArrowHelper( faceOne.normal, origin, length, hex ), new ArrowHelper( faceTwo.normal, origin, length, hex ), new AxesHelper(5))

        const lights = new BasicLights();
        this.add(lights, this.sphere);

        // Populate GUI
        this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    }

    plantFlower(pos, face) {
        const flower = new Flower(this.sphere);
        flower.position.copy(pos);
        flower.quaternion.setFromUnitVectors(UP_VECTOR, face.normal);
        this.sphere.add(flower);
    }

    getSphere() {
        return this.sphere;
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        // this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // Call update for each object in the updateList
        // for (const obj of updateList) {
        //     obj.update(timeStamp);
        // }
    }
}

export default SeedScene;
