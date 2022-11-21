class Intro {
  constructor($App) {
    this.$Intro = $App.querySelector("#Intro");
    $App.addEventListener("click", () => {
      switch (getStep()) {
        case 0:
          this.$Intro.style.display = "none";
          break;
        case 4:
          this.$Intro.style.display = "inline-block";
      }
    });
  }
}

export default Intro;
