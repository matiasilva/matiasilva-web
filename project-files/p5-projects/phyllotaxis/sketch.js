class Dot {
  constructor(x, y, phase, frames) {
    this.position = createVector(x, y);
    this.phase = phase;
    this.frequency = TWO_PI / frames;
    this.color = 0;
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.position.x, this.position.y, 8);
  }

  update() {
    const shift = 128;
    const amp = 127;
    const colors = [];
    let r, g, b;
    r = sin(this.frequency * frameCount + 0 + this.phase) * amp + shift;
    g =
      sin(this.frequency * frameCount + (2 * PI) / 3 + this.phase) * amp +
      shift;
    b =
      sin(this.frequency * frameCount + (4 * PI) / 3 + this.phase) * amp +
      shift;
    this.color = color(r, g, b);
  }
}

let dots = [];

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  // create all dots
  const ratio = (sqrt(5) + 1) / 2;
  const golden = TWO_PI / (ratio * ratio);
  const c = 10;
  for (let n = 1; n <= 500; n++) {
    const phi = n * golden;
    const r = c * sqrt(n);
    const x = r * cos(phi);
    const y = r * sin(phi);
    dots.push(new Dot(x, y, random(0, 2), 400));
  }
}

function draw() {
  background(255);
  // draw the pattern
  translate(width / 2, height / 2);
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];
    dot.update();
    dot.show();
  }
}
