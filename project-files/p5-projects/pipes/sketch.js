var array = [];
var b;
var score = 0;

function setup() {
    createCanvas(400, 600);
    b = new Bird();
    array.push(new PipePair());
}

function draw() {
    background(51);
    for (var i = array.length - 1; i >= 0; i--) {
        array[i].update();
        array[i].show();
        evaluateStep(array[i]);
        offScreen(array[i], i);
    }
    b.update();
    b.show();
    makePipe();
}

function makePipe(){
  if (frameCount % 100 === 0) {
      array.push(new PipePair());
  }
}

function evaluateStep(bird){
  if (bird.isHitting(b) === 1) {
      background(255, 0, 0);
  } else if (bird.isHitting(b) === 2) {
      score++;
      scorePrint();
  }
}

function keyPressed() {
    if (key === ' ') {
        b.up();
    }
}

function offScreen(bird, k) {
    if (bird.isOffScreen()) {
        array.splice(k, 1);
    }
}

function scorePrint() {
    if (score % 14 === 0) {
        console.log(score / 14);
    }
}
