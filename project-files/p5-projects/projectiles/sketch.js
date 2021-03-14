let c;
let projectile;
let gravity;

function setup() {
    createCanvas(windowWidth, windowHeight);
    c = new Platform(200, 200);
    projectile = new Projectile(c.initialHeight, c.initialWidth*0.5, "circle", 20, c);
    gravity = createVector(0, 0.5);
    textAlign(CENTER, CENTER);
    textSize(32);
}

function draw() {
    background(51);
    c.hover();
    c.show();
    projectile.hover();
    projectile.physics();
    projectile.show();

}

function keyPressed(){
    if(key == ' '){
        if(projectile.stage == 1) projectile.launched();
        if(projectile.stage == 3) projectile.reset();
    }
}

function mouseReleased(){
    if(c.override) c.override = false;
    if(projectile.override) projectile.override = false;
}