function Coin(xVal, yVal, radius, offset, xSpeed, ySpeed) {
	this.position = createVector(xVal, yVal);
	this.velocity = createVector(xSpeed, ySpeed);
	this.r = radius;
	this.offset = offset;
	this.killed = false;
	this.offscreen = false;

	this.show = function() {
		fill(229, 193, 0);
		ellipse(this.position.x + this.offset, this.position.y + this.offset / 2, this.r * 2);
		fill(255, 215, 0);
		ellipse(this.position.x, this.position.y, this.r * 2);
	}

	this.update = function() {
		this.position.add(this.velocity);
		if (this.position.y > height) {
			this.offscreen = true;
		}
	}

}
