import { OrbitControls } from "./utils/OrbitControl.js";
import { camera, renderer } from "./setup";

export const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 10;
controls.maxDistance = 40;
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI / 2.5;
controls.maxAzimuthAngle = -0.2;
controls.minAzimuthAngle = Math.PI * 1.6;
controls.enableDamping = true;
controls.target.set(2.9080385061721623,2.4412125657358983,-15.000000000000002);
