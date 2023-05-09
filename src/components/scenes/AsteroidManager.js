import { DepthFormat, Group, Vector3 } from "three";
import { getRandomNumber } from "../../util";
import Asteroid from "../objects/Asteroid/Asteroid";

const SPAWN_RATE = 0.4;
const DESPAWN_BOUNDARY = 300;

class AsteroidManager extends Group {
    constructor(minRadius, maxRadius) {
        super();

        this.minR = minRadius;
        this.maxR = maxRadius;
        this.asteroids = []

        this.spawnAsteroidAt(0, 10, 10);
        this.spawnAsteroidAt(-10, 5, 0);
        this.spawnAsteroidAt(5, -10, -10);

    }

    spawnAsteroidAt(x, y, z) {
        let r = getRandomNumber(1, 4);
        const asteroid = new Asteroid("Asteroid" + r);

        asteroid.position.setX(x);
        asteroid.position.setY(y);
        asteroid.position.setZ(z);

        this.add(asteroid);
        this.asteroids.push(asteroid);
    }


    spawnRandomAsteroid() {


        let posX = getRandomNumber(this.minR, this.maxR);
        let posY = getRandomNumber(this.minR, this.maxR);
        let posZ = getRandomNumber(this.minR, this.maxR);

        if (Math.random() < 0.5) {
            posX *= -1;
        }

        if (Math.random() < 0.5) {
            posY *= -1;
        }

        if (Math.random() < 0.5) {
            posZ *= -1;
        }


        this.spawnAsteroidAt(posX, posY, posZ);

    }

    update(timestamp) {
        // periodically spawn more asteroids
        if (Math.trunc(timestamp) % 41 == 0) {
            if (Math.random() < SPAWN_RATE) {
                this.spawnRandomAsteroid();
            }
        }



        // animate already spawned asteroids
        let removals = []
        this.asteroids.forEach((asteroid, i) => {
            asteroid.rotation.x += getRandomNumber(0.1, 0.2);
            // asteroid.rotation.y += getRandomNumber(0.2, 1);
            // asteroid.rotation.z += getRandomNumber(0.1, 0.3);

            if (asteroid.position.x > 0) {
                asteroid.position.x += getRandomNumber(0.1, 1);
            } else {
                asteroid.position.x -= getRandomNumber(-1, 0);
            }

            if (Math.abs(asteroid.position.x) > DESPAWN_BOUNDARY) {
                removals.push(i);
            }
        });

        removals.forEach((idx) => {
            console.log("deleting " + idx);
            this.remove(this.asteroids[idx]);
            this.asteroids.splice(idx, 1);
        })

    
    }
}

export default AsteroidManager;