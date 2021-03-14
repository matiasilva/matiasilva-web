function Heptagon(xVal, yVal, xVel, yVel, size) {
	this.position = createVector(xVal, yVal);
	this.velocity = createVector(xVel, yVel);
	this.len = size;
	this.toDelete = random(0.8 * height);
	this.delete = false;

	this.polygon = function(x, y, radius, npoints) {
		this.angle = TWO_PI / npoints;
		beginShape();
		for (var a = 0; a < TWO_PI; a += this.angle) {
			this.sx = x + cos(a) * radius;
			this.sy = y + sin(a) * radius;
			vertex(this.sx, this.sy);
		}
		endShape(CLOSE);
	}

	this.show = function() {
		this.polygon(this.position.x, this.position.y, this.len, 7);
	}

	this.update = function() {
		this.position.add(this.velocity);
		if (this.position.y > this.toDelete) {
			this.delete = true;
			this.transform();
		}
	}

	this.transform = function() {
		this.choice = random();
		if (this.choice < 0.25) {
			coins.push(new Coin(this.position.x, this.position.y, 10, 2.8, 0, 3));
		} else {
			badGuys.push(new BadGuy(this.position.x-15, this.position.y-15, 30, 30, 0, random((3 * factor - factor), (3 * factor + factor))));
		}
	}

}
