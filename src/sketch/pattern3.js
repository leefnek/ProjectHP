// https://www.openprocessing.org/sketch/1050448

function pattern3(sketch) {
  let pattern3Shader;
  let cubeGraphic;
  let targetCubeGraphic;

  sketch.preload = function () {
    pattern3Shader = sketch.loadShader(
      "src/sketch/assets/wave.vert",
      "src/sketch/assets/wave.frag"
    );
  };

  sketch.setup = function () {
    sketch.canvas = sketch.createCanvas(
      sketch.windowWidth,
      sketch.windowHeight,
      sketch.WEBGL
    );
    sketch.noStroke();
    sketch.background(0);
    setCubeGraphic();
    sketch.noLoop();
  };

  sketch.keyPressed = function () {
    const $pattern3 = document.getElementById("pattern3");
    switch (getStep()) {
      case 3: {
        $pattern3.style.zIndex = 0;
        sketch.noLoop();
        break;
      }
      case 2: {
        console.log("here");
        sketch.loop();
        $pattern3.style.zIndex = 1000;
        break;
      }
    }
  };

  sketch.draw = function () {
    sketch.background("#000");
    sketch.shader(pattern3Shader);
    const freq = sketch.map(
      sketch.sin(sketch.frameCount / 50),
      -10,
      10,
      0.0,
      5.0
    );
    const amp = sketch.map(sketch.cos(sketch.frameCount / 50), 0, 1, 0.1, 0.05);
    const angle = sketch.map((sketch.frameCount / 20) % 100, 0, 100, 1, 10);
    // currentShader.setUniform('frequency', mouseX/10)
    pattern3Shader.setUniform("amplitude", amp);
    pattern3Shader.setUniform("speed", sketch.frameCount * 0.05);
    pattern3Shader.setUniform("texture1", cubeGraphic);
    // currentShader.setUniform("texture2", graphic2);
    // currentShader.setUniform("texture3", graphic3);
    pattern3Shader.setUniform("u_angle", sketch.PI / angle);
    sketch.rect(0, 0, sketch.width, sketch.height);
    // setupShader(freq, amp)
  };

  function setCubeGraphic() {
    const size = 800;

    cubeGraphic = sketch.createGraphics(size, size, sketch.WEBGL);
    cubeGraphic.clear();
    cubeGraphic.background(0, 0, 0);
    cubeGraphic.noFill();
    cubeGraphic.stroke("#fff");
    cubeGraphic.rotateX(sketch.frameCount * 0.5);
    cubeGraphic.rotateY(0.5);
    cubeGraphic.rotateZ(0.5);
    cubeGraphic.box(100);
  }
  function setTargetCubeGraphic() {}
}
