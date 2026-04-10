import * as THREE from "three";
import { videoElement } from "./loadModel.js";
import { currentIntersects, explicitMuted, setBgMusic } from "./main.js";
import { camera, renderer, size } from "./setup.js";
import gsap from "gsap";

export const pointer = new THREE.Vector2();

const social_Links = {
  Linkdin: "https://www.linkedin.com/in/shivam-verma-996486346/",
  Threads: "https://www.threads.com/@shivam_v2905",
  Twitter: "https://x.com/ShivamV05130874",
};

const modelOverlay = document.querySelector(".model-overlay");
const about = document.querySelector(".model-about");
const work = document.querySelector(".model-work");
const contact = document.querySelector(".model-contact");
const exitBtns = document.querySelectorAll(".exit");
const musicBtn = document.querySelector(".musicBtn");

exitBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    gsap.to(modelOverlay, {
      scale: 0,
      duration: 0.3,
      ease: "power1.out",
      transformOrigin: "center center",
    });
  });
});

window.addEventListener("click", () => {
  if (currentIntersects.length == 0) return;

  //* For social media
  Object.entries(social_Links).forEach(([soialMedia, link]) => {
    if (currentIntersects[0].object.name.includes(soialMedia)) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  });

  if (currentIntersects[0].object.name.includes("Work")) {
    work.style.display = "block";
    contact.style.display = "none";
    about.style.display = "none";
    gsap.to(modelOverlay, {
      scale: 1,
      duration: 0.3,
      ease: "power1.out",
      transformOrigin: "center center",
    });
  } else if (currentIntersects[0].object.name.includes("Contact")) {
    work.style.display = "none";
    contact.style.display = "block";
    about.style.display = "none";
    gsap.to(modelOverlay, {
      scale: 1,
      duration: 0.3,
      ease: "power1.out",
      transformOrigin: "center center",
    });
  } else if (currentIntersects[0].object.name.includes("About")) {
    work.style.display = "none";
    contact.style.display = "none";
    about.style.display = "block";
    gsap.to(modelOverlay, {
      scale: 1,
      duration: 0.3,
      ease: "power1.out",
      transformOrigin: "center center",
    });
  }

  //* For speakers
  if (currentIntersects[0].object.name.includes("speaker")) {
    videoElement.muted = !videoElement.muted;

    if (!videoElement.muted) {
      videoElement.volume = 0.2;
      setBgMusic(false);
      musicBtn.innerHTML = `<i class="ri-volume-mute-fill"></i>`;
    } else {
      if (explicitMuted) {
        setBgMusic(false);
        musicBtn.innerHTML = `<i class="ri-volume-mute-fill"></i>`;
      } else {
        setBgMusic(true);
        musicBtn.innerHTML = `<i class="ri-volume-up-fill"></i>`;
      }
    }
  }
});

window.addEventListener("mousemove", (e) => {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
