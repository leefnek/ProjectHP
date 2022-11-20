// http://natureofcode.com

function pattern1(sketch) {
  let world;
  const boundaries = [];
  const boxes = [];

  sketch.setup = function () {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    sketch.background(0);
    world = createWorld();
    boundaries.push(
      new Boundary(sketch.width * 0.25, sketch.height * 0.5, 50, 10)
    );
    boundaries.push(
      new Boundary(sketch.width * 0.55, sketch.height * 0.8, 50, 10)
    );
    boundaries.push(new Boundary(sketch.width / 2 - 50, 100, 50, 10));
    boundaries.push(
      new Boundary(sketch.width / 2 + 50, sketch.height / 2 + 100, 50, 10)
    );
    boundaries.push(
      new Boundary((3 * sketch.width) / 4 + 150, sketch.height - 50, 50, 10)
    );
    boxes.push(new Box(sketch.width / 2, 30));
    sketch.noLoop();
  };

  sketch.mouseClicked = function () {
    const $pattern1 = document.getElementById("pattern1");
    switch (getStep()) {
      case 1: {
        $pattern1.style.zIndex = 0;
        sketch.noLoop();
        boxes.splice(0, boxes.length);
        break;
      }
      case 0: {
        sketch.loop();
        $pattern1.style.zIndex = 1000;
        break;
      }
    }
  };

  sketch.draw = function () {
    if (!sketch.isLooping()) return;
    sketch.background(0);

    let timeStep = 1.0 / 30;
    world.Step(timeStep, 10, 10);

    if (sketch.random(1) < 0.3) {
      let b = new Box(
        sketch.random(sketch.width / 6, (5 * sketch.width) / 6),
        30
      );
      boxes.push(b);
    }

    for (let i = 0; i < boundaries.length; i++) {
      boundaries[i].display();
    }

    for (let i = boxes.length - 1; i >= 0; i--) {
      boxes[i].display();
      if (boxes[i].done()) {
        boxes.splice(i, 1);
      }
    }
  };

  class Box {
    constructor(x, y) {
      this.w = sketch.random(15, 20);
      this.h = sketch.random(15, 20);

      let bd = new box2d.b2BodyDef();
      bd.type = box2d.b2BodyType.b2_dynamicBody;
      bd.position = scaleToWorld(x, y);

      let fd = new box2d.b2FixtureDef();

      fd.shape = new box2d.b2PolygonShape();
      fd.shape.SetAsBox(scaleToWorld(this.w / 2), scaleToWorld(this.h / 2));

      fd.density = 1.0;
      fd.friction = 0.5;
      fd.restitution = 0.2;

      this.body = world.CreateBody(bd);
      this.body.CreateFixture(fd);

      this.body.SetLinearVelocity(
        new box2d.b2Vec2(sketch.random(-5, 5), sketch.random(2, 5))
      );
      this.body.SetAngularVelocity(sketch.random(-5, 5));
    }

    killBody() {
      world.DestroyBody(this.body);
    }

    done() {
      let pos = scaleToPixels(this.body.GetPosition());
      if (pos.y > sketch.height + this.w * this.h) {
        this.killBody();
        return true;
      }
      return false;
    }

    display() {
      let pos = scaleToPixels(this.body.GetPosition());
      let a = this.body.GetAngleRadians();

      sketch.rectMode(sketch.CENTER);
      sketch.push();
      sketch.translate(pos.x, pos.y);
      sketch.rotate(a);
      sketch.noStroke();

      sketch.colorMode(sketch.RGB, 255, 255, 255, 255);
      sketch.fill(
        50,
        sketch.map(pos.x, 0, 640, 100, 200),
        sketch.map(pos.y, 0, 640, 150, 255),
        200
      );

      sketch.rect(0, 0, this.w, this.h);
      sketch.pop();
    }
  }

  class Boundary {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.angle = 0;

      let fd = new box2d.b2FixtureDef();

      let bd = new box2d.b2BodyDef();
      bd.type = box2d.b2BodyType.b2_staticBody;
      bd.position.x = scaleToWorld(this.x);
      bd.position.y = scaleToWorld(this.y);

      fd.shape = new box2d.b2PolygonShape();
      fd.shape.SetAsBox(this.w / (scaleFactor * 2), this.h / (scaleFactor * 2));

      fd.density = 1.0;
      fd.friction = 0.5;
      fd.restitution = 0.2;

      this.body = world.CreateBody(bd);
      this.body.CreateFixture(fd);

      this.body.SetAngularVelocity(sketch.random(10, 20));
    }

    display() {
      let a = this.body.GetAngleRadians();
      sketch.rectMode(sketch.CENTER);
      sketch.noStroke();

      sketch.colorMode(sketch.RGB, 255, 255, 255, 255);
      const r = sketch.map(sketch.cos(a), -1, 1, 200, 255);
      const g = sketch.map(sketch.cos(a), -1, 1, 100, 220);
      const b = sketch.map(sketch.cos(a), -1, 1, 100, 255);
      sketch.fill(r, g, 0);

      sketch.push();
      sketch.translate(this.x, this.y);
      sketch.rotate(this.angle);
      sketch.rect(0, 0, this.w, this.h, 20);
      sketch.pop();

      this.angle++;
    }
  }
}
