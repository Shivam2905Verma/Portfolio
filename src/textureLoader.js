import * as THREE from "three";

export const textureLoader = new THREE.TextureLoader();

export const textureMap = {
  wall: {
    day: "/textures/day/WallItemsTextures.webp",
    night: "/textures/night/wallNightTexture.webp",
  },
  desk: {
    day: "/textures/day/DeskTopItemsfinal.webp",
    night: "/textures/night/deskNightTexture.webp",
  },
  Room: {
    day: "/textures/day/RoomTexture.webp",
    night: "/textures/night/RoomNightTexture.webp",
  },
  floor: {
    day: "/textures/day/FloorAndBoard.webp",
    night: "/textures/night/FloorNightTexture.webp",
  },
  Background: {
    day: "/textures/day/BackgroundTexture.webp",
    night: "/textures/night/BackgroundNightTexture.webp",
  },
  frame1photo: {
    day: "/images/nezuko.webp",
    night: "/images/nezuko.webp",
  },
  frame2photo: {
    day: "/images/tanjiro.webp",
    night: "/images/tanjiro.webp",
  },
  frame3photo: {
    day: "/images/nezukocute.webp",
    night: "/images/nezukocute.webp",
  },
};

export const loadedTextures = {
  day: {},
  night: {},
};

Object.entries(textureMap).map(([key, path]) => {
  const dayTexture = textureLoader.load(path.day);
  dayTexture.flipY = false;
  dayTexture.minFilter = THREE.LinearFilter;
  dayTexture.magFilter = THREE.LinearFilter;
  dayTexture.colorSpace = THREE.SRGBColorSpace;
  loadedTextures.day[key] = dayTexture;
  
  const nightTexture = textureLoader.load(path.night);
  nightTexture.flipY = false;
  nightTexture.minFilter = THREE.LinearFilter;
  nightTexture.magFilter = THREE.LinearFilter;
  nightTexture.colorSpace = THREE.SRGBColorSpace;
  loadedTextures.night[key] = nightTexture;
});
