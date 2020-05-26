const willGetYouADog = new Promise((resolve, reject) => {
  //reject(); //if we check the willGetYouADog const from the console, you will see that PromiseStatus of this promise set to "rejected"
  //resolve(); //if we check the willGetYouADog const from the console, you will see that PromiseStatus of this promise set to "resolved"
  const rand = Math.random();
  if (rand < 0.5) {
    resolve();
  } else {
    reject();
  }
});

//how to interact with promişes: resolve
willGetYouADog.then(() => {
  console.log("YAY WE GOT A DOG !!!");
});

//how to interact with promişes: reject
willGetYouADog.catch(() => {
  console.log(":( NO DOG !!!");
});

//Thats possible to define all at once
const willGetYouACat = new Promise((resolve, reject) => {
  const rand = Math.random();
  if (rand < 0.5) {
    resolve();
  } else {
    reject();
  }
})
  .then(() => {
    console.log("YAY WE GOT A CAT !!!");
  })
  .catch(() => {
    console.log(":( NO CAT !!!");
  });

const willGetYouABird = new Promise((resolve, reject) => {
  //it takes 3 secs to resolve or reject a promise (for simulating the processes takes time)
  setTimeout(() => {
    const rand = Math.random();
    if (rand < 0.5) {
      resolve();
    } else {
      reject();
    }
  }, 1000);
})
  .then(() => {
    console.log("YAY WE GOT A BIRD !!!");
  })
  .catch(() => {
    console.log(":( NO BIRD !!!");
  });

//** RETURNING PROMISES FROM FUNCTIONS */
const makeDogPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rand = Math.random();
      if (rand < 0.5) {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
};

makeDogPromise()
  .then(() => {
    console.log(":) - YAY WE GOT A DOG - :) !!!");
  })
  .catch(() => {
    console.log(":( - NO DOG - :( !!!");
  });

//** RESOLVING/REJECTING PROMISES WITH PARAMETERS (to let known why its rejected or resolved etc.) */
const fakeRequest = url => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rand = Math.random();
      if (rand < 0.7) {
        resolve({ status: 200, ack: "Nothing" }, "Leuven", 3000);
      } else {
        reject({ status: 404 });
      }
    }, 2000);
  });
};

fakeRequest()
  .then((statusObj, city, pcode) => {
    console.log(`REQUEST WORKED ${statusObj.status}  ${city},  ${pcode}`); //!!! BE CAREFUL, ONLY FIRST PARAMETER WORKS!!!
  })
  .catch(res => {
    console.log(res.status);
    console.log("REQUEST FAILED!");
  });

const fakeRequest2 = url => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const pages = {
        "/users": [
          { id: 1, username: "Bilbo" },
          { id: 5, username: "Esmerelda" }
        ],
        "/about": "This is the about page!",
        "/login": { a: 1, b: 2 }
      };
      const data = pages[url];
      if (data) {
        resolve({ status: 200, data });
      } else {
        reject({ status: 404 });
      }
    }, 2000);
  });
};

//res object should contain all the parameters inside an object (etc. "res"). YOu CANNOT SEND/RECEIVE MORE THAN ONE PARAMETER IN RESOLVE OR REJECT
fakeRequest2("/users")
  .then(res => {
    console.log("Status Code:", res.status);
    console.log("Data:", res.data);
    console.log("REQUEST WORKED");
  })
  .catch(res => {
    console.log(res.status);
    console.log("REQUEST FAILED!");
  });

// if we call fakeRequest2("users") ---> the promise will be rejected, because "users" is a wrong url, not in the pages object
fakeRequest2("users")
  .then(res => {
    console.log("Status Code:", res.status);
    console.log("Data:", res.data);
    console.log("REQUEST WORKED");
  })
  .catch(res => {
    console.log(res.status);
    console.log("REQUEST FAILED!");
  });
