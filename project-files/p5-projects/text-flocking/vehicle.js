class Vehicle {
  constructor(x, y, col) {
    this.home = createVector(x, y);
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.color = color(col.r, col.g, col.b);
    this.mass = 8;
    this.maxspeed = 6;
    this.maxforce = 2.5;
    this.threshold_distance = 150;
  }

  applyForce(force) {
    this.acc.add(force.div(this.mass));
  }

  steer(target1) {
    let arrive = this.arrive(this.home);
    let flee = this.flee(target1).mult(5);
    this.applyForce(arrive);
    this.applyForce(flee);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxspeed);
    let steering = desired.sub(this.vel);
    steering.limit(this.maxforce);
    return steering;
  }

  arrive(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let distance = desired.mag();
    let speed = this.maxspeed;
    if (distance < this.threshold_distance) {
      speed = map(distance, 0, this.threshold_distance, 0, this.maxspeed);
    }
    desired.setMag(speed);
    let steering = desired.sub(this.vel);
    steering.limit(this.maxforce);
    return steering;
  }

  flee(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let distance = desired.mag();
    if (distance < 50) {
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      let steering = desired.sub(this.vel);
      steering.limit(this.maxforce);
      return steering;
    } else {
      return createVector();
    }
  }

  update() {
    this.vel.add(this.acc);
    //this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.mass);
  }
}
