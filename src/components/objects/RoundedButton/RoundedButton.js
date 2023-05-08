import { Mesh, MeshBasicMaterial, Vector3 } from 'three';
// import { RoundedBoxGeometry } from 'three-rounded-box';
import * as THREE from 'three';
var RoundedBoxGeometry = require('three-rounded-box')(THREE); //pass your instance of three

// import { RoundedBoxGeometry } from './threejs/examples/jsm/geometries/RoundedBoxGeometry.js';
// var RoundedBoxGeometry = require('three-rounded-box')(THREE);

class RoundedButton extends Mesh {
    constructor( w, l, h, useColor, name) {
        
        const geometry = new RoundedBoxGeometry(w, l, h, 2, 5);
        const material = new MeshBasicMaterial({ color: useColor });
        
        
        super(geometry, material);
        this.name = name;
        this.width = w;
        this.length = l;
        this.height = h;
        // this.position.set(xPos, yPos, z);
        // console.log(this.position.x, this.position.y, this.position.z);
    }

    SetPosition(x, y, z) {
        this.position.set(x, y, z);
    }

}

export default RoundedButton;
