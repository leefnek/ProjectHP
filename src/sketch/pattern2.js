// https://www.openprocessing.org/sketch/1050448

function pattern2(sketch) {
  let pattern2Shader;
  let cubeGraphic;
  let targetCubeGraphic;

  sketch.preload = function () {
    pattern2Shader = sketch.loadShader(
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

  sketch.mouseClicked = function () {
    const $pattern2 = document.getElementById("pattern2");
    switch (getStep()) {
      case 2: {
        $pattern2.style.zIndex = 0;
        sketch.noLoop();
        break;
      }
      case 1: {
        sketch.loop();
        $pattern2.style.zIndex = 1000;
        break;
      }
    }
  };

  sketch.draw = function () {
    sketch.background("#000");
    sketch.shader(pattern2Shader);
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
    pattern2Shader.setUniform("amplitude", amp);
    pattern2Shader.setUniform("speed", sketch.frameCount * 0.05);
    pattern2Shader.setUniform("texture1", cubeGraphic);
    pattern2Shader.setUniform("texture2", cubeGraphic);
    // currentShader.setUniform("texture3", graphic3);
    pattern2Shader.setUniform("u_angle", sketch.PI / angle);
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
