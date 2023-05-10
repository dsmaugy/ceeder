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

        // Current Flower Display UI Elements

        const currFlower = new RoundedButton(camX*.4, camX*.4, 1, 0xc072d4, "currFlower");
        currFlower.SetPosition(-camX + currFlower.width/2, -camY + currFlower.length/2, 0);
        this.add( currFlower );

        const flowerZero = new RoundedButton(currFlower.width*.9, currFlower.width*.9, 2, 0xff0000, "flowerZero");
        flowerZero.SetPosition(currFlower.position.x, currFlower.position.y, 0);
        this.add( flowerZero );
        
        // Flower Selection UI elements

        const flowerSelect = new RoundedButton(camX*.6, camY/3, 1, 0xc072d4, "flowerSelect");
        flowerSelect.SetPosition(-camX/3, -camY + flowerSelect.length/2, 0);
        this.add( flowerSelect );

        let fbuttonlen = flowerSelect.length*.8;

        const flowerOne = new RoundedButton(fbuttonlen, fbuttonlen, 1, 0xff0000, "flowerOne");
        flowerOne.SetPosition(flowerSelect.position.x - (flowerSelect.width*.3), -camY + flowerSelect.length/2, 1);
        this.add( flowerOne );

        const flowerTwo = new RoundedButton(fbuttonlen, fbuttonlen, 1, 0x00ff00, "flowerTwo");
        flowerTwo.SetPosition(flowerSelect.position.x - flowerSelect.width*0, -camY + flowerSelect.length/2, 1);
        this.add( flowerTwo );

        const flowerThree = new RoundedButton(fbuttonlen, fbuttonlen, 1, 0x0000ff, "flowerThree");
        flowerThree.SetPosition(flowerSelect.position.x + flowerSelect.width*.3, -camY + flowerSelect.length/2, 1);
        this.add( flowerThree );

        // const flowerFour = new RoundedButton(fbuttonlen, fbuttonlen, 1, 0x00ffff, "flowerFour");
        // flowerFour.SetPosition(flowerSelect.position.x + (flowerSelect.width*.35), -camY + flowerSelect.length/2, 1);
        // this.add( flowerFour );

        // Planet selection UI Elements

        const planetSelect = new RoundedButton(camX*.2, camY, 1, 0xc072d4, "planetSelect");
        planetSelect.SetPosition(camX - planetSelect.width/2, -camY/2, 0);
        this.add( planetSelect );

        let pbuttonlen = planetSelect.width*.75;

        const planetOne = new RoundedButton(pbuttonlen, pbuttonlen, 1, 0xff0000, "planetOne");
        planetOne.SetPosition(camX - planetSelect.width/2, -camY/2 + planetSelect.length* 3/10, 1);
        this.add( planetOne );

        const planetTwo = new RoundedButton(pbuttonlen, pbuttonlen, 1, 0x00ff00, "planetTwo");
        planetTwo.SetPosition(camX - planetSelect.width/2, -camY/2, 1);
        this.add( planetTwo );

        const planetThree = new RoundedButton(pbuttonlen, pbuttonlen, 1, 0x0000ff, "planetThree");
        planetThree.SetPosition(camX - planetSelect.width/2, -camY/2 - planetSelect.length* 3/10, 1);
        this.add( planetThree );
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

}

export default UIScene;
