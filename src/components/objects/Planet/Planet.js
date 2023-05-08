import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Planet1.gltf';

class Planet extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();
        this.name = 'planet';
        this.model = null;

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
            this.model = gltf.scene.children[0]; // TODO: this is specific to the imported GLTF
            console.log(this.model)

            // TODO: probably want to make the planet a big bigger
            // this.model.scale.multiplyScalar(2)
        });

    }
}

export default Planet;
