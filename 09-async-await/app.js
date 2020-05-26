/*
function getPlanets() {
  return axios.get("https://swapi.co/api/planets");
}

getPlanets().then(res => {
  console.log(res.data);
});
*/

//Here is the simplified version of the code above
async function getPlanets() {
  const res = await axios.get("https://swapi.co/api/planets");
  console.log(res.data); //only runs once the previous line is complete
  //it's assumed that axios promise is resolved
}

getPlanets();

//ADDING ERROR HANDLING TO ASYNC FUNCTIONS (for example, the function above)

//OPTION 1 - Adding catch block when calling the function (simplest way)
async function getPlanets2() {
  const res = await axios.get("https://swapi.co/api/planetssssssssssssssssss");
  console.log(res.data); //only runs once the previous line is complete
  //it's assumed that axios promise is resolved
}

getPlanets2().catch(err => {
  console.log("SOMETHING WENT WRONG:", err);
});

//OPTIONS 2 - using try-catch inside the async function
async function getPlanets3() {
  try {
    const res = await axios.get(
      "https://swapi.co/api/planetssssssssssssssssss"
    );
    console.log(res.data); //only runs once the previous line is complete
  } catch (err) {
    console.log("x - SOMETHING WENT WRONG:", err);
  }
}

getPlanets3();
