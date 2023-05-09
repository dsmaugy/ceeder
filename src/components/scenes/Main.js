import * as Dat from 'dat.gui';
import { Scene, Color, ArrowHelper, Vector3, AxesHelper, TextureLoader, RepeatWrapping, ClampToEdgeWrapping, MirroredRepeatWrapping, CubeTextureLoader, Fog, MeshBasicMaterial, FogExp2 } from 'three';
import { Flower, Land } from 'objects';
import { BasicLights } from 'lights';
import { SphereGeometry, MeshToonMaterial, Mesh, Euler } from 'three';
import Planet from '../objects/Planet/Planet';
import Asteroid from '../objects/Asteroid/Asteroid';
import AsteroidManager from './AsteroidManager';

const SPHERE_RADIUS = 200;
const UP_VECTOR = new Vector3(0, 1, 0);

class MainScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // set the space-sphere bounding box
        this.fog = new Fog(0xcccccc, 0, 350); // fog makes the background look cooler + asteroids fade away instead of disappearing

        const spaceTexture = new TextureLoader().load("src/components/textures/nebula.png");
        const backgroundSphere = new SphereGeometry(SPHERE_RADIUS, 40, 20);
        const backgroundMat = new MeshBasicMaterial({map: spaceTexture});
        const backgroundMesh = new Mesh(backgroundSphere, backgroundMat);
        backgroundSphere.scale(-1, 1, 1);
        this.add(backgroundMesh);

        this.planet = new Planet("Planet1");

        // X is red, Y is green, Z is blue
        this.planet.add(new AxesHelper(5));

        const lights = new BasicLights();

        // ASTEROID TESTING
        // this.asteroid = new Asteroid("Asteroid1");
        // this.add(this.asteroid);
        this.asteroids = new AsteroidManager(30, 100);

        this.add(lights, this.planet, this.asteroids);
    }

    plantFlower(pos, face) {
        const flower = new Flower(this.planet);
        flower.position.copy(pos);
        // inspired from https://stackoverflow.com/questions/9038465/three-js-object3d-cylinder-rotation-to-align-to-a-vector
        flower.quaternion.setFromUnitVectors(UP_VECTOR, face.normal);
        this.planet.add(flower);
    }

    getPlanet() {
        return this.planet;
    }

    update(timestamp) {
        // updates 60 times a second
        this.asteroids.update(timestamp)
    }

}

export default MainScene;
