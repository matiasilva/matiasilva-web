class Blob {
  constructor() {
    this.size = random(20, 22);
    this.color = color(random(255), random(255), random(255));
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.size);
  }
}
