// perhaps use steering behaviors 'arrive' for wandering?
class Person {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.status = 'S';
    this.numberInfected = 0;
    this.attributes = {
      lerpedColor: color(this.constructor.resolveColor('S')),
      infectionStartTime: 0,
      infectionTime: 20 + floor(random(-3, 3)),
      infectionRadius: 20,
      wanderDistance: 1.25,
      wanderStrength: 0.1,
      wanderTimeStep: 1,
      maxSpeed: 0.5,
      wallBuffer: 1,
      radius: 5
    };
  }

  static resolveColor(status) {
    switch (status) {
      case 'S':
        return color(155, 189, 55);
      case 'I':
        return color(252, 98, 85);
      case 'R':
        return color(136);
    }
  }

  tryRemove() {
    const days = getDaysElapsed();
    const { infectionStartTime, infectionTime } = this.attributes;
    if (days - infectionStartTime > infectionTime) this.setStatus('R');
  }

  setStatus(status) {
    this.status = status;
    if (status == 'I') {
      this.attributes.infectionStartTime = getDaysElapsed();
    } else if (status == 'R') {
      this.attributes.lerpedColor = color(this.constructor.resolveColor('I'));
    }
  }

  applyForce(force) {
    // assuming unit mass
    this.acceleration.add(force);
  }

  updateMotion() {
    const {
      wanderStrength,
      wanderTimeStep,
      wanderDistance,
      maxSpeed
    } = this.attributes;
    if (frameCount % wanderTimeStep == 0) {
      const gravityForce = wanderStrength / (wanderDistance * wanderDistance);
      this.applyForce(p5.Vector.random2D().mult(gravityForce));
    }
    //
    let repel = true;
    const { radius } = this.attributes;
    if (this.position.x < radius) {
      this.position.x = radius;
    } else if (this.position.x > width - radius) {
      this.position.x = width - radius;
    } else if (this.position.y < radius) {
      this.position.y = radius;
    } else if (this.position.y > height - radius) {
      this.position.y = height - radius;
    } else {
      repel = false;
    }
    if (repel) {
      this.velocity.mult(-1);
      this.applyForce(p5.Vector.fromAngle(this.velocity.heading(), 5));
    }
    // possible extension is to add wall repulsion force
    //
    this.velocity.add(this.acceleration);
    if (this.velocity.mag() > maxSpeed) this.velocity.setMag(maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  render() {
    this.attributes.lerpedColor = lerpColor(
      this.attributes.lerpedColor,
      this.constructor.resolveColor(this.status),
      0.08
    );
    fill(this.attributes.lerpedColor);
    noStroke();
    ellipse(this.position.x, this.position.y, this.attributes.radius * 2);
    // draw circle ring
    stroke(0, 255, 0);
    noFill();
    ellipse(
      this.position.x,
      this.position.y,
      this.attributes.infectionRadius * 2
    );
  }
}
