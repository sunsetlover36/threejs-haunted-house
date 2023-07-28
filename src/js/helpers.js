import { GHOST_ANGLES } from './constants';

export const optimizeShadow = (obj, isMoonLight) => {
  obj.shadow.mapSize.width = 256;
  obj.shadow.mapSize.height = 256;
  obj.shadow.camera.far = isMoonLight ? 15 : 7;
};

export const getGhostPos = (i, elapsedTime) => {
  const angle = elapsedTime * GHOST_ANGLES[i];

  if (i === 0) {
    return [Math.cos(angle) * 4, Math.sin(elapsedTime * 3), Math.sin(angle) * 4];
  } else if (i === 1) {
    return [
      Math.cos(angle) * 5,
      Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5),
      Math.sin(angle) * 5,
    ];
  } else {
    return [
      Math.cos(angle) * (7 + Math.sin(elapsedTime * 0.32)),
      Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5),
      Math.sin(angle) * (7 + Math.sin(elapsedTime * 0.5)),
    ];
  }
};
