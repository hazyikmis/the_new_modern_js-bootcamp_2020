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
