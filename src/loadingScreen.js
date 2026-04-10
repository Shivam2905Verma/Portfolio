import { LoadingManager } from "three";
import gsap from "gsap";
import { introAnimation } from "./animationFunctions";
import { videoElement } from "./loadModel";
import { backgroundMusic } from "./main";

export const manager = new LoadingManager();

const loading = document.querySelector(".loading");
const loadingState = document.querySelector(".loadingState");
const enterBtn = document.querySelector(".enter-btn");
const entry = document.querySelector(".entry");
const welcome = document.querySelector(".welcome");

manager.onLoad = function () {
  loadingState.style.display = "none";
  enterBtn.style.display = "block";
};

loading.addEventListener("click", (e) => {
  e.stopPropagation();
  e.preventDefault();
});

enterBtn.addEventListener("click", () => {
  backgroundMusic();
  const t1 = gsap.timeline({
    defaults: {
      ease: "back.out(1.8)",
      duration: 1,
    },
  });
  t1.to(loading, {
    background: "#ebd7ee",
    onStart: () => {
      entry.style.display = "none";
      welcome.style.display = "block";
      welcome.style.opacity = 1;
    },
  })
    .to(loading, {
      scale: 0.7,
    })
    .to(loading, {
      rotateZ: 15,
    })
    .to(loading, {
      bottom: "-150%",
      onComplete: () => {
        introAnimation();
        videoElement.play();
        loading.remove();
      },
    });
});
