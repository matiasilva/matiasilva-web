function BadGuy(xVal, yVal, wVal, hVal, xVel, yVel) {
	this.position = createVector(xVal, yVal);
	this.velocity = createVector(xVel, yVel);
	this.halfw = wVal / 2;
	this.halfh = hVal / 2;
	this.offscreen = false;
	score++;

	this.show = function() {
		rect(this.position.x, this.position.y, this.halfw * 2, this.halfh * 2);
	}

	this.update = function() {
		this.position.add(this.velocity);
		if (this.position.y > height || this.position.x < 0 || this.position.x > width) {
			this.offscreen = true;
		}
	}
}
