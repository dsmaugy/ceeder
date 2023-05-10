import { BoxGeometry, CircleGeometry, ClampToEdgeWrapping, Group, Mesh, MeshBasicMaterial, MeshPhongMaterial, RepeatWrapping, SphereGeometry, TextureLoader, Vector3 } from 'three';

class CircleButton extends Group {
    constructor( radius, triangleSize, texture, name) {
        // Call parent Group() constructor
        super();

        // this.name = name;
        
        const testTexture = new TextureLoader().load(texture);
        const material = new MeshBasicMaterial({map: testTexture});
        const pictureBox = new CircleGeometry(radius, triangleSize);
        const button = new Mesh(pictureBox, material);

        // const material = new MeshBasicMaterial({ map: testTexture });
        this.add(button);
        button.name = name;
    }

    SetPosition(x, y, z) {
        this.position.set(x, y, z);
    }

    // addPictureBox(texture) {
    //     const testTexture = new TextureLoader().load(texture);
    //     const material = new MeshBasicMaterial({map: testTexture});
    //     const pictureBox = new CircleGeometry(1.1, 32);
    //     const guideButton = new Mesh(pictureBox, material);
    //     guideButton.position.setZ(5);
    //     this.add(guideButton);
    // }

}

export default CircleButton;
