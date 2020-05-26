const layout = require("../layout");
const { getError } = require("../../helpers");
/*
module.exports = ({ errors }) => {
  return layout({
    content: `
      <form method="POST" enctype="application/x-www-form-urlencoded">
        <input name="title" placeholder="Title" />
        <input name="price" placeholder="Price" />
        <input name="image" type="file" />
        <button>Submit</button>
      </form>
  `
  });
};
*/

module.exports = ({ errors }) => {
  return layout({
    content: `
      <form method="POST" enctype="multipart/form-data">
        <input name="title" placeholder="Title" />
        ${getError(errors, "title")}
        <input name="price" placeholder="Price" />
        ${getError(errors, "price")}
        <input name="image" type="file" />
        <button>Submit</button>
      </form>
  `
  });
};
