let video;
let faceapi;
let isFaceModelReady = false;
let leftEyeImg, rightEyeImg, fingerImg;

let pattern0Sketch = new p5(pattern0, "pattern0");
let pattern1Sketch = new p5(pattern1, "pattern1");
let pattern2Sketch = new p5(pattern2, "pattern2");
let pattern3Sketch = new p5(pattern3, "pattern3");

window.addEventListener("keydown", keyPressed);
function keyPressed() {
  // 사용자가 클릭한 위치가 pos + offset인 경우 addStep한다.
  // offset과 나타나는 주기를 여기서 관리
  addStep();
}
