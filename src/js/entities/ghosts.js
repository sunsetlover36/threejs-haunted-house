import * as THREE from 'three';

import { optimizeShadow } from '../helpers';
import { scene } from '../scene';
import { COLORS } from '../constants';

export const ghosts = [COLORS.fuchsia, COLORS.cyan, COLORS.yellow].map((color) => {
  const ghost = new THREE.PointLight(color, 2, 3);
  ghost.castShadow = true;
  optimizeShadow(ghost);
  scene.add(ghost);

  return ghost;
});
