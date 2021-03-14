let presets = {
  groundHeight: 30
};
const { Engine, World, Bodies, Body, Mouse, MouseConstraint, Constraint } = Matter;
let engine;
let ground, bird, obstacles = [];
let mouseConstraint;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  engine = Engine.create();

  presets['blue'] = color("#abc2e8");
  presets['yellow'] = color("#efee9d");
  presets['green'] = color("#d1eaa3");
  presets['purple'] = color("#dbc6eb");
  
  presets['ball'] = {x: width*0.25, y: height*0.8};
  
  rectMode(CENTER);
  imageMode(CENTER);
  
  const {groundHeight, ball} = presets;
  ground = new Platform(width/2, height-groundHeight*0.5, width, groundHeight);
  const pyr = Helper.generatePyramid(6, 50, 50, 5, width*0.6, height*0.2);
  for(let i = 0; i < pyr.coords.length; i++){
    let loc = pyr.coords[i];
    val = new Obstacle(loc.x, loc.y, pyr.w, pyr.h);
    obstacles.push(val);
  }
  bird = new Bird(ball.x, ball.y, 20, engine.world);

  let mouse = Mouse.create(cnv.elt);
    mouse.pixelRatio = pixelDensity();
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse
  });
  World.add(engine.world, mouseConstraint);
}

function draw() {
  background(presets['blue']);
  Engine.update(engine);
  ground.show();
  for(let obstacle of obstacles){
    obstacle.show();
  }
  bird.show();
}

function mouseReleased(){
  const body = mouseConstraint.body;
  if(body){
    if(body.label == "bird"){
      // detach here, strictly should verify frames
      setTimeout(() => {
        bird.removeSlingshot();
      }, 10);
    }
  }
}

function keyPressed(){
  if (key == ' '){
    bird.reset(presets['ball']);
  }
}

class Helper {

  static generatePyramid(depth, w, h, spacing = 0, sx = 0, sy = 0){
    let output = {
      w: w,
      h: h,
      coords: []
    };
    let box = {
      width: w*depth,
      height: h*depth
    }
    let debugBox = {
      width: box.width + spacing*(depth-1) + sx,
      height: box.height + spacing*(depth-1) + sy,
    }
    output['debug'] = debugBox;
    let deltaY = box.height / depth;
    let deltaX = box.width / (2*depth);
    let offsetY = deltaY*0.5;
    for(let row = 0; row < depth; row++){
      let offsetX = deltaX * (depth - row) + 0.5 * spacing * (depth - row - 1);
      for(let j = 0; j <= row; j++){
        output.coords.push({
          x: offsetX + deltaX*2*j + spacing*j + sx,
          y: offsetY + deltaY*row + spacing*row + sy,
        })
      }
    }
    return output;
  }
}
