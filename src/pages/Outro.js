class Outro {
  constructor($App) {
    this.$Outro = $App.querySelector("#Outro");
    this.$Outro.style.display = "none";
    $App.addEventListener("click", () => {
      switch (getStep()) {
        case 4:
          this.$Outro.style.display = "none";
          break;
        case 3:
          this.$Outro.style.display = "flex";
      }
    });
  }
}

export default Outro;
