// ref : http://makezone.co.kr/blog/2020/12/27/%EC%96%BC%EA%B5%B4-%EC%9D%B8%EC%8B%9D%ED%95%98%EA%B8%B0-2-faceapi-ml5-js/

const detection_options = {
  withLandmarks: true,
  withDescriptors: false,
};

const pattern0 = () => {
  frameRate(10);
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
  background("#000");
  image(video, 0, 0, width, height);
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

    noFill();
    stroke("#76b5c5");
    strokeWeight(4);
    rect(x, y, boxWidth, boxHeight);
  }
}

function drawLandmarks(detections) {
  stroke(161, 95, 251);
  strokeWeight(2);
  noFill();

  for (let i = 0; i < detections.length; i++) {
    const mouth = detections[i].parts.mouth;
    const leftEye = detections[i].parts.leftEye;
    const rightEye = detections[i].parts.rightEye;
    // const nose = detections[i].parts.nose;
    // const rightEyeBrow = detections[i].parts.rightEyeBrow;
    // const leftEyeBrow = detections[i].parts.leftEyeBrow;
    // const jawOutline = detections[i].parts.jawOutline;
    // const noseColor = video.get(nose[3]._x, nose[3]._y);

    // fill(noseColor)
    // drawPart(jawOutline, false);

    // noStroke()
    // rect(nose[3]._x, nose[3]._y-10, 50, 50)

    // fill(161, 95, 251)
    // drawPart(mouth, true);
    // drawPart(nose, false);
    // drawPart(leftEye, true);
    // drawPart(leftEyeBrow, false);
    // drawPart(rightEye, true);
    // drawPart(rightEyeBrow, false);

    // ellipse(mouth[1]._x, mouth[1]._y, 30, 30)
    // ellipse(mouth[10]._x, mouth[10]._y, 30, 30)
    image(fingerImg, mouth[1]._x + 20, mouth[1]._y - 20);
    // image(noseImg, nose[3]._x-50, nose[3]._y-50)
    image(leftEyeImg, leftEye[1]._x - 10, leftEye[1]._y - 20);
    image(rightEyeImg, rightEye[1]._x + 10, rightEye[1]._y - 20);
  }
}

// function drawPart(feature, closed) {
//   beginShape();
//   for (let i = 0; i < feature.length; i++) {
//     const x = feature[i]._x;
//     const y = feature[i]._y;
//     vertex(x, y);
//   }

//   if (closed === true) {
//     endShape(CLOSE);
//   } else {
//     endShape();
//   }
// }
