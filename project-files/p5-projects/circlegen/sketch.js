var col = {
	r: 0,
	g: 0,
	b: 0,
	al: 0,
	mappedR : 0,
	mappedB : 0,
	mappedG : 0
};

var circle = {
	x: 0,
	y: 0,
	d: 20
};

var bool = true;
var n = 20;

function setup() {
	createCanvas(600, 300);
	background(0);
}

function draw() {
	col.mappedR = map(mouseX, 0, 600, 0, 255);
	col.mappedB = map(mouseY, 0, 600, 0, 255);
	col.mappedG = map(mouseX, 0, 600, 255, 0);
	col.r = random(col.mappedR - n, col.mappedR + n);
	col.g = random(col.mappedG - n, col.mappedR + n);
	col.b = random(col.mappedB - n, col.mappedB + n);
	col.al = random(255);
	circle.x = random(width);
	circle.y = random(height);
	circle.d = random(10, 30)
	fill(col.r, col.g, col.b, col.al);
	noStroke();
	ellipse(circle.x, circle.y, circle.d, circle.d);
}

function mousePressed() {
	bool = !bool;
	if (bool) {
		background(0);
	} else {
		background(255);
	}
}