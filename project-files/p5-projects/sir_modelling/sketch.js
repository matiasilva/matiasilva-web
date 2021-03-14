let simulation;
let framesPerDay = 60 * 0.5;
let grapher;

function setup() {
  buildTables();
  simulation = new Simulation(250, framesPerDay);
  grapher = new Grapher(simulation);
}

function draw() {
  background(51);
  for (let i = 0; i < 2; i++) {
    simulation.update();
    if (frameCount % framesPerDay == 0) {
      simulation.step();
      grapher.addData(simulation);
    }
  }
  simulation.show();
}

function getDaysElapsed() {
  return floor(frameCount / framesPerDay);
}

function buildTables() {
  const divContainer = select('.block-draw');
  // let len = min(divContainer.elt.offsetWidth, divContainer.elt.offsetHeight);
  let canvas = createCanvas(
    divContainer.elt.offsetWidth,
    divContainer.elt.offsetHeight
  );
  canvas.parent(divContainer);
}
