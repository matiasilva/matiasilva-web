function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  background(51);
  noFill();
  strokeWeight(5);
  for (let i = 0; i < 500; i++) {
    stroke(255, 0, 0);
    let rw = random();
    let rh = random();
    point(rw * width, rh * height);
    stroke(0, 255, 0);
    let x = lerp(0, width, rw);
    let y = lerp(0, height, rh);
    point(x, y);
  }

  noLoop();
}

function draw() {}
