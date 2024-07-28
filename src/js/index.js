import { renderMap, renderPolygons } from "./modules/mapbox";
import { removeSpinner, renderSpinner, toggleAudio } from "./modules/utilities";
import {
  checkMediaQuery,
  disableBtn,
  menuBtnOnHover,
  menuBtnOnHoverOut,
} from "./modules/menu";
import { getContinentPolygons } from "./modules/fetchData";
import { countryOnClick } from "./modules/game";
import soundIntro from "url:../sounds/01 - India.mp3";
const audio = new Audio();
const mediaQuery = window.matchMedia("(max-width:600px)");
const menu = document.querySelector(".menu");
const btnAudio = document.querySelector(".btn-audio");
const map = renderMap();
window.addEventListener("load", (e) => {
  audio.volume = 0;
  audio.src = soundIntro;
});
btnAudio.addEventListener("click", (e) => {
  audio.play();
  toggleAudio(audio);
});

if (menu) {
  menu.addEventListener("mouseover", (e) => {
    menuBtnOnHover(e, map);
  });
  menu.addEventListener("mouseout", menuBtnOnHoverOut);

  menu.addEventListener("click", async function (e) {
    e.preventDefault();
    if (e.target.className !== "menu__btn") return;
    disableBtn();
    renderSpinner(menu);
    const continentName = e.target.value;
    const data = await getContinentPolygons(continentName);

    // For testing  purposes: limiting the number of thess countries
    // data.data.continent.countries.features.splice(
    //   1,
    //   data.data.continent.countries.features.length - 5
    // );
    // console.log(data.data.continent.countries.features);
    renderPolygons(map, data.data.continent.countries.features);
    removeSpinner(menu);
    menu.remove();
    setTimeout(() => {
      audio.pause();
    }, 1500);
    countryOnClick(map, data.data.continent.countries.features, audio);
  });
}
checkMediaQuery(map, mediaQuery);
mediaQuery.addEventListener("change", (e) => {
  checkMediaQuery(map, e);
});
