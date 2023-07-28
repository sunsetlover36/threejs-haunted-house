import * as THREE from 'three';

import { scene } from './scene';
import { COLORS } from './constants';
import { optimizeShadow } from './helpers';

// Ambient light
export const ambientLight = new THREE.AmbientLight(COLORS.blue, 0.12);
scene.add(ambientLight);

// Directional light
export const moonLight = new THREE.DirectionalLight(COLORS.blue, 0.12);
moonLight.castShadow = true;
optimizeShadow(moonLight, true);
moonLight.position.set(4, 5, -2);
scene.add(moonLight);
