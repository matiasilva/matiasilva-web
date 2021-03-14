let x, y, theta;
let circle, radius;

function setup() {
  createCanvas(windowWidth, windowHeight);
  circle = createGraphics(width * pixelDensity(), height * pixelDensity());

  theta = 0.2;
  radius = height * 0.9 * 0.5;

  circle.noFill();
  circle.strokeWeight(3);
  circle.translate(width / 2, height / 2);
  circle.strokeWeight(3);
  circle.ellipse(0, 0, radius * 2);
  circle.strokeWeight(10);
  circle.point(0, 0);
  circle.push();
  circle.drawingContext.lineCap = "butt";
  circle.drawingContext.setLineDash([9]);
  circle.strokeWeight(2);
  circle.line(0, 0, radius, 0);
  circle.line(0, 0, 0, radius);
  circle.line(0, 0, -radius, 0);
  circle.line(0, 0, 0, -radius);
  circle.pop();

  circle.push();
  let instructions = [
    { step: PI / 6, text: "PI/6" },
    { step: PI / 4, text: "PI/4" }
  ];
  circle.pop();
}

function draw() {
  background(240);

  x = cos(theta) * radius;
  y = -sin(theta) * radius;
  theta += 0.0075;

  image(circle, 0, 0, width, height);

  strokeWeight(3);
  stroke(24, 70, 137);
  translate(width * 0.5, height * 0.5);
  line(0, 0, x, y);

  push();
  drawingContext.lineCap = "butt";
  drawingContext.setLineDash([9]);
  stroke(76, 140, 202);
  line(x, 0, x, y);
  stroke(76, 140, 202);
  line(0, 0, x, 0);
  pop();

  strokeWeight(10);
  stroke(244, 67, 54);
  point(x, y);
}
