import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();
export const textures = Object.fromEntries(
  Object.entries({
    door: {
      map: '/textures/door/color.jpg',
      alphaMap: '/textures/door/alpha.jpg',
      aoMap: '/textures/door/ambientOcclusion.jpg',
      displacementMap: '/textures/door/height.jpg',
      normalMap: '/textures/door/normal.jpg',
      metalnessMap: '/textures/door/metalness.jpg',
      roughnessMap: '/textures/door/roughness.jpg',
    },
    bricks: {
      map: '/textures/bricks/color.jpg',
      aoMap: '/textures/bricks/ambientOcclusion.jpg',
      normalMap: '/textures/bricks/normal.jpg',
      roughnessMap: '/textures/bricks/roughness.jpg',
    },
    grass: {
      map: '/textures/grass/color.jpg',
      aoMap: '/textures/grass/ambientOcclusion.jpg',
      normalMap: '/textures/grass/normal.jpg',
      roughnessMap: '/textures/grass/roughness.jpg',
    },
  }).map((entry) => {
    const [textureName, textures] = entry;
    for (const textureProp in textures) {
      const texturePath = textures[textureProp];
      const texture = textureLoader.load(texturePath);

      // Reduce the texture size for grass
      if (textureName === 'grass') {
        texture.repeat.set(8, 8);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }

      textures[textureProp] = texture;
    }

    return entry;
  })
);
