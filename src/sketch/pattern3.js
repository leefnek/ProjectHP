// https://www.openprocessing.org/sketch/1050448

let pattern3Shader;
let cubeGraphic;
let targetCubeGraphic;

function pattern3(w) {
  w.preload = function () {
    pattern3Shader = loadShader(
      "src/sketch/assets/wave.vert",
      "src/sketch/assets/wave.frag"
    );
  };

  w.setup = function () {
    w.canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    w.canvas.position(0, 0);
    w.canvas.id("canvas_pattern3");

    noStroke();
    background(0);

    setGraphics("graphic1");
  };

  w.draw = function () {
    background("#000");
    // if(frameCount%50 === 0) {
    //   changeWord(ind)
    //   if(ind === words.length - 1) {
    //     ind = 0
    //   } else{
    //     ind++
    //   }
    // }

    shader(pattern3Shader);
    let freq = map(sin(frameCount / 50), -10, 10, 0.0, 5.0);
    let amp = map(cos(frameCount / 50), 0, 1, 0.1, 0.05);
    let angle = map((frameCount / 20) % 100, 0, 100, 1, 10);
    // currentShader.setUniform('frequency', mouseX/10)
    pattern3Shader.setUniform("amplitude", amp);
    pattern3Shader.setUniform("speed", frameCount * 0.05);
    pattern3Shader.setUniform("texture1", cubeGraphic);
    // currentShader.setUniform("texture2", graphic2);
    // currentShader.setUniform("texture3", graphic3);
    pattern3Shader.setUniform("u_angle", PI / angle);
    rect(0, 0, width, height);
    // setupShader(freq, amp)
  };
}

//pattern3
function setCubeGraphic() {}
function setTargetCubeGraphic() {}

function changeWord(i) {
  setGraphics("graphic1", words[i]);
  // setGraphics("graphic2", words[i]);
  // setGraphics("graphic3", words[i]);
}

function setGraphics(g, word) {
  const size = 800;
  const centerX = size / 2;
  const centerY = size / 2;

  if (g == "graphic1") {
    cubeGraphic = createGraphics(size, size, WEBGL);
    cubeGraphic.clear();
    cubeGraphic.background(0, 0, 0);
    cubeGraphic.noFill();
    // graphic1.textSize(size * 0.1);
    // graphic1.textAlign(CENTER, CENTER);
    // graphic1.fill("0");
    cubeGraphic.stroke("#fff");
    cubeGraphic.rotateX(frameCount * 0.5);
    cubeGraphic.rotateY(0.5);
    cubeGraphic.rotateZ(0.5);
    cubeGraphic.box(100);
    // graphic1.rotate(1, 1, 1);
    // graphic1.text(word, centerX, centerY);
  }
  // if (g == "graphic2") {
  //   graphic2 = createGraphics(size, size);
  //   graphic2.background(0, 0, 0);
  //   graphic2.textFont(font);
  //   graphic2.textSize(size * 0.1);
  //   graphic2.textAlign(CENTER, CENTER);
  //   graphic2.fill("rgba(216, 155, 242, 1.0)");
  //   graphic2.text(word, centerX - 5, centerY + 5);
  // }
  // if (g == "graphic3") {
  //   graphic3 = createGraphics(size, size);
  //   graphic3.background(0, 0, 0);
  //   graphic3.textFont(font);
  //   graphic3.textSize(size * 0.1);
  //   graphic3.textAlign(CENTER, CENTER);
  //   graphic3.fill("rgba(41, 80, 89, 1.0)");
  //   graphic3.text(word, centerX + 5, centerY + 5);
  // }
}

// function pattern3() {
//   w.setup()
//   if (!isWebGLInit) return;
//   background("#000");
//   // if(frameCount%50 === 0) {
//   //   changeWord(ind)
//   //   if(ind === words.length - 1) {
//   //     ind = 0
//   //   } else{
//   //     ind++
//   //   }
//   // }
//   shader(pattern3Shader);
//   let freq = map(sin(frameCount / 50), -10, 10, 0.0, 5.0);
//   let amp = map(cos(frameCount / 50), 0, 1, 0.1, 0.05);
//   let angle = map((frameCount / 20) % 100, 0, 100, 1, 10);
//   // currentShader.setUniform('frequency', mouseX/10)
//   pattern3Shader.setUniform("amplitude", amp);
//   pattern3Shader.setUniform("speed", frameCount * 0.05);
//   pattern3Shader.setUniform("texture1", graphic1);
//   // currentShader.setUniform("texture2", graphic2);
//   // currentShader.setUniform("texture3", graphic3);
//   pattern3Shader.setUniform("u_angle", PI / angle);
//   rect(0, 0, width, height);
//   // setupShader(freq, amp)
// }

// function changeWord(i) {
//   setGraphics("graphic1", words[i]);
//   setGraphics("graphic2", words[i]);
//   setGraphics("graphic3", words[i]);
// }

// function setGraphics(g, word) {
//   const size = 800;
//   const centerX = size / 2;
//   const centerY = size / 2;

//   if (g == "graphic1") {
//     graphic1 = createGraphics(size, size, WEBGL);
//     graphic1.clear();
//     console.log(graphic1);
//     graphic1.background(0, 0, 0);
//     graphic1.noFill();
//     // graphic1.textSize(size * 0.1);
//     // graphic1.textAlign(CENTER, CENTER);
//     // graphic1.fill("0");
//     graphic1.stroke("#fff");
//     graphic1.rotateX(frameCount * 0.5);
//     graphic1.rotateY(0.5);
//     graphic1.rotateZ(0.5);
//     graphic1.box(100);
//     // graphic1.rotate(1, 1, 1);
//     // graphic1.text(word, centerX, centerY);
//   }
//   // if (g == "graphic2") {
//   //   graphic2 = createGraphics(size, size);
//   //   graphic2.background(0, 0, 0);
//   //   graphic2.textFont(font);
//   //   graphic2.textSize(size * 0.1);
//   //   graphic2.textAlign(CENTER, CENTER);
//   //   graphic2.fill("rgba(216, 155, 242, 1.0)");
//   //   graphic2.text(word, centerX - 5, centerY + 5);
//   // }
//   // if (g == "graphic3") {
//   //   graphic3 = createGraphics(size, size);
//   //   graphic3.background(0, 0, 0);
//   //   graphic3.textFont(font);
//   //   graphic3.textSize(size * 0.1);
//   //   graphic3.textAlign(CENTER, CENTER);
//   //   graphic3.fill("rgba(41, 80, 89, 1.0)");
//   //   graphic3.text(word, centerX + 5, centerY + 5);
//   // }
// }
