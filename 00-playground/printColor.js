const colors = [
  "blue",
  "red",
  "orange",
  "pink",
  "yellow",
  "green",
  "purple",
  "indigo",
  "violet"
];

/*
const printColor = box => {
  console.log(box.style.backgroundColor);
};

const container = document.querySelector("#boxes");

for (let color of colors) {
  const box = document.createElement("div");
  box.style.backgroundColor = color;
  box.classList.add("box");
  container.appendChild(box);
  //box.addEventListener("click", printColor(box));  //IMPORTANT! DOES NOT WORK!!!
  //box.addEventListener("click", printColor);  //SHOULD BE LIKE THAT!! BUT WE NEED TO PASS PARAMETER
  box.addEventListener("click", () => {
    printColor(box);
  });
}
*/

//******** REFACTORED USING "this"  */

// const printColor = function() {
//   //console.log(this.style.backgroundColor); //this refers to each div(box) clicked!!!
//   const h1 = document.querySelector("h1");
//   h1.style.color = this.style.backgroundColor;
// };

//if we put any parameters inside a function definition, and if this function is called when the mouse click event then we can put e or event parameter as a default
const printColor = function(e) {
  //console.log(this.style.backgroundColor); //this refers to each div(box) clicked!!!
  console.log(e);
  const h1 = document.querySelector("h1");
  h1.style.color = this.style.backgroundColor;
};

const container = document.querySelector("#boxes");

for (let color of colors) {
  const box = document.createElement("div");
  box.style.backgroundColor = color;
  box.classList.add("box");
  container.appendChild(box);
  box.addEventListener("click", printColor);
}

document.body.addEventListener("keypress", e => {
  console.log(e);
});
