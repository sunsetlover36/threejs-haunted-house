import GUI from 'lil-gui';

import { ambientLight, moonLight } from './lights';

export const gui = new GUI();

gui
  .add(ambientLight, 'intensity')
  .name('Ambient light intensity')
  .min(0)
  .max(1)
  .step(0.001);

gui.add(moonLight, 'intensity').name('Moon light intensity').min(0).max(1).step(0.001);
gui.add(moonLight.position, 'x').name('Moon X').min(-5).max(5).step(0.001);
gui.add(moonLight.position, 'y').name('Moon Y').min(-5).max(5).step(0.001);
gui.add(moonLight.position, 'z').name('Moon Z').min(-5).max(5).step(0.001);
