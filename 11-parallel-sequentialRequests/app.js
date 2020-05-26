//SEQUENTIAL REQUESTS
async function get3Pokemon() {
  //The promises below actually no need to wait one the other
  //None of them depends on the others' outcome
  const poke1 = await axios.get("https://pokeapi.co/api/v2/pokemon/1");
  const poke2 = await axios.get("https://pokeapi.co/api/v2/pokemon/2"); //waits for completion of the above call
  const poke3 = await axios.get("https://pokeapi.co/api/v2/pokemon/3"); //waits for completion of the above call
  console.log(poke1.data);
  console.log(poke2.data);
  console.log(poke3.data);
}

get3Pokemon();

//** BETTER WAY OF HANDLING THE ISSUE OF RUNNING PROMISES PARALLEL MANNER IS LIKE THAT : */
//PARALLEL REQUESTS
async function get3Pokemon2() {
  const promise1 = axios.get("https://pokeapi.co/api/v2/pokemon/1");
  const promise2 = axios.get("https://pokeapi.co/api/v2/pokemon/2"); // does not wait for completion of the above call
  const promise3 = axios.get("https://pokeapi.co/api/v2/pokemon/3"); // does not wait for completion of the above call
  //Here, all requests sent...but promises belongs to these requests might or might not be resolved!!!
  console.log(promise1);
  const poke1 = await promise1;
  const poke2 = await promise2;
  const poke3 = await promise3;
  console.log(promise1);
  //Here, we are sure that all promises resolved (we are not caring about rejecting currently :) )
  //Because of the awaits just above
  console.log(poke1.data);
  console.log(poke2.data);
  console.log(poke3.data);
}

get3Pokemon2();

//** The problem above is, we are still awaiting each promise INDIVIDUALLY to complete, AND also we have an UGLY code!!! */
//Here is the better way (awaiting ALL with using Promise.all):
async function get3Pokemon3() {
  const promise1 = axios.get("https://pokeapi.co/api/v2/pokemon/1");
  const promise2 = axios.get("https://pokeapi.co/api/v2/pokemon/2"); // does not wait for completion of the above call
  const promise3 = axios.get("https://pokeapi.co/api/v2/pokemon/3"); // does not wait for completion of the above call
  const results = await Promise.all([promise1, promise2, promise3]);
  //console.log(results);
  printPokemon(results);
}

function printPokemon(results) {
  for (let poke of results) {
    console.log(poke.data.name);
  }
}

get3Pokemon3();
