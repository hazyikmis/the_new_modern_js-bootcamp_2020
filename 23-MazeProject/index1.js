// initialization of MATTER.JS  -- begin
const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  Body, //used for changing properties of body objects (for ex: getting & changing velocity of a body)
  Events //used for detecting events (for ex: collision of bodies)
  //the 2 types below required for click-and-drag-of-shapes functionality
  //Mouse,
  //MouseConstraint
} = Matter;

//rectangular maze is far more easier to implement
const width = 600;
const height = 600;
const cells = 5; //number of cells in a row or column

const borderWallWidth = 2; //outer walls
const innerWallWidth = 5;

const unitLength = width / cells; //unitWidth & unitHeight of each cell

const engine = Engine.create();
engine.world.gravity.y = 0; //to disable gravity

const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    // width: 800,
    // height: 600
    width,
    height
    //wireframes: false //for solid shapes with colors picked up randomly (default-> wireframes: true)
  }
});
Render.run(render);
Runner.run(Runner.create(), engine);

//adding click-and-drag-of-shapes functionality
// World.add(
//   world,
//   MouseConstraint.create(engine, {
//     mouse: Mouse.create(render.canvas)
//   })
// );
// initialization of MATTER.JS  -- end

// test of adding simple shape
// const shape = Bodies.rectangle(200, 200, 50, 50, {
//   isStatic: true
// });
// World.add(world, shape);

//Adding Border Walls - begin
const walls = [
  Bodies.rectangle(width / 2, 0, width, borderWallWidth, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, borderWallWidth, {
    isStatic: true
  }),
  Bodies.rectangle(0, height / 2, borderWallWidth, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, borderWallWidth, height, {
    isStatic: true
  })
];
World.add(world, walls);
//Adding Border Walls - end

const shuffle = arr => {
  let counter = arr.length;
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;

    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
};

//World.add(world, Bodies.rectangle(200, 200, 50, 50));
// Adding random shapes
// for (let i = 0; i < 10; i++) {
//   if (Math.random() > 0.5) {
//     World.add(
//       world,
//       Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50)
//     );
//   } else {
//     World.add(
//       world,
//       //Bodies.circle(Math.random() * width, Math.random() * height, 35)
//       Bodies.circle(Math.random() * width, Math.random() * height, 35, {
//         render: {
//           fillStyle: "red"
//         }
//       })
//     );
//   }
// }

//Maze (grid) Generation - START
// //method 1
// const grid = [];
// for (let i = 0; i < 3; i++) {
//   grid.push([]);
//   for (let j = 0; j < 3; j++) {
//     grid[i].push(false);
//   }
// }

//method 2 (BETTER !)
const grid = Array(cells)
  .fill(null)
  .map(() => Array(cells).fill(false));

//BE CAREFUL, THIS IS NOT THE SAME SAME AS WITH BELOW:
// const grid = Array(3)
// .fill([false, false, false])
//Because; If you run "grid[0].push(true)" on the array created with this method yields adding 4th
//item to each subarray. Because "[false, false, false]"  refers to the same memory for each subarray

const verticals = Array(cells)
  .fill(null)
  .map(() => Array(cells - 1).fill(false));

const horizontals = Array(cells - 1)
  .fill(null)
  .map(() => Array(cells).fill(false));
//Maze (grid) Generation - END

//Choosing random cell - start
const startRow = Math.floor(Math.random() * cells);
const startCol = Math.floor(Math.random() * cells);
console.log(startRow, startCol);
//Choosing random cell - end

//With using the recursive function below, we are starting from a random cell
//and then trying to reach all cells... By doing that, we are crating a random maze
//which all cells on the maze are accessible
const stepThroughCell = (row, col) => {
  //If I have already visited the cell at [row, col], then return
  //(Else) Mark this cell as being visited
  //Assemble randomly ordered list of neighbors
  //For each neighbor...
  //...See if that neighbor is out of bonds
  //...If we have visited that neighbor, continue to next neighbor
  //...Remove a wall from either horizontals or verticals
  //Visit that next cell

  //If I have already visited the cell at [row, col], then return
  if (grid[row][col]) {
    return;
  }

  //(Else) Mark this cell as being visited
  grid[row][col] = true;

  //Assemble randomly ordered list of neighbors
  const neighbors = shuffle([
    [row - 1, col, "up"],
    [row, col + 1, "right"],
    [row + 1, col, "down"],
    [row, col - 1, "left"]
  ]);
  //console.log(neighbors);

  //For each neighbor...
  for (let neighbor of neighbors) {
    const [nextRow, nextCol, direction] = neighbor;
    //...See if that neighbor is out of bonds
    if (nextRow < 0 || nextRow >= cells || nextCol < 0 || nextCol >= cells) {
      continue; //do not continue to execute remaining code below, do not return(exit the loop). Just skip to the next neighbor
    }
    //...If we have visited that neighbor, continue to next neighbor
    if (grid[nextRow][nextCol]) {
      continue;
    }
    //...Remove a wall from either horizontals or verticals
    if (direction === "left") {
      verticals[row][col - 1] = true;
    } else if (direction === "right") {
      verticals[row][col] = true;
    } else if (direction === "up") {
      horizontals[row - 1][col] = true;
    } else if (direction === "down") {
      horizontals[row][col] = true;
    }

    stepThroughCell(nextRow, nextCol); //recursive!!! iteration
  }
  //Visit that next cell
};

