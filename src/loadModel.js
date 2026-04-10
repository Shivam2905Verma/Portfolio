import * as THREE from "three";
import { textureMap, loadedTextures } from "./textureLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Euler, Vector3 } from "three/webgpu";
import { scene } from "./setup.js";
import { manager } from "./loadingScreen.js";
import { changeTheme } from "./changeTheme.js";

export const raycasterobjects = [];
export let midboard = null;
export let upboard = null;
export let workboard = null;
export let aboutboard = null;
export let contactboard = null;
export let twitter = null;
export let threads = null;
export let linkdin = null;
export let bottle = null;
export let chairTop = null;
export let minhand = null;
export let hourHand = null;
export const fanX = [];
export const fanY = [];
export const allMaterialTextures = {};



const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader(manager);
gltfLoader.setDRACOLoader(dracoLoader);

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uDayTexture;
  uniform sampler2D uNightTexture;
  uniform float uMixRatio;
  varying vec2 vUv;

  void main() {
    vec4 dayColor = texture2D(uDayTexture, vUv);
    vec4 nightColor = texture2D(uNightTexture, vUv);
    
    // Mix linearly between day and night based on uMixRatio (0.0 to 1.0)
    vec4 finalColor = mix(dayColor, nightColor, uMixRatio);
    
    // Convert to sRGB color space (standard for web)
    gl_FragColor = sRGBTransferOETF(finalColor);
  }
`;

export const videoElement = document.createElement("video");
videoElement.src = "/video/nezuko.mp4";
videoElement.playsInline = true;
videoElement.loop = true;
videoElement.autoplay = true;
videoElement.muted = true;

const videoTexture = new THREE.VideoTexture(videoElement);
videoTexture.colorSpace = THREE.SRGBColorSpace;
videoTexture.flipY = false;

gltfLoader.load("/models/Room_Portfolio-Compressed.glb", (glb) => {
  glb.scene.traverse((child) => {
    if (child.isMesh) {
      if (child.name.includes("raycaster")) {
        raycasterobjects.push(child);
      }
      if (child.name.includes("hover")) {
        child.userData.initialScale = new Vector3().copy(child.scale);
        child.userData.initialPosition = new Vector3().copy(child.position);
        child.userData.initialRotation = new Euler().copy(child.rotation);
      }

      //* Computer Fans
      if (
        child.name.includes("Fan1") ||
        child.name.includes("Fan2") ||
        child.name.includes("Fan3")
      ) {
        fanX.push(child);
      } else if (child.name.includes("Fan4") || child.name.includes("Fan5")) {
        fanY.push(child);
      }

      //* Intro Animations
      if (child.name.includes("Board")) {
        child.scale.set(0, 0, 0);
        if (child.name.includes("Up")) {
          upboard = child;
        } else if (child.name.includes("Mid")) {
          midboard = child;
        } else if (child.name.includes("Work")) {
          workboard = child;
        } else if (child.name.includes("Contact")) {
          contactboard = child;
        } else if (child.name.includes("About")) {
          aboutboard = child;
        }
      } else if (child.name.includes("Twitter")) {
        twitter = child;
        child.scale.set(0, 0, 0);
      } else if (child.name.includes("Threads")) {
        threads = child;
        child.scale.set(0, 0, 0);
      } else if (child.name.includes("Linkdin")) {
        linkdin = child;
        child.scale.set(0, 0, 0);
      } else if (child.name.includes("Bottle")) {
        bottle = child;
        child.scale.set(0, 0, 0);
      } else if (child.name.includes("Chairup")) {
        chairTop = child;
      } else if (child.name.includes("minuteHand")) {
        console.log("run");
        minhand = child;
        console.log(minhand);
      } else if (child.name.includes("hourHand")) {
        hourHand = child;
      }

      // * Texture apllying to all objects
      if (child.name.includes("Screen")) {
        child.material = new THREE.MeshBasicMaterial({
          map: videoTexture,
        });
      } else {
        Object.keys(textureMap).forEach((key) => {
          if (child.name.includes(key)) {
            // CREATE THE SHADER MATERIAL
            const material = new THREE.ShaderMaterial({
              uniforms: {
                uDayTexture: { value: loadedTextures.day[key] },
                uNightTexture: { value: loadedTextures.night[key] },
                uMixRatio: { value: 0.0 }, // Start at 0 (Day)
              },
              vertexShader: vertexShader,
              fragmentShader: fragmentShader,
              transparent: true,
            });

            child.material = material;

            // Store it so we can animate it later
            if (!allMaterialTextures[key]) {
              allMaterialTextures[key] = [];
            }
            allMaterialTextures[key].push(material);
          }
        });
      }
    }
  });

  console.log(allMaterialTextures);
  scene.add(glb.scene);
  changeTheme();
});
