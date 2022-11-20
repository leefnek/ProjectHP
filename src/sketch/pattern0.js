// ref : http://makezone.co.kr/blog/2020/12/27/%EC%96%BC%EA%B5%B4-%EC%9D%B8%EC%8B%9D%ED%95%98%EA%B8%B0-2-faceapi-ml5-js/

const detection_options = {
  withLandmarks: true,
  withDescriptors: false,
};

function pattern0(sketch) {
  let leftEyeImg;
  let rightEyeImg;
  let fingerImg;
  let faceapi;
  let isFaceModelReady;
  let video;

  sketch.preload = function () {
    leftEyeImg = sketch.loadImage("src/img/left-eye.png");
    rightEyeImg = sketch.loadImage("src/img/right-eye.png");
    fingerImg = sketch.loadImage("src/img/finger.png");
  };

  sketch.setup = function () {
    sketch.frameRate(10);
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    sketch.background("#000");
    video = sketch.createCapture(sketch.VIDEO);
    video.size(sketch.width, sketch.height);
    video.hide();
    faceapi = ml5.faceApi(video, detection_options, readyFaceModel);
  };

  sketch.keyPressed = function () {
    const $pattern0 = document.getElementById("pattern0");
    switch (getStep()) {
      case 0: {
        $pattern0.style.zIndex = 0;
        sketch.noLoop();
        break;
      }
      case 4: {
        sketch.loop();
        $pattern0.style.zIndex = 1000;
        break;
      }
    }
  };

  sketch.draw = function () {
    if (isFaceModelReady) {
      faceapi.detect(drawFace);
    }
  };

  function drawFace(err, result) {
    if (err) {
      alert(`${err.message} 에러 발생. 새로고침 해주세요.`);
      return;
    }

    const detections = result;
    sketch.background("#000");
    sketch.image(video, 0, 0, sketch.width, sketch.height);
    if (detections) {
      if (detections.length > 0) {
        drawBox(detections);
        drawLandmarks(detections);
      }
    }
  }

  function drawBox(detections) {
    for (let i = 0; i < detections.length; i++) {
      const alignedRect = detections[i].alignedRect;
      const x = alignedRect._box._x;
      const y = alignedRect._box._y;
      const boxWidth = alignedRect._box._width;
      const boxHeight = alignedRect._box._height;

      sketch.noFill();
      sketch.stroke("#76b5c5");
      sketch.strokeWeight(4);
      sketch.rect(x, y, boxWidth, boxHeight);
    }
  }

  function drawLandmarks(detections) {
    sketch.stroke(161, 95, 251);
    sketch.strokeWeight(2);
    sketch.noFill();

    for (let i = 0; i < detections.length; i++) {
      const mouth = detections[i].parts.mouth;
      const leftEye = detections[i].parts.leftEye;
      const rightEye = detections[i].parts.rightEye;

      sketch.image(fingerImg, mouth[1]._x + 20, mouth[1]._y - 20);

      sketch.image(leftEyeImg, leftEye[1]._x - 10, leftEye[1]._y - 20);
      sketch.image(rightEyeImg, rightEye[1]._x + 10, rightEye[1]._y - 20);
    }
  }

  function readyFaceModel() {
    isFaceModelReady = !isFaceModelReady;
  }
}
