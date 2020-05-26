//module.exports = (req) => {
//module.exports = ({req}, arg1, arg2, arg3) => {
//the methods above are not a good approach! Combine all args into one "req" object from the sender side
//and send them all as an unique "req" object, and finally de-structure that object here!

module.exports = () => {
  //If we send the snipplet below, the browser automatically adds other HTML tags, like <body><head> etc...
  // return `
  //   <div>
  //     <form method="POST">
  //       <input name="email" placeholder="email" />
  //       <input name="password" placeholder="password" />
  //       <button>Sign In</button>
  //     </form>
  //   </div>
  // `;

  //BUT THE CODE BELOW IS NOT A GOOD STRATEGY... WE GONNA REPEAT CODES IN EACH .JS
  //CHECK the 12.Layout.JPG
  return `
  <!DOCTYPE html>
  <html>
    <head></head>
    <body>
      <div>
        <form method="POST">
          <input name="email" placeholder="email" />
          <input name="password" placeholder="password" />
          <button>Sign In</button>
        </form>
      </div>
    </body>
  </html>
`;
};
