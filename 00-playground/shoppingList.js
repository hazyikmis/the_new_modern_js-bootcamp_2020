const input = document.querySelector("#shopItem");
const shoppingListUL = document.querySelector("ul");

//input.addEventListener("keypress", e => {    // PROBLEM!!!: CANNOT USE "this" INSIDE THE FUNCTION
input.addEventListener("keypress", function(e) {
  //console.log(e);
  //console.log(input.value);
  if (e.key === "Enter") {
    if (!input.value) return; //empty string returns a FALSY value!!!
    if (input.value.trim().toUpperCase() === "CLEAR") {
      shoppingListUL.innerHTML = ""; //removes all childs
      this.value = "";
      return;
    }
    const newItemLI = document.createElement("li");
    //newItemLI.innerText = input.value; //thats ok but better to use "this"
    newItemLI.innerText = this.value;
    shoppingListUL.appendChild(newItemLI);
    //input.value = "";  //thats ok but better to use "this"
    this.value = "";
  }
});
