const firstReq = new XMLHttpRequest();

firstReq.addEventListener("load", function() {
  console.log("IT WORKED.");
  //const data = JSON.parse(firstReq.responseText); //If I would use arrow function
  const data = JSON.parse(this.responseText);
  console.log(data);
  //if we want to make some tasks based on this data, here is the place.
  //for ex. we can make another request (like below)
});
firstReq.addEventListener("error", function(e) {
  console.log("ERROR!!!");
});

//same functionality with the ones above
// firstReq.onload = function() {
//   console.log("IT WORKED.");
//   const data = JSON.parse(this.responseText);
//   console.log(data);
// };
// firstReq.onerror = function(e) {
//   console.log("ERROR!!!");
// };

firstReq.open("GET", "https://swapi.co/api/planets");
firstReq.send();
console.log("Request Sent!");

//** CALLING MULTIPLE REQUESTS (CHAINING) */
//here are 2 requests. 1st one is the outer one (planetReq)
//and the 2nd one is the inner one (filmReq), called according to the data returned from 1st request
//PLEASE NOTICE: NESTED CALL. Because of this nestedness, its hard to follow/understand the code
const planetReq = new XMLHttpRequest();
planetReq.addEventListener("load", function() {
  console.log("FIRST REQUEST (PLANET) WORKED!!!");
  const planetData = JSON.parse(this.responseText);
  const filmURL = planetData.results[0].films[0];
  const filmReq = new XMLHttpRequest();

  filmReq.addEventListener("load", function() {
    console.log("SECOND REQUEST (FILM) WORKED!!!");
    const filmData = JSON.parse(this.responseText);
    console.log(filmData);
  });
  filmReq.addEventListener("error", function(e) {
    console.log("ERROR!!!", e);
  });
  filmReq.open("GET", filmURL);
  filmReq.send();
});
planetReq.addEventListener("error", e => {
  console.log("ERROR!!!", e);
});
planetReq.open("GET", "https://swapi.co/api/planets");
planetReq.send();

//** FETCH API */
//simplest example
fetch("https://swapi.co/api/planets").then(response => {
  console.log("FETCH request sent:");
  //console.log(response); //not readable
  console.log(response.json()); //response.json() creates another promise
});

//extracting the data from fetch response
fetch("https://swapi.co/api/planets").then(response => {
  response.json().then(data => {
    console.log(data);
  });
});

//extracting the data from fetch response - meaningful result - ADDITIONAL ERROR CHECKING
fetch("https://swapi.co/api/planets")
  //fetch("https://swapi.co/api/planetffffffffffffffffffts")
  .then(response => {
    //IMPORTANT: when 404 or 500 error occurs, fetch promise resolves normally without any error. (UNLIKE XMLHttpRequest)
    //Because of that, we need to check the "status" or "ok" if everything is normal
    if (!response.ok) {
      console.log("ERROR!!!! NOT STATUS: 200");
      //no error handling mechanism for this part
    } else {
      response.json().then(planetData => {
        for (let planet of planetData.results) {
          console.log(planet.name);
        }
      });
    }
  })
  .catch(err => {
    console.log("SOMETHING WENT WRONG WITH FETCH!", err);
  });

//extracting the data from fetch response - IMPROVED ADDITIONAL ERROR CHECKING
fetch("https://swapi.co/api/plandfdfets")
  //fetch("https://swapi.co/api/planetffffffffffffffffffts")
  .then(response => {
    //IMPORTANT: when 404 or 500 error occurs, fetch promise resolves normally without any error. (UNLIKE XMLHttpRequest)
    //Because of that, we need to check the "status" or "ok" if everything is normal
    if (!response.ok) throw new Error(`Error Status Code: ${response.status}`);
    //Now, we can handle the error in the catch part

    response.json().then(planetData => {
      for (let planet of planetData.results) {
        console.log(planet.name);
      }
    });
  })
  .catch(err => {
    console.log("SOMETHING WENT WRONG WITH FETCH!", err);
  });

//extracting the data from fetch response - IMPROVED ADDITIONAL ERROR CHECKING & IMPROVED NESTING
fetch("https://swapi.co/api/planets")
  .then(response => {
    if (!response.ok) throw new Error(`Error Status Code: ${response.status}`);

    return response.json();
  })
  .then(planetData => {
    for (let planet of planetData.results) {
      console.log(planet.name);
    }
  })
  .catch(err => {
    console.log("SOMETHING WENT WRONG WITH FETCH!", err);
  });

//extracting the data from fetch response - IMPROVED ADDITIONAL ERROR CHECKING & IMPROVED NESTING & CHAINING REQUESTS
//the code below is works as the same as the code between the lines 33-55 above
fetch("https://swapi.co/api/planets")
  .then(response => {
    if (!response.ok)
      throw new Error(
        `Error Requesting PLANETS Status Code: ${response.status}`
      );
    return response.json();
  })
  .then(planetData => {
    console.log(planetData.results[0].films[0]);
    const filmURL = planetData.results[0].films[0];
    return fetch(filmURL);
  })
  .then(response => {
    if (!response.ok)
      throw new Error(`Error Requesting FILMS Status Code: ${response.status}`);
    return response.json();
  })
  .then(filmData => {
    console.log(filmData);
  })
  .catch(err => {
    console.log("SOMETHING WENT WRONG WITH FETCH!", err);
  });

