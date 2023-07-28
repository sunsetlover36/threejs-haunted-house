import * as THREE from 'three';

import { scene } from '../scene';
import { COLORS, HOUSE_PARAMS } from '../constants';
import { textures } from '../textures';
import { optimizeShadow } from '../helpers';

export const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(HOUSE_PARAMS.houseWidth, HOUSE_PARAMS.wallsHeight, 4),
  new THREE.MeshStandardMaterial(textures.bricks)
);
walls.castShadow = true;
walls.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
walls.position.y = HOUSE_PARAMS.wallsHeight / 2;
house.add(walls);

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: COLORS.brown })
);
roof.position.y = HOUSE_PARAMS.wallsHeight + HOUSE_PARAMS.roofHeight / 2;
roof.rotation.y = Math.PI / 4;
house.add(roof);

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(HOUSE_PARAMS.doorSize, HOUSE_PARAMS.doorSize, 100, 100),
  new THREE.MeshStandardMaterial({
    transparent: true,
    displacementScale: 0.1,
    ...textures.door,
  })
);
door.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.y = 1;
door.position.z = 2 - 0.0175;

// Door light
const doorLight = new THREE.PointLight(COLORS.coral, 1, 7);
doorLight.castShadow = true;
optimizeShadow(doorLight);
doorLight.position.set(0, HOUSE_PARAMS.wallsHeight - 0.1, HOUSE_PARAMS.doorSize + 0.5);

house.add(door, doorLight);

// Bushes
const bushesData = [
  {
    scale: 0.5,
    position: [0.8, 0.2, 2.2],
  },
  {
    scale: 0.25,
    position: [1.4, 0.1, 2.1],
  },
  {
    scale: 0.4,
    position: [-0.8, 0.1, 2.2],
  },
  {
    scale: 0.15,
    position: [-1, 0.05, 2.6],
  },
];
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: COLORS.pistachio });
bushesData.forEach((bushData) => {
  const { scale, position } = bushData;
  const bush = new THREE.Mesh(bushGeometry, bushMaterial);
  bush.castShadow = true;
  bush.position.set.apply(bush.position, position);
  bush.scale.set(scale, scale, scale);
  house.add(bush);
});
