'use strict';

import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';

// Getting started / creating a scene using three.js
// Reference: https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene

// Three.js Responsive Design
// Reference: https://r105.threejsfundamentals.org/threejs/lessons/threejs-responsive.html

function main(){
  // Declare the canvas element and instantiate the renderer.
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer( {canvas} );
  
  // Instantiate a camera to view the model.
  const fov = 75;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0.5, 0.25, 0.5);
  
  // Instantiate a scene.
  const scene = new THREE.Scene();

  // Add a couple of spotlights to illuminate the model.
  const spotLight1 = new THREE.SpotLight();
  spotLight1.position.set(5, 5, 5);
  scene.add(spotLight1);

  const spotLight2 = new THREE.SpotLight();
  spotLight2.position.set(-5, 5, -5);
  scene.add(spotLight2);

  // Loading 3D models - gLTF from Blender.
  // Reference: https://threejs.org/docs/index.html#manual/en/introduction/Loading-3D-models
  // Reference: https://sbcode.net/threejs/loaders-gltf/

  // Define controls to manipulate the camera.
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0,0,0);
  controls.update();
  controls.enablePan = false;

  // Load and animate the model.
  const loader = new GLTFLoader();
  loader.load('./models/gltf/volkswagen-type3.glb', function(gltf) {
    const car = gltf.scene;
    console.log(car);
    //car.children[24].visible = false; // hide the roof 
    car.scale.set(0.15, 0.15, 0.15);
    scene.add(car);
    render();
  }, undefined, function(error) {
    console.error(error);
  });

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if( resizeRendererToDisplaySize(renderer) ) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
