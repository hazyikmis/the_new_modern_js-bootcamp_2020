const fetchData = async searchTerm => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "68bb38de",
      //s: "avengers",
      //i: "tt0468569"
      s: searchTerm
    }
  });
  console.log(response.data);
};

const input = document.querySelector("input");
// input.addEventListener("input", event => {
//   fetchData(event.target.value);
// });

//const debounce = func => {
//const debounce = (func, delay) => {
const debounce = (func, delay = 1000) => {
  let timeoutId;
  //return (arg1, arg2, arg3) => {
  return (...args) => {
    //console.log(args);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      //func(arg1, arg2, arg3);
      func.apply(null, args);
    }, delay);
    //}, delay || 1000);
    //}, 1000);
  };
};

/*
let timeoutId;
const onInput = event => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    fetchData(event.target.value);
  }, 1000);
};

*/
/*
const onInput = debounce(event => {
  fetchData(event.target.value);
});

input.addEventListener("input", onInput);
*/

const onInput = event => {
  fetchData(event.target.value);
};

//input.addEventListener("input", debounce(onInput));
input.addEventListener("input", debounce(onInput, 500));
