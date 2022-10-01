import icons from "url:../../images/icons.svg";
const successMsgs = [
  "👍",
  "👏",
  "🤘",
  "👌",
  "😻",
  "😀",
  "😃",
  "😎",
  "🤓",
  "🥂",
];
const errorMsgs = [
  "👎",
  "👅",
  "😂",
  "😬",
  "🤭",
  "😑",
  "🙄",
  "😹",
  "🙈",
  "🤔",
  "🤨",
  "💩",
];

export const toggleAudio=(audio)=>{
  const btn = document.querySelector(".btn-audio");
  if(audio.volume === 0 ) {
    audio.volume = 1
    btn.textContent = "🔊";
    btn.removeAttribute("style")
  
  }else{
    audio.volume= 0
    btn.textContent = "🔇";
    btn.style.backgroundColor = " rgba(205, 79, 240, 0.568)"
    
  }


}

export const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min));

export function generateRandomColor(brightness = "all") {
  let additional = brightness === "light" ? 1 : 0;
  const divisor = brightness !== "all" ? 2 : 1;
  const red = Math.floor(((additional + Math.random()) * 256) / divisor);
  const green = Math.floor(((additional + Math.random()) * 256) / divisor);
  const blue = Math.floor(((additional + Math.random()) * 256) / divisor);
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}
export function renderSpinner(parentElement) {
  const markup = `<div class='spinner'>
    <svg><use href='${icons}#icon-loader'></use></svg>
    </div>`;
  parentElement.insertAdjacentHTML("afterbegin", markup);
}

export function removeSpinner(parentElement) {
  parentElement.querySelector(".spinner").remove();
}

export const startTimer = function (el) {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    el.textContent = `${min}:${sec}`;
    time++;
  };
  let time = 0;
  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

export function displayMsg(e, type = "success", sec) {
  const msg =
    type === "error"
      ? errorMsgs[generateRandomNumber(0, errorMsgs.length - 1)]
      : successMsgs[generateRandomNumber(0, successMsgs.length - 1)];
  const body = document.querySelector("body");

  const markup = `<div class="msg msg--${type}"> ${msg} </div>`;
  const positions = {
    top: `${e.point.y}px`,
    left: `${e.point.x}px`,
  };
  body.insertAdjacentHTML("afterbegin", markup);
  const msgEl = document.querySelector(".msg");
  Object.assign(msgEl.style, positions);
  setTimeout(() => {
    msgEl.remove();
  }, sec * 1000);
}
