import { DepthFormat, Group, Vector3 } from "three";
import { getRandomNumber } from "../../util";
import Asteroid from "../objects/Asteroid/Asteroid";

const SPAWN_RATE = 0.1;
const DESPAWN_BOUNDARY = 200;

class AsteroidManager extends Group {
    constructor(minRadius, maxRadius) {
        super();

        this.minR = minRadius;
        this.maxR = maxRadius;
        this.asteroids = []

        this.spawnAsteroidAt(0, 10, 10);
        this.spawnAsteroidAt(-10, 5, 0);
        this.spawnAsteroidAt(5, -10, -10);

        this.lastSpawnCheck = 0;
    }

    spawnAsteroidAt(x, y, z) {
        let r = Math.floor(getRandomNumber(1, 4));
        const asteroid = new Asteroid("Asteroid" + r, getRandomNumber(0.05, 0.08), getRandomNumber(0.01, 0.05), getRandomNumber(0.05, 0.1));

        asteroid.position.setX(x);
        asteroid.position.setY(y);
        asteroid.position.setZ(z);

        this.add(asteroid);
        this.asteroids.push(asteroid);
    }


    spawnRandomAsteroid() {



        let u = getRandomNumber(0, 1);
        let v = getRandomNumber(0, 1);
        console.log(u);
        console.log(v);
        let theta = 2*Math.PI*u;
        let phi = Math.acos(2*v-1);
        let p = getRandomNumber(this.minR, this.maxR);

        let posX = p*Math.sin(phi)*Math.cos(theta);
        let posY = p*Math.sin(phi)*Math.cos(theta);
        let posZ = p*Math.cos(phi);

        console.log(posX);
        console.log(posY);
        console.log(posZ);

        this.spawnAsteroidAt(posX, posY, posZ);

    }

    update(timestamp) {
        // periodically spawn more asteroids
        let sec = Math.round(timestamp / 1000);
        if (sec % 5 === 0 && this.lastSpawnCheck != sec) {
            if (Math.random() < SPAWN_RATE) {
                this.spawnRandomAsteroid();
            }

            // this.lastSpawnCheck = sec;
        }



        // animate already spawned asteroids
        let removals = []
        this.asteroids.forEach((asteroid, i) => {
            // WARN: do NOT make this a quaternion... worst mistake of my life!!!!
            asteroid.rotation.x += asteroid.rotX;
            asteroid.rotation.y += asteroid.rotY;

            if (asteroid.position.x > 0) {
                asteroid.position.x += asteroid.trans;
            } else {
                asteroid.position.x -= asteroid.trans;
            }

            if (Math.abs(asteroid.position.x) > DESPAWN_BOUNDARY) {
                removals.push(i);
            }
        });

        removals.forEach((idx) => {
            // console.log("deleting " + idx);
            this.remove(this.asteroids[idx]);
            this.asteroids.splice(idx, 1);

            // console.log(this.asteroids);
        })

    
    }
}

export default AsteroidManager;