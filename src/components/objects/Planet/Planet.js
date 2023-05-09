import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

class Planet extends Group {
    constructor(objName) {
        // Call parent Group() constructor
        super();

        this.objLoader = new OBJLoader();
        this.mtlLoader = new MTLLoader();

        this.mtlLoader.setPath("src/components/SpacePack/OBJ/");
        this.objLoader.setPath("src/components/SpacePack/OBJ/");
        this.name = 'planet_group';
        this.model = null;

        this.mtlLoader.load(objName + ".mtl", (mtl) => {
            this.objLoader.setMaterials(mtl);
            this.loadPlanet(objName + ".obj");
        });

    }

    loadPlanet(name) {
        this.objLoader.load(name, (obj) => {
            this.add(obj);
            obj.name = "internal_planet_group";
            console.log(obj);
            this.model = obj.children[0];
            this.model.scale.multiplyScalar(2);
        });
    }
}

export default Planet;