stepThroughCell(startRow, startCol);
//console.log(grid);
//console.log(verticals);
//console.log(horizontals);

//drawing walls onto the canvas with the help of matter.js  - BEGIN
//Adding Horizontal Walls - BEGIN
//forEach(element, elementIndex)
horizontals.forEach((row, rowIndex) => {
  //console.log(row);
  row.forEach((open, colIndex) => {
    if (open) {
      return; //no wall, that is open :)
    }
    const wall = Bodies.rectangle(
      colIndex * unitLength + unitLength / 2,
      rowIndex * unitLength + unitLength,
      unitLength, //width of a wall
      innerWallWidth, //height of a wall //10
      { label: "wall", isStatic: true }
    );
    World.add(world, wall);
  });
});
//Adding Horizontal Walls - END

//Adding Vertical Walls - BEGIN
verticals.forEach((row, rowIndex) => {
  //console.log(row);
  row.forEach((open, colIndex) => {
    if (open) {
      return; //no wall, that is open :)
    }
    const wall = Bodies.rectangle(
      colIndex * unitLength + unitLength,
      rowIndex * unitLength + unitLength / 2,
      innerWallWidth, //width of a wall //10
      unitLength, //height of a wall
      { label: "wall", isStatic: true }
    );
    World.add(world, wall);
  });
});
//Adding Vertical Walls - END
//drawing walls onto the canvas with the help of matter.js  - END

//Adding  GOAL - Begin (ALWAYS on the right-bottom corner)
const goal = Bodies.rectangle(
  width - unitLength / 2,
  height - unitLength / 2,
  unitLength * 0.7,
  unitLength * 0.7,
  { label: "goal", isStatic: true }
);
World.add(world, goal);
//Adding  GOAL - End

//Adding  Ball - Begin  (ALWAYS on the left-top corner)
const ball = Bodies.circle(unitLength / 2, unitLength / 2, unitLength / 4, {
  label: "ball"
});
World.add(world, ball);
//Adding  Ball - End

//Adding move-capability to the ball - Start
document.addEventListener("keydown", event => {
  const { x, y } = ball.velocity;
  //console.log(x, y);

  if (event.keyCode === 87 || event.keyCode === 38) {
    //console.log("up");
    Body.setVelocity(ball, { x, y: y - 5 }); //-5 to move the ball UP direction, no change on the x (horizontal velocity)
  }
  if (event.keyCode === 68 || event.keyCode === 39) {
    //console.log("right");
    Body.setVelocity(ball, { x: x + 5, y: y }); //+5 to move the ball RIGHT direction, no change on the y (vertical velocity)
  }
  if (event.keyCode === 83 || event.keyCode === 40) {
    //console.log("down");
    Body.setVelocity(ball, { x, y: y + 5 }); //+5 to move the ball DOWN direction, no change on the x (horizontal velocity)
  }
  if (event.keyCode === 65 || event.keyCode === 37) {
    //console.log("left");
    Body.setVelocity(ball, { x: x - 5, y: y }); //-5 to move the ball LEFT direction, no change on the y (vertical velocity)
  }
});
//Adding move-capability to the ball - End

//WIN CONDITION
Events.on(engine, "collisionStart", event => {
  //console.log(event); //cannot detect "event" properly (because matter.js instantly clears all the event.items up - before writing them to the console)
  event.pairs.forEach(collision => {
    //console.log(collision);
    const labels = ["ball", "goal"];
    if (
      labels.includes(collision.bodyA.label) &&
      labels.includes(collision.bodyB.label)
    ) {
      //console.log("User Won!");
      world.gravity.y = 1;
      world.bodies.forEach(body => {
        if (body.label === "wall") {
          Body.setStatic(body, false);
        }
      });
    }
  });
});
