/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3, Raycaster, Vector2, Mesh, ArrowHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MainScene } from 'scenes';
import AudioManager from './components/audio/AudioManager';

// Initialize core ThreeJS components
const scene = new MainScene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });

// Set up camera
camera.position.set(6, 3, -10);
camera.lookAt(new Vector3(0, 0, 0));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.update();

// set up audio
const audioManager = new AudioManager();
camera.add(audioManager);


// raycaster example from https://threejs.org/docs/#api/en/core/Raycaster
const raycaster = new Raycaster();
const pointer = new Vector2();

function updatePointer(event) {
    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

// function isPlanet(obj) {
//     let objIter = obj;
//     while (objIter) {
//         if (objIter.name === "planet") {
//             return true;
//         }

//         objIter = objIter.parent;
//     }

//     return false;
// }

function addFlower() {
    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObject(scene.getPlanet().model);
    console.log(intersects)
    for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object instanceof Mesh && intersects[i].object.name === "Icosphere") { // TODO: hardcoded to model of planet name
            scene.plantFlower(intersects[i].point, intersects[i].face);
            // scene.add(new ArrowHelper(intersects[i].face.normal, intersects[i].point, 2, "red"));
            break;
        }
    }

}

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp);
    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);



// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);

window.addEventListener('pointermove', updatePointer);
window.addEventListener('mouseup', addFlower);
