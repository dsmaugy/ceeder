/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SeedScene } from 'scenes';

// Initialize core ThreeJS components
const scene = new SeedScene();
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

window.onload = (event) => {
  var audio = new Audio('music.mp3');
  audio.play();
=======
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
    //console.log(worldCoords);
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
          //console.log(clickedObject.name);
          scene.changePlanet(clickedObject.name);

    }

>>>>>>> Stashed changes
};
