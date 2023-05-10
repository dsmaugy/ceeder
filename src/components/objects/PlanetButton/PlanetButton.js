import { BoxGeometry, CircleGeometry, ClampToEdgeWrapping, DirectionalLight, Group, Mesh, MeshBasicMaterial, MeshPhongMaterial, RepeatWrapping, SphereGeometry, TextureLoader, Vector3 } from 'three';
import { Planet } from '../Planet';

class PlanetButton extends Group {
    constructor( planetName, name) {
        // Call parent Group() constructor
        super();

        const miniPlanet = new Planet(planetName, 0.25, planetName);
        miniPlanet.name = name;
        this.add(miniPlanet);
        const planetLight = new DirectionalLight("white", 0.65);
        
        planetLight.translateX(0.5);
        this.add(planetLight);
    }

    SetPosition(x, y, z) {
        this.position.set(x, y, z);
    }


}

export default PlanetButton;
