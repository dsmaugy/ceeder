import * as Dat from 'dat.gui';
import * as THREE from 'three';
import {
    Scene,
    Color,
    ArrowHelper,
    Vector3,
    AxesHelper,
    TextureLoader,
    RepeatWrapping,
    ClampToEdgeWrapping,
    MirroredRepeatWrapping,
    CubeTextureLoader,
    Fog,
    MeshBasicMaterial,
    FogExp2,
    MeshDistanceMaterial,
    MeshNormalMaterial,
    MeshLambertMaterial,
} from 'three';
import { Flower, Land, Bush } from 'objects';
import { BasicLights } from 'lights';
import { SphereGeometry, MeshToonMaterial, Mesh, Euler } from 'three';
import Planet from '../objects/Planet/Planet';
import AsteroidManager from './AsteroidManager';

const UP_VECTOR = new Vector3(0, 1, 0);
const SECONDS_PER_DAY = 5;
const SPHERE_RADIUS = 200;

class MainScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // set the space-sphere bounding box
        this.fog = new Fog(0xcccccc, 0, 350); // fog makes the background look cooler + asteroids fade away instead of disappearing

        const nebulaTexture = new TextureLoader().load(
            'src/components/textures/nebula.png'
        );
        const backgroundSphere = new SphereGeometry(SPHERE_RADIUS, 40, 20);
        const backgroundMat = new MeshToonMaterial({ map: nebulaTexture }); // toon material causes the weird shading
        const dayMat = new MeshToonMaterial({ map: nebulaTexture });
        const nightMat = new MeshBasicMaterial({ map: nebulaTexture });

        const backgroundMesh = new Mesh(backgroundSphere, backgroundMat);
        backgroundSphere.scale(-1, 1, 1);
        this.add(backgroundMesh);

        // TODO: add slow auto rotation?
        this.planet = new Planet('Planet1');

        // X is red, Y is green, Z is blue
        this.planet.add(new AxesHelper(5));

        this.lights = new BasicLights(backgroundMesh, dayMat, nightMat);

        // ASTEROID TESTING
        // this.asteroid = new Asteroid("Asteroid1");
        // this.add(this.asteroid);
        this.asteroids = new AsteroidManager(30, 100);

        this.add(this.lights, this.planet, this.asteroids);
    }

    plantFlower(pos, face) {
        const flower = new Flower(this.planet);
        flower.position.copy(pos);
        // inspired from https://stackoverflow.com/questions/9038465/three-js-object3d-cylinder-rotation-to-align-to-a-vector
        flower.quaternion.setFromUnitVectors(UP_VECTOR, face.normal);
        this.planet.add(flower);
    }

    plantBush(pos, face) {
        const bush = new Bush(this.planet);
        bush.init();
        bush.position.copy(pos);
        bush.quaternion.setFromUnitVectors(UP_VECTOR, face.normal);
        this.planet.add(bush);
    }

    growBush(bush) {
        bush.animatedGrow();
    }

    getPlanet() {
        return this.planet;
    }

    update(timestamp) {
        // updates 60 times a second

        this.asteroids.update(timestamp);
        this.lights.update(timestamp);
    }
}

export default MainScene;
export { SECONDS_PER_DAY };
