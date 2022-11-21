import Intro from "./Intro.js";
import Outro from "./Outro.js";

class Index {
  constructor() {
    this.$App = document.querySelector("#App");
    this.Intro = new Intro(this.$App);
    this.Outro = new Outro(this.$App);
  }
}

new Index();
