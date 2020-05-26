//this file added for testing web projects
const path = require("path");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const render = async filename => {
  const filePath = path.join(process.cwd(), filename);

  const dom = await JSDOM.fromFile(filePath, {
    runScripts: "dangerously",
    resources: "usable"
  });

  //dom.window.document.addEventListener("DOMContentLoaded", () => {
  //  console.log("All done loading!!!");
  //});

  //return dom;

  return new Promise((resolve, reject) => {
    dom.window.document.addEventListener("DOMContentLoaded", () => {
      resolve(dom); //returns dom
    });
  });
};

module.exports = render;
