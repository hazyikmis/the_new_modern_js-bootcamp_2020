const creditCardInput = document.querySelector("#cc");
const termsCheckbox = document.querySelector("#terms");
const veggieSelect = document.querySelector("#veggie");

const formData = {};

// creditCardInput.addEventListener("input", e => {
//   //console.log("cc changed", creditCardInput.value);
//   console.log("cc changed", e.target.value);
//   formData["cc"] = e.target.value;
// });

// veggieSelect.addEventListener("input", e => {
//   //console.log("cc changed", veggieSelect.value);
//   console.log("veggie changed", e.target.value);
//   formData["veggie"] = e.target.value;
// });

// termsCheckbox.addEventListener("input", e => {
//   //console.log("cc changed", termsCheckbox.checked);
//   console.log("terms changed", e.target.checked);
//   formData["terms"] = e.target.checked;
// });

/** HERE IS THE BEAUTIFUL WAY OFF ADDING EVENT LISTENER TO MULTIPLE INPUTS RATHER THAN USING THE CODES ABOVE !!! */
/*
for (let input of [creditCardInput, termsCheckbox, veggieSelect]) {
  //NOTE: We can also use "e.target" in place of "input"  (they are the same inputs)
  input.addEventListener("input", e => {
    console.log(
      `${input.id} changed`,
      input.type === "checkbox" ? input.checked : input.value
    );
    formData[input.id] =
      input.type === "checkbox" ? input.checked : input.value;
  });
}
*/

/** BETTER! */
for (let input of [creditCardInput, termsCheckbox, veggieSelect]) {
  //input.addEventListener("input", ({target}) => {  // destructuring e, e.target
  //  const { id, type, value, checked } = target;
  input.addEventListener("input", e => {
    const { id, type, value, checked } = input; // = e.target
    console.log(`${id} changed`, type === "checkbox" ? checked : value);
    formData[input.id] = type === "checkbox" ? checked : value;
    console.log(formData);
  });
}
