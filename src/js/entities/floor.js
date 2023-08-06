import * as THREE from 'three';

import { scene } from '../scene';
import { textures } from '../textures';

export const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial(textures.grass)
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);
