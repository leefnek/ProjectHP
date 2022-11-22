function pattern3(sketch) {
  let video;
  const vScale = 15;
  const colors = [
    "#D65108",
    "#7dce82",
    "#0075C4",
    "#EFA00B",
    "#e8e288",
    "#DDFCAD",
    "#74D3AE",
  ];

  sketch.setup = function () {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight, sketch.WEBGL);
    sketch.background(0);
    sketch.pixelDensity(1);
    video = sketch.createCapture(sketch.VIDEO);
    video.size(sketch.width / vScale, sketch.height / vScale);
    video.hide();
    sketch.rectMode(sketch.CENTER);
    sketch.angleMode(sketch.DEGREES);
    sketch.noLoop();
  };

  sketch.mouseClicked = function () {
    const $pattern3 = document.getElementById("pattern3");
    switch (getStep()) {
      case 3: {
        $pattern3.style.zIndex = 0;
        sketch.noLoop();
        break;
      }
      case 2: {
        sketch.loop();
        $pattern3.style.zIndex = 1000;
        break;
      }
    }
  };

  sketch.draw = function () {
    if (!sketch.isLooping()) return;
    sketch.background(0);
    video.loadPixels();

    for (var y = 0; y < video.height; y++) {
      for (var x = 0; x < video.width; x++) {
        var index = (x + y * video.width) * 4;

        var r = video.pixels[index + 0];
        var g = video.pixels[index + 1];
        var b = video.pixels[index + 2];

        var bright = (r + g + b) / 3;
        var w = sketch.map(bright, 0, 225, 10, vScale);

        threeD(x, y, w, bright);
      }
    }
  };

  function threeD(x, y, w, bright) {
    // rect(x * vScale, y * vScale, w, w);
    // noStroke()
    let order = sketch.int(Math.ceil(sketch.map(bright, 0, 255, 0, 4)));
    // if(bright < 50) order = 0

    // strokeWeight(2)

    let diameter = vScale;

    // noFill()
    // noStroke()
    sketch.fill(colors[order]);
    sketch.strokeWeight(0.5);
    sketch.push();

    switch (order) {
      case 0:
        sketch.translate(
          x * vScale + vScale / 2 - sketch.width / 2,
          y * vScale + vScale / 2 - sketch.height / 2
        );

        sketch.rotateZ(sketch.mouseY);
        sketch.rotateY(sketch.mouseY);
        sketch.box(vScale);
        break;

      case 1:
        sketch.translate(
          x * vScale + vScale / 2 - sketch.width / 2,
          y * vScale + vScale / 2 - sketch.height / 2,
          sketch.abs(sketch.cos(sketch.frameCount * 2)) * 600
        );
        sketch.rotateZ(sketch.mouseX);
        sketch.noFill();
        sketch.stroke(colors[order % colors.length]);
        sketch.box(vScale / 2);
        break;

      case 2:
        sketch.translate(
          x * vScale + vScale / 2 - sketch.width / 2,
          y * vScale + vScale / 2 - sketch.height / 2
        );
        sketch.noFill();
        sketch.strokeWeight(2);
        sketch.stroke(colors[order % colors.length]);
        sketch.arc(0, 0, vScale / 1.5);
        sketch.arc(-diameter / 2, diameter / 2, vScale, vScale, 270, 360);
        sketch.arc(diameter / 2, -diameter / 2, vScale, vScale, 90, 180);
        break;

      case 3:
        sketch.translate(
          x * vScale + vScale / 2 - sketch.width / 2,
          y * vScale + vScale / 2 - sketch.height / 2
        );
        sketch.rotateX(sketch.mouseX);
        sketch.rotateZ(sketch.mouseX);
        sketch.box(vScale / 1.5);
        break;
    }
    sketch.pop();
  }
}
