import gsap from "gsap";
import { allMaterialTextures } from "./loadModel";

let isDay = true;

export function changeTheme() {
  isDay = !isDay;
  const targetValue = isDay ? 1 : 0;

  Object.values(allMaterialTextures).forEach((materialsArray) => {
    materialsArray.forEach((material) => {
      // Use GSAP to animate the 'value' inside the uniform
      gsap.to(material.uniforms.uMixRatio, {
        value: targetValue,
        duration: 1.2,
        ease: "power2.inOut",
      });
    });
  });
}

const changeThemeBtn = document.querySelector(".changeTheme");
const themeAndMusicbtns = document.querySelectorAll(".themeAndMusic-btn");

themeAndMusicbtns.forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
     gsap.killTweensOf(btn);
     gsap.to(btn, {
       scale: 1.5,
       duration: 0.25,
       ease: "back.out(3)",
      });
    });
    
    btn.addEventListener("mouseleave", () => {
    gsap.killTweensOf(btn);
    gsap.to(btn, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  });
});

function handleChnageThemeBtn(){
const tl = gsap.timeline();

  tl.to(changeThemeBtn, {
    scale: 1.7,
    duration: 0.08,
  }).to(changeThemeBtn, {
    scale: 1,
    duration: 0.2,
    ease: "power2.out",
  });

  if (isDay) {
    changeThemeBtn.innerHTML = `<i class="ri-moon-fill"></i>`;
  } else {
    changeThemeBtn.innerHTML = `<i class="ri-sun-fill"></i>`;
  }

  changeTheme();
}

changeThemeBtn.addEventListener("click", handleChnageThemeBtn);
changeThemeBtn.addEventListener("touchend", handleChnageThemeBtn);
