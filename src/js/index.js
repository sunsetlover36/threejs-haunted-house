import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import screenfull from 'screenfull';

import '../css/style.css';
import { getGhostPos } from './helpers';
import { COLORS, SIZES } from './constants';
import { scene } from './scene';
import { ghosts } from './entities';
import './gui';

THREE.ColorManagement.enabled = false;

// Fog
const fog = new THREE.Fog(COLORS.black, 1, 15);
scene.fog = fog;

// Base camera
const camera = new THREE.PerspectiveCamera(75, SIZES.width / SIZES.height, 0.1, 100);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Clock
const clock = new THREE.Clock();

document.addEventListener('DOMContentLoaded', () => {
  // Canvas
  const canvas = document.getElementById('webgl');
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(SIZES.width, SIZES.height);
  renderer.setClearColor(COLORS.black);

  // Events
  window.addEventListener('resize', () => {
    SIZES.width = window.innerWidth;
    SIZES.height = window.innerHeight;

    camera.aspect = SIZES.width / SIZES.height;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(SIZES.width, SIZES.height);
  });
  window.addEventListener('dblclick', () => {
    if (!screenfull.isFullscreen) {
      screenfull.request(canvas);
    } else {
      screenfull.exit();
    }
  });

  // Tick
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    ghosts.forEach((ghost, i) => {
      ghost.position.set.apply(ghost.position, getGhostPos(i, elapsedTime));
    });

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };

  tick();
});
