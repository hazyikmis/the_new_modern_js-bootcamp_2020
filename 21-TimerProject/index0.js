class Timer {
  constructor(durationInput, startButton, pauseButton) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;

    //this.startButton.addEventListener("click", this.start);

    //FIXING THE VALUE OF THIS - METHOD 1 (BINDING "this" INSIDE THE CONSTRUCTOR)
    //Be careful, the function (start()) should not defined as an ARROW function, should be defined like this: start() {...}"
    this.startButton.addEventListener("click", this.start.bind(this));
  }

  /*
  start() {
    //you can access other class methods with "this",
    //but since you wired up this method with a button click as above
    //when button clicks, you will get an error "this.importantMethodToCall" not a function
    //if you call this "start" method from outside of class like below (timer.start()) it works without any problem
    this.importantMethodToCall();
  }
*/

  //FIXING THE VALUE OF THIS - METHOD 2 (USING ARROW FUNCTION)
  //Be careful, in the constructor, you should not use bind, the line should be like this: "this.startButton.addEventListener("click", this.start);"
  //arrow function used, in order to use "this" as refers to always the class instance
  // start = () => {
  //   this.importantMethodToCall();
  // };

  start() {
    this.importantMethodToCall();
  }

  importantMethodToCall() {
    console.log("IMPORTANT THING WAS DONE!");
  }
}

const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

const timer = new Timer(durationInput, startButton, pauseButton);
timer.start();

/*
const timer = new Timer(durationInput, startButton, pauseButton);
timer.start(); //"this" inside the start refers to timer instance of Timer class
//but when you click the button, then "this" inside the start refers to the startButton object

const printThis = function() {
  console.log(this);
};

// BE CAREFUL WHEN USING "BIND, CALL & APPLY" INVOKES !!! 
printThis(); //"this" inside printThis refers to Window object
printThis({ color: "red" }); //"this" inside printThis refers to Window object
printThis.call(); //"this" inside printThis refers to Window object
printThis.call({ color: "red" }); //"this" inside printThis refers to { color: "red"} object !!!
printThis.apply({ color: "red" }); //"this" inside printThis refers to { color: "red"} object !!!
//(call <==> apply)

const colors = {
  printColor() {
    console.log(this);
  },
  printName() {
    console.log("Name");
  }
};
colors.printColor(); //"this" inside printColor() refers to colors object
*/
