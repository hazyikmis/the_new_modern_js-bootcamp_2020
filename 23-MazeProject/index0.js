// initialization of MATTER.JS  -- begin
const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  //the 2 types below required for click-and-drag-of-shapes functionality
  Mouse,
  MouseConstraint
} = Matter;

const width = 800;
const height = 600;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    // width: 800,
    // height: 600
    width,
    height,
    wireframes: false //for solid shapes with colors picked up randomly (default-> wireframes: true)
  }
});
Render.run(render);
Runner.run(Runner.create(), engine);

//adding click-and-drag-of-shapes functionality
World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas)
  })
);
// initialization of MATTER.JS  -- end

// test of adding simple shape
// const shape = Bodies.rectangle(200, 200, 50, 50, {
//   isStatic: true
// });
// World.add(world, shape);

// Walls - begin
const walls = [
  // Bodies.rectangle(400, 0, 800, 40, { isStatic: true }),
  // Bodies.rectangle(400, 600, 800, 40, { isStatic: true }),
  // Bodies.rectangle(0, 300, 40, 600, { isStatic: true }),
  // Bodies.rectangle(800, 300, 40, 600, { isStatic: true })
  Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 40, height, { isStatic: true })
];
World.add(world, walls);
// Walls - end

//World.add(world, Bodies.rectangle(200, 200, 50, 50));
// Adding random shapes
for (let i = 0; i < 10; i++) {
  if (Math.random() > 0.5) {
    World.add(
      world,
      Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50)
    );
  } else {
    World.add(
      world,
      //Bodies.circle(Math.random() * width, Math.random() * height, 35)
      Bodies.circle(Math.random() * width, Math.random() * height, 35, {
        render: {
          fillStyle: "red"
        }
      })
    );
  }
}
