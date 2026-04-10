import gsap from "gsap";

import {
  midboard,
  upboard,
  workboard,
  contactboard,
  aboutboard,
  twitter,
  threads,
  linkdin,
  bottle,
} from "./loadModel.js";

export function playHoverAnimation(object, isHovering) {
  if (!object) return;
  gsap.killTweensOf(object.scale);
  gsap.killTweensOf(object.rotation);
  gsap.killTweensOf(object.position);

  if (isHovering) {
    if (object.name.includes("rotate")) {
      let rotateVal;

      if (object.name.includes("rotateright")) {
        rotateVal = object.userData.initialRotation.y - Math.PI / 10;
      } else {
        rotateVal = object.userData.initialRotation.y + Math.PI / 10;
      }

      let scalevalue = 1;

      if (object.name.includes("large")) {
        scalevalue = 2.5;
      } else {
        scalevalue = 1.1;
      }

      gsap.to(object.scale, {
        x: object.userData.initialScale.x * scalevalue,
        y: object.userData.initialScale.y * scalevalue,
        z: object.userData.initialScale.z * scalevalue,
        duration: 0.5,
        ease: "bounce.out(1.8)",
      });

      gsap.to(object.rotation, {
        y: rotateVal,
        duration: 0.5,
        ease: "bounce.out(1.8)",
      });
    } else {
      gsap.to(object.scale, {
        x: object.userData.initialScale.x * 1.3,
        y: object.userData.initialScale.y * 1.3,
        z: object.userData.initialScale.z * 1.3,
        duration: 0.5,
        ease: "bounce.out(1.8)",
      });
    }
  } else {
    gsap.to(object.scale, {
      x: object.userData.initialScale.x,
      y: object.userData.initialScale.y,
      z: object.userData.initialScale.z,
      duration: 0.3,
      ease: "bounce.out(1.8)",
    });
    gsap.to(object.rotation, {
      y: object.userData.initialRotation.y,
      duration: 0.3,
      ease: "bounce.out(1.8)",
    });
  }
}

export function introAnimation() {
  const boards = [
  upboard.scale,
  midboard.scale,
  workboard.scale,
  aboutboard.scale,
  contactboard.scale,
];

const socials = [
  bottle.scale,
  linkdin.scale,
  threads.scale,
  twitter.scale,
];

const boardTl = gsap.timeline({
  defaults: {
    duration: 0.7,
    ease: "back.out(1.8)",
  },
});

boardTl.to(boards, {
  x: 1,
  y: 1,
  z: 1,
  stagger: 0.2,
});

const socialTl = gsap.timeline({
  defaults: {
    duration: 0.5,
    ease: "back.out(1.8)",
  },
});

socialTl.to(socials, {
  x: 1,
  y: 1,
  z: 1,
  stagger: 0.15,
});
}
