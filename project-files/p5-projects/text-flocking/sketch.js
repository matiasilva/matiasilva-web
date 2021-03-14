// rainbow algorithm taken from: https://krazydad.com/tutorials/makecolors.php

let font, bounds;
let vehicles = [];
const fontSize = 200;

function preload() {
  font = loadFont('Bubblegum.ttf');
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  text = prompt('Enter text (< 10 chars)', 'rainbow');
  bounds = getCenterCoords(font, text, fontSize);
  let { x, y, w, h } = bounds;
  let points = font.textToPoints(text, x, y, fontSize, {
    sampleFactor: 0.1,
    simplifyThreshold: 0
  });
  let rainbow = makeRainbow(points.length);
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    let col = rainbow[i];
    vehicles.push(new Vehicle(p.x, p.y, col));
  }
}

function draw() {
  background(255);
  for (const v of vehicles) {
    let mouse = createVector(mouseX, mouseY);
    v.steer(mouse);
    v.update();
    v.show();
  }
  // stroke(230);
  // noFill();
  // let { x, y, w, h } = bounds;
  // rect(x, y - h, w, h);
}

function getCenterCoords(glyph, textContent, size) {
  let bbox = glyph.textBounds(textContent, 0, 0, size);
  return {
    x: (width - bbox.w) * 0.5,
    y: (height + bbox.h) * 0.5,
    w: bbox.w,
    h: bbox.h
  };
}

function makeRainbow(len) {
  const shift = 128;
  const amp = 127;
  const frequency = TWO_PI / len;
  const phase = PI / 2;
  const colors = [];
  let r, g, b;
  for (let i = 0; i < len; ++i) {
    r = sin(frequency * i + 0 + phase) * amp + shift;
    g = sin(frequency * i + (2 * PI) / 3 + phase) * amp + shift;
    b = sin(frequency * i + (4 * PI) / 3 + phase) * amp + shift;
    colors.push({ r, g, b });
  }
  return colors;
}
