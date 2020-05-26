document.querySelector("form").addEventListener("submit", event => {
  event.preventDefault();

  const { value } = document.querySelector("input");

  const header = document.querySelector("h1");

  if (value.includes("@")) {
    //must be valid
    header.innerHTML = "Looks Good";
  } else {
    //must be invalid
    header.innerHTML = "Invalid email!!!";
  }
});

//faked-up variable to check for all the script file loaded or not from index.html
//BUT THIS SOLUTION MUST BE IMPLEMENTED INSIDE THE JSDOM
window.stuffLoaded = true;
