import { generateRandomColor, generateRandomNumber } from "./utilities";
const menu = document.querySelector(".menu");
const btnsEl = menu ? menu.querySelectorAll("button") : "";
export function menuBtnOnHover(e, map) {
  const btn = e.target.closest(".menu__btn");
  if (!btn) return;
  btn.style.background = generateRandomColor("dark");
  btn.style.opacity = 0.6;
  btn.style.color = "#eee";
  const coords = btn.dataset.coords.split(",");
  const zoom = btn.dataset.zoom;
  map.flyTo({
    center: coords,
    zoom: zoom,
    speed: 0.5,
    curve: 1,
    easing(t) {
      return t;
    },
    essential: true,
  });
}

export function menuBtnOnHoverOut(e) {
  const btn = e.target.closest(".menu__btn");
  if (!btn) return;
  btn.removeAttribute("style");
}

// For small devices where hoover does not apply
export const checkMediaQuery = (map, e) => {
  const mediaQuery = window.matchMedia("(max-width:600px)");

  if (mediaQuery.matches) {
    btnsEl.forEach((btn) => {
      // Set random background color to the buttons
      btn.style.backgroundColor = generateRandomColor("light");
      // Zoom to the continent of choice
      btn.addEventListener("click", (e) => {
        const coords = btn.dataset.coords.split(",");
        map.flyTo({
          center: coords,
          zoom: btn.dataset.zoom,
          speed: 0.5,
          curve: 1,
          easing(t) {
            return t;
          },
          essential: true,
        });
      });
    });
    // Creates animation effect
    const interval = setInterval(() => {
      if (!document.querySelector(".menu")) return clearInterval(interval);
      const btn = btnsEl[generateRandomNumber(0, btnsEl.length - 1)];
      const coords = btn.dataset.coords.split(",");
      const zoom = btn.dataset.zoom;
      map.flyTo({
        center: coords,
        zoom: zoom,
        speed: 0.2,
        curve: 1,
        easing(t) {
          return t;
        },
        essential: true,
      });
    }, 3000);
  } else {
    btnsEl.forEach((btn) => {
      btn.removeAttribute("style");
    });
  }
};

export function disableBtn() {
  btnsEl.forEach((btn) => btn.setAttribute("disabled", true));
}
