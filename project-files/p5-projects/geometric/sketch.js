var xPInput;
var sclInput;
var aInput;
var a = 1;
var xP = -4;
var P;
var Q;
var S;
var scl = 20;
var cols;
var rows;
var xaxis;
var yaxis;
var focus = {
	x: 0,
	y: a
}

function setup() {
	createCanvas(600, 600);
	stroke(255, 100);
	strokeWeight(1);
	refresh();
	xPInput = createInput(xP, "number");
	xPInput.style("width", "50px");
  xPInput.changed(function(){
    xP = int(this.value());
    refresh();
  });
	aInput = createInput(a, "number");
	aInput.style("width", "50px");
  aInput.attribute("min", "1");
  aInput.changed(function(){
    a = int(this.value());
    refresh();
  });
	sclInput = createInput(scl, "number");
	sclInput.attribute("step", "5");
	sclInput.style("width", "50px");
  sclInput.attribute("min", "5");
  sclInput.changed(function(){
    scl = int(this.value());
    refresh();
  });
}

function draw() {
	background(51);
	for (var i = scl; i < width; i += scl) {
		line(i, 0, i, height);
	}
	for (var i = scl; i < height; i += scl) {
		line(0, i, width, i);
	}
	push();
	strokeWeight(3);
	stroke(255);
	line(yaxis, 0, yaxis, height);
	line(0, xaxis, width, xaxis);
	pop();
	//directrix
	push();
	stroke(255, 0, 0);
	strokeWeight(3);
	line(0, xaxis + a * scl, width, xaxis + a * scl);
	pop();
	//parabola
	push();
	noFill();
	stroke(0, 0, 255);
	strokeWeight(3);
	translate(width / 2, height / 2);
	beginShape();
	for (var x = -cols; x < cols; x++) {
		vertex(x * scl, (pow(x, 2) / (4 * a)) * -scl);
	}
	endShape();
	pop();
	//focal chords + tangents
	push();
	stroke(255, 0, 100);
	strokeWeight(3);
	line(yaxis + P.x * scl, xaxis - P.y * scl, yaxis + Q.x * scl, xaxis - Q.y * scl);
	line(yaxis + P.x * scl, xaxis - P.y * scl, yaxis + S.x * scl, xaxis - S.y * scl);
	line(yaxis + Q.x * scl, xaxis - Q.y * scl, yaxis + S.x * scl, xaxis - S.y * scl);
	pop();
	//focus
	push();
	stroke(0, 255, 0);
	strokeWeight(8);
	point(focus.x * scl + yaxis, xaxis - focus.y * scl);
	stroke(0, 255, 0, 150);
	point(S.x * scl + yaxis, xaxis - S.y * scl);
	point(Q.x * scl + yaxis, xaxis - Q.y * scl);
	point(P.x * scl + yaxis, xaxis - P.y * scl);
	pop();
}

function refresh() {
	cols = width / scl;
	rows = height / scl;
	yaxis = cols / 2 * scl;
	xaxis = rows / 2 * scl;
  P = {
		x: xP,
		y: (pow(xP, 2) / (4 * a))
	};
	var tempX = (-4 * pow(a, 2)) / P.x;
	var tempY = (4 * pow(a, 3)) / pow(P.x, 2);
	Q = {
		x: tempX,
		y: tempY
	}
	S = {
		x: ((-4 * pow(a, 2)) + pow(P.x, 2)) / (2 * P.x),
		y: -a
	}
  focus = {
  	x: 0,
  	y: a
  }
}
