import * as Dat from 'dat.gui';
import { Scene, Color, Vector3 } from 'three';
// import * as THREE from 'three';
// import { Button } from 'ui';
import { Button, RoundedButton, CircleButton } from 'objects';
// import { Flower, Land } from 'objects';
// import { BasicLights } from 'lights';

const CIRCLE_RADIUS = 1.1;
const CIRCLE_TRI = 32;

class UIScene extends Scene {
    constructor(camX, camY) {
        // Call parent Scene() constructor
        super();

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

        let fbuttonlen = flowerSelect.width*.25;

        const flowerOne = new RoundedButton(fbuttonlen, fbuttonlen, 1, 0xff0000, "flowerOne");
        flowerOne.SetPosition(flowerSelect.position.x - (flowerSelect.width*.3), -camY + flowerSelect.length/2, 1);
        this.add( flowerOne );

        const flowerTwo = new RoundedButton(fbuttonlen, fbuttonlen, 1, 0x00ff00, "flowerTwo");
        flowerTwo.SetPosition(flowerSelect.position.x - flowerSelect.width*0, -camY + flowerSelect.length/2, 1);
        this.add( flowerTwo );

        const flowerThree = new RoundedButton(fbuttonlen, fbuttonlen, 1, 0x0000ff, "flowerThree");
        flowerThree.SetPosition(flowerSelect.position.x + flowerSelect.width*.3, -camY + flowerSelect.length/2, 1);
        this.add( flowerThree );


        // Planet selection UI Elements
        const planetSelect = new RoundedButton(camX*.2, camY, 1, 0xc072d4, "planetSelect");
        planetSelect.SetPosition(camX - planetSelect.width/2, -camY/2, 0);
        this.add( planetSelect );

        let pbuttonlen = planetSelect.width*.75;
        
        const planetOne = new CircleButton(CIRCLE_RADIUS, CIRCLE_TRI, "src/components/textures/planets/Planet1.png", "Planet1");
        planetOne.SetPosition(camX - planetSelect.width/2, -camY/2 + planetSelect.length* 3/10, 1);
        this.add( planetOne );

        const planetTwo = new CircleButton(CIRCLE_RADIUS, CIRCLE_TRI, "src/components/textures/planets/Planet2.png", "Planet2");
        planetTwo.SetPosition(camX - planetSelect.width/2, -camY/2, 1);
        this.add( planetTwo );

        const planetThree = new CircleButton(CIRCLE_RADIUS, CIRCLE_TRI, "src/components/textures/planets/Planet3.png", "Planet3");
        planetThree.SetPosition(camX - planetSelect.width/2, -camY/2 - planetSelect.length* 3/10, 1);
        this.add( planetThree );
    }

}

export default UIScene;
