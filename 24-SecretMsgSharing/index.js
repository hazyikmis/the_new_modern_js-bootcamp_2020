const { hash } = window.location;
//console.log(atob(hash.replace("#", "")));
const message = atob(hash.replace("#", ""));

if (message) {
  document.querySelector("#message-form").classList.add("hide");
  document.querySelector("#message-show").classList.remove("hide");

  document.querySelector("h1").innerHTML = message;
}

document.querySelector("form").addEventListener("submit", event => {
  event.preventDefault();

  document.querySelector("#message-form").classList.add("hide");
  document.querySelector("#link-form").classList.remove("hide");

  const input = document.querySelector("#message-input");
  const encryptedVal = btoa(input.value);
  //document.querySelector("#link-input").value = encryptedVal;
  const linkinput = document.querySelector("#link-input");
  linkinput.value = `${window.location}#${encryptedVal}`;
  linkinput.select();
});
