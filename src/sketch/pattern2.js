// https://www.openprocessing.org/sketch/1050448

function pattern2(sketch) {
  let pattern2Shader;
  let cubeGraphic;
  let cube2Graphic;

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
    setCube2Graphic();
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
    const amp = sketch.map(sketch.cos(sketch.frameCount / 40), 0, 1, 0.1, 0.03);
    const angle = sketch.map((sketch.frameCount / 20) % 80, 0, 80, 1, 5);
    pattern2Shader.setUniform("frequency", 3);
    pattern2Shader.setUniform("amplitude", amp);
    pattern2Shader.setUniform("speed", sketch.frameCount * 0.07);
    pattern2Shader.setUniform("texture1", cubeGraphic);
    pattern2Shader.setUniform("texture2", cube2Graphic);
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

  function setCube2Graphic() {
    const size = 800;

    cube2Graphic = sketch.createGraphics(size, size, sketch.WEBGL);
    cube2Graphic.clear();
    cube2Graphic.background(0, 0, 0);
    cube2Graphic.noFill();
    cube2Graphic.stroke("#abdbe3");
    cube2Graphic.rotateX(sketch.frameCount * 0.5);
    cube2Graphic.rotateY(0.3);
    cube2Graphic.rotateZ(0.7);
    cube2Graphic.box(100);
  }
}
