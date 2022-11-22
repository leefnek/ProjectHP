function pattern4(sketch) {
  let palette = ["#C04BF2", "#6232A6", "#20448C", "#45A9BF", "#244E73"];

  let particles = [];
  let pg;
  let font;

  let size = 10;

  sketch.preload = function () {
    font = sketch.loadFont("src/sketch/assets/Ycomputer.ttf");
  };

  sketch.setup = function () {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    sketch.background(0);

    pg = sketch.createGraphics(sketch.width, sketch.height);
    pg.background(0);
    pg.textFont(font);
    pg.textSize(sketch.height / 6);
    pg.fill(255);
    pg.textAlign(sketch.LEFT, sketch.TOP);
    pg.text(
      "프로젝트 흡",
      sketch.width / 2 - (sketch.height * 2) / 5,
      sketch.height / 5
    );

    for (let x = 0; x < sketch.width; x += 3) {
      for (let y = 0; y < sketch.height; y += 3) {
        let isTEXT =
          JSON.stringify(pg.get(x, y)) !== JSON.stringify([0, 0, 0, 255]);
        if (isTEXT) {
          particles.push(
            new Particle(x, y, size, sketch.color(sketch.random(palette)))
          );
        }
      }
    }
    sketch.noLoop();
  };

  sketch.mouseClicked = function () {
    const $pattern4 = document.getElementById("pattern4");
    switch (getStep()) {
      case 4: {
        $pattern4.style.zIndex = 0;
        sketch.noLoop();
        break;
      }
      case 3: {
        sketch.loop();
        $pattern4.style.zIndex = 1000;
        break;
      }
    }
  };

  sketch.draw = function () {
    if (!sketch.isLooping()) return;

    sketch.background(0);
    let n =
      30 + sketch.floor(sketch.abs(sketch.sin(sketch.frameCount / 100)) * 5);

    for (let i = 0; i < particles.length - n; i += 4) {
      particles[i].display(i, size);
    }
  };

  class Particle {
    constructor(x, y, size, color) {
      this.x = x; // 본래 위치
      this.y = y;
      this.size = size;
      this.color = color;
    }

    display(ind, size) {
      let n = sketch.sin(sketch.frameCount / 20) * sketch.width;

      let moveX =
        this.x +
        sketch.cos(sketch.frameCount * 0.1 + this.x * this.y * 0.01) * 5;
      let moveY =
        this.y + sketch.cos(sketch.frameCount * 0.1 + this.y * -0.01) * 5;

      let tempX = moveX + sketch.random(n, -1 * n);
      let tempY = moveY + sketch.random(n, -1 * n);

      let scatterSize =
        1 + sketch.sin(1 / sketch.dist(moveX, moveY, this.x, this.y)) * 5;
      let letterSize =
        size - sketch.sin(1 / sketch.dist(moveX, moveY, this.x, this.y)) * 5;

      let letterCol = this.color;
      letterCol.setAlpha(
        128 +
          128 * sketch.map(sketch.sin(sketch.millis() / 1000), -1, 1, -1, 0.8)
      );
      sketch.fill(letterCol);
      sketch.noStroke();
      sketch.ellipse(moveX, moveY, letterSize, letterSize);
      sketch.fill("#FFFF48B3");
      sketch.ellipse(tempX, tempY, scatterSize / 2, scatterSize / 2);
    }
  }
}
