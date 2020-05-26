//const createAutoComplete = config => {
//const createAutoComplete = ({ root }) => {
const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData
}) => {
  //const root = document.querySelector(".autocomplete");
  root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
  `;

  // const input = document.querySelector("input");
  // const dropdown = document.querySelector(".dropdown");
  // const resultsWrapper = document.querySelector(".results");
  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  const onInput = async event => {
    //fetchData(event.target.value);
    //const movies = await fetchData(event.target.value);
    //console.log(movies);
    const items = await fetchData(event.target.value);

    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    resultsWrapper.innerHTML = "";
    dropdown.classList.add("is-active");
    //for (let movie of items) {
    for (let item of items) {
      const option = document.createElement("a");
      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);

      option.addEventListener("click", () => {
        //close the list
        //write the clicked move name inside the input
        //do another request for detailed info about the movie
        //get data
        //render data
        dropdown.classList.remove("is-active");
        //input.value = movie.Title;
        input.value = inputValue(item);
        //onMovieSelect(movie);
        onOptionSelect(item);
      });

      //document.querySelector(".results").appendChild(option);
      resultsWrapper.appendChild(option);
    }
  };

  //debounce function defined in/moved to utils.js
  input.addEventListener("input", debounce(onInput, 500));

  document.addEventListener("click", event => {
    //console.log(event.target);
    //if the user clicks somewhere/item that is not contained by root (dropdown menu -> .autocomplete div)
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
