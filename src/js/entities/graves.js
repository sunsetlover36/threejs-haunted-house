import * as THREE from 'three';

import { scene } from '../scene';
import { COLORS, GRAVES_COUNT, HOUSE_PARAMS } from '../constants';

export const graves = new THREE.Group();
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: COLORS.gray });
for (let i = 0; i < GRAVES_COUNT; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = HOUSE_PARAMS.houseWidth + Math.random() * 5;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.castShadow = true;
  grave.position.set(x, 0.3, z);
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  graves.add(grave);
}
scene.add(graves);
