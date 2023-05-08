import { Group, Mesh, MeshBasicMaterial, Vector3 } from 'three';
// import { RoundedBoxGeometry } from 'three-rounded-box';
import * as THREE from 'three';
var RoundedBoxGeometry = require('three-rounded-box')(THREE); //pass your instance of three

// import { RoundedBoxGeometry } from './threejs/examples/jsm/geometries/RoundedBoxGeometry.js';
// var RoundedBoxGeometry = require('three-rounded-box')(THREE);

class RoundedButton extends Group {
    constructor( w, l, h, useColor, name) {
        // Call parent Group() constructor
        super();

        this.width = w;
        this.length = l;
        this.height = h;
        // this.name = name;
        
        // Create the button
        const geometry = new RoundedBoxGeometry(w, l, h, 2, 5);
        const material = new MeshBasicMaterial({ color: useColor });
        const button = new Mesh(geometry, material);
        this.add(button);
        button.name = name;
    }

    SetPosition(x, y, z) {
        this.position.set(x, y, z);
    }

}

export default RoundedButton;
