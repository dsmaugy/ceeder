import * as Dat from 'dat.gui';
import { Scene, Color, Vector3 } from 'three';
// import * as THREE from 'three';
// import { Button } from 'ui';
import { Button, RoundedButton } from 'objects';
// import { Flower, Land } from 'objects';
// import { BasicLights } from 'lights';

class UIScene extends Scene {
    constructor(camX, camY) {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
        };
        
        // const testButton = new RoundedButton(-camX + (camX*.4 /2), -camY + (camY/2), 0, camX*.4, camY, 1, 0xc072d4);
        const currFlower = new RoundedButton(camX*.5, camY, 1, 0xc072d4, "currFlower");
        currFlower.SetPosition(-camX + currFlower.width/2, -camY + currFlower.length/2, 0);
        this.add( currFlower );

        const flowerSelect = new RoundedButton(camX, camY/2, 1, 0xc072d4, "flowerSelect");
        flowerSelect.SetPosition(-1, -camY + flowerSelect.length/2, 0);
        this.add( flowerSelect);

        const planetSelect = new RoundedButton(camX*.3, camY*.75, 1, 0xc072d4, "planetSelect");
        planetSelect.SetPosition(camX - planetSelect.width/2, -camY/2, 0);
        this.add( planetSelect );

        const flowerOne = new RoundedButton(camX/4, camY/4, 1, 0xff0000, "flowerOne");
        flowerOne.SetPosition(-1, -camY + flowerSelect.length/2, 1);
        this.add( flowerOne );

        const flowerTwo = new RoundedButton(camX/4, camY/4, 1, 0x00ff00, "flowerTwo");
        flowerTwo.SetPosition(-1 + flowerTwo.width, -camY + flowerSelect.length/2, 1);
        this.add( flowerTwo );
        
        const flowerThree = new RoundedButton(camX/4, camY/4, 1, 0x0000ff, "flowerThree");
        flowerThree.SetPosition(-1 - flowerThree.width, -camY + flowerSelect.length/2, 1);
        this.add( flowerThree );

        // const day
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(window) {

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default UIScene;
