let video;
let faceapi;
let isFaceModelReady = false;
let leftEyeImg, rightEyeImg, fingerImg;

let pattern3Canvas;

function preload() {
  // pattern0 preload
  leftEyeImg = loadImage("src/img/left-eye.png");
  rightEyeImg = loadImage("src/img/right-eye.png");
  fingerImg = loadImage("src/img/finger.png");
}

function setup() {
  // canvas setting
  createCanvas(windowWidth, windowHeight);
  background("#000");

  // pattern0 setting
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  faceapi = ml5.faceApi(video, detection_options, readyFaceModel);
}

const stepMapper = {
  0: pattern0,
  1: pattern1,
  2: pattern2,
  3: () => {},
  4: pattern4,
};

function draw() {
  stepMapper[getStep()]();
}

function keyPressed() {
  // 사용자가 클릭한 위치가 pos + offset인 경우 addStep한다.
  // offset과 나타나는 주기를 여기서 관리
  if (getStep() === 3) {
    console.log(pattern3Sketch);
    pattern3Sketch.remove();
    const $pattern3 = document.getElementById("canvas_pattern3");
    $pattern3.remove();
  }
  addStep();
  if (getStep() === 3) {
    pattern3Sketch = new p5(pattern3);
  }
}

// pattern0
function readyFaceModel() {
  isFaceModelReady = !isFaceModelReady;
}
