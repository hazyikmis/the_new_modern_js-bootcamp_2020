const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const circle = document.querySelector("circle");

const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", perimeter);
let currentOffset = 0;
let arcOffset;
//const arcOffset = 1;
//const arcOffset = (perimeter / durationInput.value) * 0.05;
//console.log(arcOffset);

//const timer = new Timer(durationInput, startButton, pauseButton);
//calling timer function with some callbacks()!
const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart() {
    console.log("Timer Started!");
    arcOffset = (perimeter / durationInput.value) * 0.05;
  },
  onTick() {
    //console.log("Timer just ticked down!");
    circle.setAttribute("stroke-dashoffset", currentOffset);
    currentOffset = currentOffset - arcOffset;
  },
  onComplete() {
    console.log("Timer is completed!");
  }
});
