let video;
let faceapi;
let isFaceModelReady = false;
let leftEyeImg, rightEyeImg, fingerImg;

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

function readyFaceModel() {
  isFaceModelReady = !isFaceModelReady;
}

const stepMapper = {
  0: pattern0,
  1: pattern1,
  2: pattern2,
  3: pattern3,
  4: pattern4,
};

function draw() {
  stepMapper[getStep()]();
}

function keyPressed() {
  // 사용자가 클릭한 위치가 pos + offset인 경우 addStep한다.
  // offset과 나타나는 주기를 여기서 관리
  addStep();
}
