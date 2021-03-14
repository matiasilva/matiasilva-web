class Player {
  constructor() {
    this.size = 50;
    this.lerpSize = this.size;
    this.yoff = 0;
    this.color = color(0, 0, 240);
    this.center = createVector(width / 2, height / 2);
    this.position = createVector();
  }

  display() {
    stroke(128, 191, 255);
    strokeWeight(4);
    fill(this.color);
    this.size = lerp(this.size, this.lerpSize, 0.2);
    push();
    translate(this.center.x, this.center.y);
    beginShape();
    let xoff = 0;
    for (let th = 0; th <= TWO_PI; th += 0.05) {
      let offset = map(noise(xoff, this.yoff), 0, 1, -5, 5);
      let r = this.size * 0.5 + offset;
      let x = r * cos(th);
      let y = r * sin(th);
      vertex(x, y);
      xoff += 0.03;
    }
    endShape(CLOSE);
    pop();
    this.yoff += 0.01;
  }

  steer() {
    //logistic function for steering
    let pos =
      mouseX == 0 && mouseY == 0 ? this.center : createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(pos, this.center);
    let dist = dir.mag();
    dist = constrain(dist, 0, 80);
    let factor = dist * this.getFactor(this.size);
    dir.setMag(factor);
    this.position.add(dir);
  }

  getFactor(size) {
    let output = log(3) / (log(size) * log(size));
    return output;
  }

  collide(foodObject) {
    this.lerpSize = sqrt(
      this.size * this.size + foodObject.size * foodObject.size
    );
  }
}
