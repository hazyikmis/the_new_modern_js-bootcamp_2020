class Timer {
  //constructor(durationInput, startButton, pauseButton) {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining); //actually it is totalDuration
    }
    this.tick(); //immediately run at first, without waiting t milliseconds as will be defined setInterval below
    //calling an "f" function in every passing t milliseconds --> setInterval(f, t);
    //this.intervalId = setInterval(this.tick, 1000);
    this.intervalId = setInterval(this.tick, 50); //for smoother animation, 1 sec changed to 50 msec
  };

  pause = () => {
    clearInterval(this.intervalId);
  };

  //every second, tick function will be called
  /*
  tick = () => {
    //const timeRemaining = parseFloat(this.durationInput.value);
    const timeRem = this.timeRemaining; //getter function (get timeRemaining()) will be called / BE CAREFUL, NO "()" USED AT THE END
    //this.durationInput.value = timeRemaining - 1;
    this.timeRemaining = timeRem - 1; //setter function (eet timeRemaining(time)) will be called / assigned value (timeRem - 1) accepted as the parameter of the setter function
  };
*/
  //better way of defining tick() function:
  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      //this.timeRemaining = this.timeRemaining - 1;
      this.timeRemaining = this.timeRemaining - 0.05; //tick in every 50 msec, not 1 sec
      //left: setter & right: getter
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };

  /*
  getTime() {
    return parseFloat(this.durationInput.value);
  }

  setTime(time) {
    this.durationInput.value = time;
  }
*/
  //using GETTER & SETTER methods
  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    //this.durationInput.value = time;
    this.durationInput.value = time.toFixed(2);
  }
}
