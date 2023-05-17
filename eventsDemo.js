const EventEmitter = require("events");

//HitPerson class, extends EventEmitter to enable encapsulating event listener inside class.
class HitPerson extends EventEmitter {
  //constructor for HitPerson
  constructor(name, toughness) {
    super(); //inherit EventEmitter abilities first
    this.name = name;
    this.toughness = toughness;
    this.alive = true;
    this.hammer = null; // hammer object stored as instance variable, null until listenForHit is called.
    this.boundHandleHit = null; // instance variable to hold handleHit function instance
  }

  // method to start listener for hammer 'hit' event
  listenForHit(hammer) {
    // bind() method passes the context of 'this', refering to the HitPerson instance.
    // without bind() method, handleHit does not recognize the calls to
    // the other methods within the HitPerson class!
    this.hammer = hammer; // stores this hammer object now that listener has been enabled.
    this.boundHandleHit = this.handleHit.bind(this); // stores this instance of handleHit in a variable
    hammer.on("hit", this.boundHandleHit); //enables the listener
  }

  // reaction logic
  handleHit(strength) {
    if (strength <= 0) {
      this.laugh();
    } else if (strength < this.toughness) {
      this.wince();
    } else if (strength >= this.toughness * 2) {
      this.die();
    } else {
      this.swear();
    }
  }

  //stop the listener
  stopListening() {
    this.hammer.removeListener("hit", this.boundHandleHit);
  }

  // laugh reaction method
  laugh() {
    console.log(`${this.name} chuckles...`);
  }

  // wince reaction method
  wince() {
    console.log(`${this.name} winces in pain.`);
  }

  // swear reaction method
  swear() {
    console.log(`${this.name} yells "!#$%@#$"`);
  }

  // die reaction method
  die() {
    console.log(`${this.name} kicked the bucket...`);
    this.alive = false;
    //kill the listener for this instance
    this.stopListening();
  }
}

// HitEmitter class with all abilities of EventEmitter
class HitEmitter extends EventEmitter {}

// 3 instances of HitPerson with varying levels of toughness
const bobby = new HitPerson("Bobby", 3);
const linda = new HitPerson("Linda", 2);
const hulk = new HitPerson("Hulk", 9);

// HitEmitter called 'hammer'
const hammer = new HitEmitter();

// call listeners for each instance of HitPerson
bobby.listenForHit(hammer);
linda.listenForHit(hammer);
hulk.listenForHit(hammer);

hammer.emit("hit", 0); // all laugh()
hammer.emit("hit", 2); // bobby & hulk wince(), linda swear()
hammer.emit("hit", 5); // bobby swear(), linda die(), hulk wince()
hammer.emit("hit", 10); // bobby die(), hulk swear()
hammer.emit("hit", 20); // hulk die()

//all dead, nothing will happen on next emit
console.log("all dead, no one left to react");
hammer.emit("hit", 10); // nothing happens
