import * as THREE from "three";

export const scene = new THREE.Scene();

export const size = {
  height: window.innerHeight,
  width: window.innerWidth,
};

const canvas = document.querySelector(".experience-canvas");

export const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0xd5c7d1);

export const camera = new THREE.PerspectiveCamera(
  window.innerWidth <= 768 ? 70 : 40,
  size.width / size.height,
  0.1,
  1000,
);

camera.position.set(-9.786914700681159, 8.786469672184147, 10);
