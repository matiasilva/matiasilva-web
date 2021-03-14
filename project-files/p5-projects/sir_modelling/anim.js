class CircleAnimation {
  constructor(duration, person) {
    this.personReference = person;
    this.duration = duration;
    this.timer = setInterval(this.reset, this.duration);
    this.color = col;
    this.initialRadius = person.attributes.radius * 0.5;
    this.initialStroke = 4;
    this.initialAlpha = 255;
    this.radius = this.initialRadius;
    this.stroke = this.initialStroke;
    this.alpha = this.initialAlpha;
  }

  reset() {
    this.radius = this.initialRadius;
    this.stroke = this.initialStroke;
    this.alpha = this.initialAlpha;
  }

  update() {
    this.radius++;
    this.alpha--;
    this.stroke -= 0.2;
  }

  render() {
    const pos = this.personReference.position;
    stroke(this.color);
    noFill();
    strokeWeight(this.stroke);
    ellipse(pos.x, pos.y, this.radius);
  }
}
