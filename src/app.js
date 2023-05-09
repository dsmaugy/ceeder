/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3, OrthographicCamera, Raycaster, Vector2, Mesh, ArrowHelper} from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import AudioManager from './components/audio/AudioManager';
import { MainScene, UIScene } from 'scenes';

const { innerHeight, innerWidth } = window;
// Initialize core ThreeJS components
const scene = new MainScene();
const renderer = new WebGLRenderer({ antialias: true,});
renderer.autoClear = false;

// Perspective
const camera = new PerspectiveCamera();
// Set up camera
camera.position.set(6, 3, -10);
camera.lookAt(new Vector3(0, 0, 0));

//Orthographic
const orthographicSize = 15;
const aspect = innerWidth / innerHeight;
const uiCamera = new OrthographicCamera(
    -orthographicSize * aspect / 2,
    orthographicSize * aspect / 2,
    orthographicSize / 2,
    -orthographicSize / 2
    );

// UI camera setup
uiCamera.position.set(0, 0, orthographicSize);
uiCamera.lookAt(new Vector3(0, 0, 0));
uiCamera.aspect = aspect;

// Scene setup
const uiScene = new UIScene(uiCamera.right, uiCamera.top);

// var RoundedBoxGeometry = require('three-rounded-box')(THREE); //pass your instance of three
// var myBox = new THREE.Mesh( new RoundedBoxGeometry( 10 , 10 , 10 , 2 , 5 ) );
// scene.add(myBox);



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
    if (intersects.length === 1) {
        scene.plantFlower(intersects[0].point, intersects[0].face);
    console.log(intersects)
    // if (intersects[0]) {
        // scene.plantFlower(intersects[0].point, intersects[0].face);
        // scene.add(new ArrowHelper(intersects[0].face.normal, intersects[0].point, 2, "red"));
    }
}

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    renderer.render(scene, camera);
    renderer.render(uiScene, uiCamera);
    scene.update && scene.update(timeStamp);
    // scene.update(timeStamp);
    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);



// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    const aspect = innerWidth / innerHeight;
    renderer.setSize(innerWidth, innerHeight);

    // Update Perspective Camera
    camera.aspect = aspect;
    camera.updateProjectionMatrix();

    // Update orthographic camera's dimensions based on aspect ratio
    uiCamera.left = -orthographicSize * aspect / 2;
    uiCamera.right = orthographicSize * aspect / 2;
    uiCamera.top = orthographicSize / 2;
    uiCamera.bottom = -orthographicSize / 2;

    uiCamera.aspect = innerWidth / innerHeight;
    uiCamera.updateProjectionMatrix();

    // uiScene.update && uiScene.update(window);
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);

window.addEventListener('pointermove', updatePointer);
window.addEventListener('mouseup', addFlower);

// Click Handler
const onClickHandler = (event) => {
    // Mouse Coordinates

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Screen -> NDC [this is within (-1,1)]
    const mouseNDC = new Vector3(
        (mouseX / window.innerWidth) * 2 - 1,
        -(mouseY / window.innerHeight) * 2 +1,
        0
    );


    // Unproject: NDC -> world
    const worldCoords = new Vector3();
    worldCoords.copy(mouseNDC).unproject(uiCamera);
    console.log(worldCoords);
    // Raycast
    const raycaster = new Raycaster();
    raycaster.layers.enableAll()
    raycaster.setFromCamera(mouseNDC, uiCamera);

    // console.log("clicked on screen coords: (" + mouseX + ", " + mouseY + ")" );
    // console.log("clicked on world coords: (" + worldCoords.x + ", " + worldCoords.y + ", " + worldCoords.z + ")" );

    const intersects = raycaster.intersectObjects(uiScene.children, true);
    // console.log(uiScene.children);
    // console.log(intersects);
    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;

        // console.log(clickedObject.getObjectByName);
        console.log(clickedObject.name);

    }
}
window.addEventListener('click', onClickHandler);
// TODO: make this so you hvae to mousedown AND mouseup on the planet in order for the click to be registered
// canvas.addEventListener('pointermove', updatePointer);
// canvas.addEventListener('mouseup', addFlower);
