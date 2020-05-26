const waitFor = selector => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (document.querySelector(selector)) {
        clearInterval(interval);
        clearTimeout(timeout);
        resolve();
      }
    }, 30);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      reject();
    }, 2000);
  });
};

beforeEach(() => {
  document.querySelector("#target").innerHTML = "";
  createAutoComplete({
    root: document.querySelector("#target"),
    fetchData() {
      return [
        { Title: "Avengers" },
        { Title: "Not Avengers" },
        { Title: "Some Other Movie" }
      ];
    },
    renderOption(movie) {
      return movie.Title;
    }
  });
});

it("Dropdown starts closed", () => {
  const dropdown = document.querySelector(".dropdown");

  //...not real
  //assert.strictEquals(dropdown.className, "dropdown");
  //..."assert" library cannot accessible from inside the browser. It's a nodejs library.
  //...we need an assertion like this above. Here is the "Chai" comes into play.
  expect(dropdown.className).not.to.include("is-active");
});

/*
it("After searching, dropdown opens up", () => {
  const input = document.querySelector("input");
  input.value = "avengers";
  input.dispatchEvent(new Event("input"));

  //this test fails. Because there is a 500msec delay in the dropdown, 
  //after each input, it checks at least 500msec waiting.
  //Because of that, when the test runs, there is no dropdown...
  //So -> "await waitFor(...)" is used, as shown in the next below
  const dropdown = document.querySelector(".dropdown");
  expect(dropdown.className).to.include("is-active");
});
*/

it("After searching, dropdown opens up", async () => {
  const input = document.querySelector("input");
  input.value = "avengers";
  input.dispatchEvent(new Event("input"));

  await waitFor(".dropdown-item");

  const dropdown = document.querySelector(".dropdown");
  expect(dropdown.className).to.include("is-active");
});

it("After searching, display some results", async () => {
  const input = document.querySelector("input");
  input.value = "avengers";
  input.dispatchEvent(new Event("input"));

  await waitFor(".dropdown-item");

  const items = document.querySelectorAll(".dropdown-item");
  expect(items.length).to.equal(3);
});
