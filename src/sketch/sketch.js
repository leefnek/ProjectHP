function setup() {
  // canvas setting
  createCanvas(windowWidth, windowHeight);
  background("#000");
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
