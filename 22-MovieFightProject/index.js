const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
      <img src="${imgSrc}"/>
      ${movie.Title} (${movie.Year})
    `;
  },
  //removed, because we need to write down both of the sides, and we don't know which side
  // onOptionSelect(movie) {
  //   document.querySelector(".tutorial").classList.add("is-hidden");
  //   onMovieSelect(movie);
  // },
  inputValue(movie) {
    return movie.Title;
  },
  async fetchData(searchTerm) {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "68bb38de",
        //s: "avengers",
        //i: "tt0468569"
        s: searchTerm
      }
    });
    if (response.data.Error) {
      return [];
    }
    return response.data.Search;
  }
};

createAutoComplete({
  root: document.querySelector("#left-autocomplete"),
  ...autoCompleteConfig,
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    //onMovieSelect(movie);
    onMovieSelect(movie, document.querySelector("#left-summary"), "left");
  }
});

createAutoComplete({
  root: document.querySelector("#right-autocomplete"),
  ...autoCompleteConfig,
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    //onMovieSelect(movie);
    onMovieSelect(movie, document.querySelector("#right-summary"), "right");
  }
});

let leftMovie;
let rightMovie;

//const onMovieSelect = async movie => {
const onMovieSelect = async (movie, summaryElement, side) => {
  //console.log(movie);
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "68bb38de",
      //s: "avengers",
      i: movie.imdbID
    }
  });

  //console.log(response.data);
  //document.querySelector("#summary").innerHTML = movieTemplate(response.data);
  summaryElement.innerHTML = movieTemplate(response.data);

  if (side === "left") {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie) {
    runComparison();
  }
};

const runComparison = () => {
  //document.querySelector("#left-summary").querySelectorAll(".notification")
  const leftSideStats = document.querySelectorAll(
    "#left-summary .notification"
  );
  const rightSideStats = document.querySelectorAll(
    "#right-summary .notification"
  );
  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];
    //console.log(leftStat, rightStat);
    const leftStatValue = parseInt(leftStat.dataset.value); //this retrieves the "data-value" of each article (html object)
    const rightStatValue = parseInt(rightStat.dataset.value); //this retrieves the "data-value" of each article (html object)
    if (rightStatValue > leftStatValue) {
      leftStat.classList.remove("is-primary");
      leftStat.classList.add("is-warning");
    } else {
      rightStat.classList.remove("is-primary");
      rightStat.classList.add("is-warning");
    }
  });
};

const movieTemplate = movieDetail => {
  const dollars = parseInt(
    movieDetail.BoxOffice.replace(/\$/g, "").replace(/,/g, "")
  );
  //console.log(dollars);
  const metascore = parseInt(movieDetail.Metascore);
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ""));
  //console.log(metascore, imdbRating, imdbVotes);

  /*
  let awardCount = 0;
  const awards = movieDetail.Awards.split(" ").forEach(word => {
    const value = parseInt(word);
    if (isNaN(value)) {
      return;
    } else {
      awardCount = awardCount + value;
    }
  });
  console.log(awardCount);
*/

  const awardsCount = movieDetail.Awards.split(" ").reduce((prev, word) => {
    const value = parseInt(word);
    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
  }, 0);
  console.log(awardsCount);

  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
    <article data-value=${awardsCount} class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article data-value=${dollars} class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">BoxOffice</p>
    </article>
    <article data-value=${metascore} class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article data-value=${imdbRating} class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value=${imdbVotes} class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};
