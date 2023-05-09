/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3, Raycaster, Vector2, Mesh, ArrowHelper } from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
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
const controls = new TrackballControls(camera, canvas);
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

function addFlower() {
    raycaster.setFromCamera(pointer, camera);

    // TODO: make this so you can't add flowers with a mouse click through other flowers / objects
    const intersects = raycaster.intersectObject(scene.getPlanet().model);
    console.log(intersects)
    if (intersects[0]) { 
        scene.plantFlower(intersects[0].point, intersects[0].face);
        // scene.add(new ArrowHelper(intersects[0].face.normal, intersects[0].point, 2, "red"));
    }

}

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    renderer.render(scene, camera);
    scene.update(timeStamp);
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

// TODO: make this so you hvae to mousedown AND mouseup on the planet in order for the click to be registered
canvas.addEventListener('pointermove', updatePointer);
canvas.addEventListener('mouseup', addFlower);
