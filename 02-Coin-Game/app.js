const moveStep = 50;

function isTouching(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}

const avatar = document.querySelector("#player");
const coin = document.querySelector("#coin");

window.addEventListener("keyup", function(e) {
  if (e.key === "ArrowDown" || e.key === "Down") {
    moveVertical(avatar, moveStep);
  } else if (e.key === "ArrowUp" || e.key === "Up") {
    moveVertical(avatar, -moveStep);
  } else if (e.key === "ArrowRight" || e.key === "Right") {
    moveHorizontal(avatar, moveStep);
    avatar.style.transform = "scale(1, 1)"; //image turns right
  } else if (e.key === "ArrowLeft" || e.key === "Left") {
    moveHorizontal(avatar, -moveStep);
    avatar.style.transform = "scale(-1, 1)"; //image turns left
  }
  if (isTouching(avatar, coin)) moveCoin();
});

const moveVertical = (element, amount) => {
  const curTop = extractPos(element.style.top); //200px --> 200 (removes "px")
  element.style.top = `${curTop + amount}px`;
};

const moveHorizontal = (element, amount) => {
  const curLeft = extractPos(element.style.left); //200px --> 200 (removes "px")
  element.style.left = `${curLeft + amount}px`;
};

//"200px" --> 200 (removes "px" and converts to int)
//const extractPos = (pos = "0px") => parseInt(pos.slice(0, -2)); //default value for pos = "0px"
//THE FUNCTION ABOVE DO NOT WORKS!!! BECAUSE pos PARAMETER'S VALUE IS EMPTY STRING AT THE BEGINNING, MEANS NOT NULL, SO IT NEVER USES THE DEFAULT VALUE
const extractPos = pos => {
  if (!pos) return 0; //if pos === "" (empty string)
  return parseInt(pos.slice(0, -2));
};

const moveCoin = () => {
  const x = Math.floor(Math.random() * window.innerWidth);
  const y = Math.floor(Math.random() * window.innerHeight);
  coin.style.top = `${y}px`;
  coin.style.left = `${x}px`;
};

moveCoin();
