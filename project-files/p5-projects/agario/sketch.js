let mapSize, fmap, player, grid;

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  grid = new Grid(2, 2, 50);
  fmap = new FoodMap(50, grid);
  player = new Player();
}

function draw() {
  background(252, 255, 255);
  push();
  let offset = player.position;
  translate(-offset.x, -offset.y);
  grid.display(player);
  fmap.update(player);
  pop();
  player.display();
  player.steer();
}
