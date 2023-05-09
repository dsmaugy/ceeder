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
        
        const currFlower = new RoundedButton(camX*.5, camY, 1, 0xc072d4, "currFlower");
        currFlower.SetPosition(-camX + currFlower.width/2, -camY + currFlower.length/2, 0);
        this.add( currFlower );

        const flowerSelect = new RoundedButton(camX, camY/3, 1, 0xc072d4, "flowerSelect");
        flowerSelect.SetPosition(-1, -camY + flowerSelect.length/2, 0);
        this.add( flowerSelect );

        // const flowerOne = new RoundedButton(camX/5, camY/4, 1, 0xff0000, "flowerOne");
        const flowerOne = new RoundedButton(flowerSelect.length*.75, flowerSelect.length*.75, 1, 0xff0000, "flowerOne");
        flowerOne.SetPosition(-1 - flowerSelect.width/4, -camY + flowerSelect.length/2, 1);
        this.add( flowerOne );

        // const flowerTwo = new RoundedButton(camX/5, camY/4, 1, 0x00ff00, "flowerTwo");
        const flowerTwo = new RoundedButton(flowerSelect.length*.75, flowerSelect.length*.75, 1, 0x00ff00, "flowerTwo");
        flowerTwo.SetPosition(-1 , -camY + flowerSelect.length/2, 1);
        this.add( flowerTwo );
        
        // const flowerThree = new RoundedButton(camX/5, camY/4, 1, 0x0000ff, "flowerThree");
        const flowerThree = new RoundedButton(flowerSelect.length*.75, flowerSelect.length*.75, 1, 0x0000ff, "flowerThree");
        flowerThree.SetPosition(-1 + flowerSelect.width/4, -camY + flowerSelect.length/2, 1);
        this.add( flowerThree );

        const planetSelect = new RoundedButton(camX*.3, camY, 1, 0xc072d4, "planetSelect");
        planetSelect.SetPosition(camX - planetSelect.width/2, -camY/2, 0);
        this.add( planetSelect );
        
        // const planetOne = new RoundedButton(camX*.2, camY*.25, 1, 0xff0000, "planetOne");
        const planetOne = new RoundedButton(camY*.25, camY*.25, 1, 0xff0000, "planetOne");
        planetOne.SetPosition(camX - planetSelect.width/2, -camY/2 + planetSelect.length* 3/10, 1);
        this.add( planetOne );
        
        // const planetTwo = new RoundedButton(camX*.2, camY*.25, 1, 0x00ff00, "planetTwo");
        const planetTwo = new RoundedButton(camY*.25, camY*.25, 1, 0x00ff00, "planetTwo");
        planetTwo.SetPosition(camX - planetSelect.width/2, -camY/2, 1);
        this.add( planetTwo );
        
        // const planetThree = new RoundedButton(camX*.2, camY*.25, 1, 0x0000ff, "planetThree");
        const planetThree = new RoundedButton(camY*.25, camY*.25, 1, 0x0000ff, "planetThree");
        planetThree.SetPosition(camX - planetSelect.width/2, -camY/2 - planetSelect.length* 3/10, 1);
        this.add( planetThree );

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
