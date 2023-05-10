import { BoxGeometry, CircleGeometry, ClampToEdgeWrapping, DirectionalLight, Group, Mesh, MeshBasicMaterial, MeshPhongMaterial, RepeatWrapping, SphereGeometry, TextureLoader, Vector3 } from 'three';
import { Planet } from '../Planet';

class PlanetButton extends Group {
    constructor( planetName, name) {
        // Call parent Group() constructor
        super();

        const miniPlanet = new Planet(planetName, 0.25, planetName);
        miniPlanet.name = name;
        this.add(miniPlanet);
        this.add(new DirectionalLight("white"))
    }

    SetPosition(x, y, z) {
        this.position.set(x, y, z);
    }


}

export default PlanetButton;
