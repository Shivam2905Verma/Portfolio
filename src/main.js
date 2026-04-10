import * as THREE from "three";
import { camera, renderer, scene } from "./setup.js";
import { controls } from "./orbitControls.js";
import { mouse } from "./eventListners.js";
import gsap from "gsap";
import {
  raycasterobjects,
  fanX,
  fanY,
  minhand,
  hourHand,
  chairTop,
  videoElement,
} from "./loadModel.js";
import { playHoverAnimation } from "./animationFunctions.js";
export let currentIntersects = [];
export let currentHoveredObject = null;

export const raycaster = new THREE.Raycaster();
const timer = new THREE.Timer();

const music = new Audio("/backgroundMusic/bg1.mp3");
music.volume = 0.2;
music.loop = true;

let bgMusic = true;
export let explicitMuted = false;

export function setBgMusic(value) {
  bgMusic = value;
  backgroundMusic();
}

export function backgroundMusic() {
  if (bgMusic) {
    music.play();
  } else {
    music.pause();
  }
}

const musicBtn = document.querySelector(".musicBtn");

function handleMusicBtn() {
  const tl = gsap.timeline();

  tl.to(musicBtn, {
    scale: 1.7,
    duration: 0.08,
  }).to(musicBtn, {
    scale: 1,
    duration: 0.2,
    ease: "power2.out",
  });

  bgMusic = !bgMusic;

  setBgMusic(bgMusic);

  if (bgMusic) {
    videoElement.muted = true;
    explicitMuted = false;
    musicBtn.innerHTML = `<i class="ri-volume-up-fill"></i>`;
  } else {
    explicitMuted = true;
    musicBtn.innerHTML = `<i class="ri-volume-mute-fill"></i>`;
  }
}

musicBtn.addEventListener("click", handleMusicBtn);
musicBtn.addEventListener("touchend", handleMusicBtn);

const modelContents = document.querySelectorAll(".model-content");

modelContents.forEach((e) => {
  e.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});
modelContents.forEach((e) => {
  e.addEventListener("touchend", (e) => {
    e.stopPropagation();
  });
});

//* Time for clock function
function updateClock(hourHand, minuteHand) {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const minuteAngle = -((minutes + seconds / 60) * (Math.PI * 2)) / 60;
  const hourAngle = -((hours + minutes / 60) * (Math.PI * 2)) / 12;

  minuteHand.rotation.z = minuteAngle;
  hourHand.rotation.z = hourAngle;
}

function animate() {
  controls.update();

  //* Raycaster
  raycaster.setFromCamera(mouse, camera);

  currentIntersects = raycaster.intersectObjects(raycasterobjects);

  if (currentIntersects.length > 0) {
    const currentIntersectObject = currentIntersects[0].object;
    if (currentIntersectObject.name.includes("interact")) {
      document.body.style.cursor = "pointer";
    }

    if (currentIntersectObject.name.includes("hover")) {
      if (currentIntersectObject !== currentHoveredObject) {
        if (currentHoveredObject) {
          playHoverAnimation(currentHoveredObject, false);
        }

        playHoverAnimation(currentIntersectObject, true);
        currentHoveredObject = currentIntersectObject;
      }
    }
  } else {
    document.body.style.cursor = "default";
    playHoverAnimation(currentHoveredObject, false);
    currentHoveredObject = null;
  }
  //* -------------Raycaster--------------

  if (fanX) {
    fanX.forEach((fan) => {
      fan.rotation.x += 0.1;
    });
  }
  if (fanY) {
    fanY.forEach((fan) => {
      fan.rotation.z += 0.1;
    });
  }

  timer.update();

  const time = timer.getElapsed();

  if (chairTop) {
    chairTop.rotation.y = Math.sin(time * 1.3) * 0.3;
  }

  if (hourHand && minhand) {
    updateClock(hourHand, minhand);
  }

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}

animate();