//** FETCHING ALL PLANETS */
fetch("https://swapi.co/api/planets")
  .then(response => {
    if (!response.ok)
      throw new Error(`Error Requesting Status Code: ${response.status}`);
    return response.json();
  })
  .then(planetData => {
    console.log("FETCHED ALL PLANETS - FIRST 10");
    for (let planet of planetData.results) {
      console.log(planet.name);
    }
    const nextURL = planetData.next;
    return fetch(nextURL);
  })
  .then(response => {
    if (!response.ok)
      throw new Error(`Error Requesting Status Code: ${response.status}`);
    return response.json();
  })
  .then(planetData => {
    console.log("FETCHED ALL PLANETS - NEXT 10");
    for (let planet of planetData.results) {
      console.log(planet.name);
    }
  })
  .catch(err => {
    console.log("SOMETHING WENT WRONG WITH FETCH!", err);
  });

//** FETCHING ALL PLANETS (MODULAR WAY) */
const checkStatusAndParse = response => {
  if (!response.ok)
    throw new Error(`Error Requesting Status Code: ${response.status}`);
  return response.json();
};

//BECAUSE OF CHAINING PROMISES, we need to define printPlanets like a function returns a promise
//Otherwise, we cannot chain it in then().then().then()...
const printPlanets = planetData => {
  console.log("x - FETCHED 10 MORE PLANETS");
  for (let planet of planetData.results) {
    console.log(planet.name);
  }
  // const p = new Promise((resolve, reject) => {
  //   resolve(planetData);
  // });
  // return p;
  //MORE EASIER WAY (creates new promise automatically):
  //return Promise.resolve(planetData);
  return Promise.resolve(planetData.next);
};

const fetchNextPlanets = url => {
  return fetch(url);
};

fetch("https://swapi.co/api/planets")
  //.then(response => checkStatusAndParse(response))
  .then(checkStatusAndParse)
  //.then(planetData => printPlanets(planetData))
  .then(printPlanets)
  //.then(url => fetchNextPlanets(url))
  .then(fetchNextPlanets)
  //.then(response => checkStatusAndParse(response))
  .then(checkStatusAndParse)
  //.then(planetData => printPlanets(planetData))
  .then(printPlanets)
  .catch(err => {
    console.log("x - SOMETHING WENT WRONG WITH FETCH!", err);
  });

//** IF WE MAKE MORE OPTIMIZATION */
//For example, assigning default value to "url" parameter in the "fetchNextPlanets" function
//And replace its name (to prevent duplication error) to "fetchPlanets"
//And start with this function, not "fetch"
const fetchPlanets = (url = "https://swapi.co/api/planets") => {
  return fetch(url);
};

fetchPlanets()
  .then(checkStatusAndParse)
  .then(printPlanets)
  .then(fetchPlanets)
  .then(checkStatusAndParse)
  .then(printPlanets)
  .then(fetchPlanets)
  .then(checkStatusAndParse)
  .then(printPlanets)
  .then(fetchPlanets)
  .then(checkStatusAndParse)
  .then(printPlanets)
  .catch(err => {
    console.log("x - SOMETHING WENT WRONG WITH FETCH!", err);
  });

//** AXIOS */
//in "fetch", you cannot directly access the data, first you need to convert it to json format
axios
  .get("https://swapi.co/api/planets")
  .then(res => {
    console.log(res.data); //you can directly access res.data as in json format, no need to convert it with res.json() and create another promise... as in FETCH
  })
  .catch(err => {
    console.log("IN CATCH!!!", err);
  });

axios
  .get("https://swapi.co/api/plakasldkahdklhalkdnets")
  .then(res => {
    console.log(res.data);
  })
  .catch(err => {
    console.log("IN CATCH!!!", err); //automatically goes here, no need to check res.ok - as in FETCH
  });

axios
  .get("https://swapi.co/api/planets")
  .then(({ data }) => {
    console.log(data);
    for (let planet of data.results) {
      console.log(planet.name);
    }
    return axios.get(data.next);
  })
  .then(({ data }) => {
    console.log(data);
    for (let planet of data.results) {
      console.log(planet.name);
    }
  })
  .catch(err => {
    console.log("IN CATCH!!!", err);
  });

//** MORE MODULAR AXIOS LIKE BETWEEN LINES 186-250 */
const fetchThePlanets = (url = "https://swapi.co/api/planets") => {
  return axios.get(url);
};

const printThePlanets = ({ data }) => {
  console.log(data);
  for (let planet of data.results) {
    console.log(planet.name);
  }
  return Promise.resolve(data.next);
};

fetchThePlanets()
  .then(printThePlanets)
  .then(fetchThePlanets)
  .then(printThePlanets)
  .then(fetchThePlanets)
  .then(printThePlanets)
  .then(fetchThePlanets)
  .then(printThePlanets)
  .catch(err => {
    console.log("IN CATCH!!!", err);
  });
