import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';

// Getting started / creating a scene using three.js
// Reference: https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene

// Instantiate scene and camera.
const scene = new THREE.Scene();

// Add a couple of spotlights to illuminate the model.
const spotLight1 = new THREE.SpotLight();
spotLight1.position.set(5, 5, 5);
scene.add(spotLight1);

const spotLight2 = new THREE.SpotLight();
spotLight2.position.set(-5, 5, -5);
scene.add(spotLight2);

// Create a camera from which to view the model.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 0.5;


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Loading 3D models - gLTF from Blender.
// Reference: https://threejs.org/docs/index.html#manual/en/introduction/Loading-3D-models
// Reference: https://sbcode.net/threejs/loaders-gltf/

// Define controls to manipulate the camera.
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0,0,0);
controls.update();
controls.enablePan = false;
// controls.enableDamping = true;

// Load and animate the model.
const loader = new GLTFLoader();
loader.load('./models/gltf/volkswagen-type3.glb', function(gltf) {
  const car = gltf.scene;
  car.scale.set(0.15, 0.15, 0.15);
  scene.add(car);
  animate();
}, undefined, function(error) {
  console.error(error);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
