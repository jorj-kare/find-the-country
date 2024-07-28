import {
  displayMsg,
  generateRandomColor,
  generateRandomNumber,
  startTimer,
} from "./utilities";
import soundS1 from "url:../../sounds/cash-register-purchase-87313.mp3";
import soundS2 from "url:../../sounds/claps-44774.mp3";
import soundS3 from "url:../../sounds/clean-fast-swooshaiff-14784.mp3";
import soundS4 from "url:../../sounds/sound-effects-finger-snap-with-reverb-113861.mp3";
import soundS5 from "url:../../sounds/success-1-6297.mp3";
import soundS6 from "url:../../sounds/button-pressed-38129.mp3";
import soundS7 from "url:../../sounds/microwave-timer-bright-design-microwave-oven-ping-timer-117077.mp3";
import soundS8 from "url:../../sounds/claps-few-people-100606.mp3";
import soundS9 from "url:../../sounds/wow-male-voice-65342.mp3";
import soundF1 from "url:../../sounds/videogame-death-sound-43894.mp3";
import soundF2 from "url:../../sounds/windows-error-sound-effect-35894.mp3";
import soundF3 from "url:../../sounds/surprised-child-voice-sound-113127.mp3";
import soundF4 from "url:../../sounds/possessed-laugh-94851.mp3";
import soundF5 from "url:../../sounds/laughing-man-meme-117725.mp3";
import soundF6 from "url:../../sounds/buzzer-or-wrong-answer-20582.mp3";
import soundF7 from "url:../../sounds/break_robot-61522.mp3";
import soundF8 from "url:../../sounds/wah-wah-sad-trombone-6347.mp3";
import winGameSound from "url:../../sounds/Space Is The Place.mp3";
const infoEl = document.querySelector(".info");
const infoText = document.querySelector(".info__text");
const timerEl = document.querySelector(".info__timer");
const endGame = document.querySelector(".info__btn");
const successSounds = [
  soundS1,
  soundS2,
  soundS3,
  soundS4,
  soundS5,
  soundS6,
  soundS7,
  soundS8,
  soundS9,
];
const failSounds = [
  soundF1,
  soundF2,
  soundF3,
  soundF4,
  soundF5,
  soundF6,
  soundF7,
  soundF8,
];
const playRandomSound = async (audioArray, audio) => {
  try {
    console.log(audio.volume);

    audio.src = audioArray[generateRandomNumber(0, audioArray.length - 1)];

    audio.play();
  } catch (err) {
    console.log(err);
  }
};

const winGame = async (audio) => {
  audio.src = winGameSound;
  if (audio.src) audio.play();
  const markup = `<div class="win"><h1>Congratulations!!!</h1></div> <div class="firework"></div>
        <div class="firework"></div>
        <div class="firework"></div>`;
  document.querySelector("body").insertAdjacentHTML("afterend", markup);
};

const getRandomCountry = (countriesData, timer, audio) => {
  if (countriesData.length < 1) {
    winGame(audio);
    clearInterval(timer);
  }
  const i = generateRandomNumber(0, countriesData.length - 1);
  const randomCountry = countriesData[i];
  countriesData.splice(i, 1);
  return randomCountry;
};

const displayInfo = () => {
  infoEl.style.display = "flex";
};

export function countryOnClick(map, countriesData, audio) {
  displayInfo();
  const countries = countriesData;
  let timer = startTimer(timerEl);
  let countryToFind = getRandomCountry(countries, timer, audio);
  infoText.textContent = countryToFind.properties.ADMIN;
  let randomColor = generateRandomColor("dark");
  const layers = map.getStyle().layers;
  if (!layers) return;
  console.log(111);
  layers.forEach((l) =>
    map.on("click", l.id, (e) => {
      const clickedCountry = e.features[0].properties.ISO_A3;
      if (countryToFind.properties.ISO_A3 === clickedCountry) {
        clearInterval(timer);
        playRandomSound(successSounds, audio);
        map.setPaintProperty(
          e.features[0].properties.ISO_A3,
          "fill-color",
          randomColor
        );
        displayMsg(e, "success", 2.5);
        countryToFind = getRandomCountry(countries, timer, audio);
        randomColor = generateRandomColor("light");
        setTimeout(() => {
          if (!countryToFind) return;
          infoText.textContent = `${countryToFind.properties.ADMIN}`;
          timer = startTimer(timerEl);
        }, 2000);
      } else {
        if (
          l.id === "admin-0-boundary-bg" ||
          l.id === "admin-0-boundary" ||
          l.id === "water"
        )
          return;
        displayMsg(e, "error", 2.5);
        playRandomSound(failSounds, audio);
      }
    })
  );
  endGame.addEventListener("click", () => {
    if (confirm("Are you sure you want to end the game?"))
      window.location.reload();
  });
}
