function Ball(_x, _y) {
	this.position = createVector(_x, _y);
	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);
	this.r = 10;
	this.c = color(253, 116, 0);
	this.mass = 1;
	this.still = false;
	this.show = function () {
		fill(this.c);
		ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
	}
	this.update = function () {
		if (!this.still) {
			this.velocity.add(this.acceleration);
			this.position.add(this.velocity);
			this.acceleration.mult(0);
			this.velocity.mult(0.99);
			this.applyForce(gravity);
			if (this.position.y > height) {
				songs.fail.play();
				restartLevel();
			}
		}
	}
	this.applyForce = function (force) {
		var f = p5.Vector.div(force, this.mass);
		this.acceleration.add(f);
	}
}
