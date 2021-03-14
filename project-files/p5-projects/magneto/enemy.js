function Enemy(_x, _y) {
	this.position = createVector(_x, _y);
	this.position2 = null;
	this.velocity = createVector(0, 0);
	this.acceleration = p5.Vector.sub(ball.position, this.position);
	this.acceleration.setMag(0.5);
	this.d = 50;
	this.mass = 1;
	this.toDelete = false;
	this.c = color(51);
	this.angle = null;
	this.findAngle = function () {
		this.angle = atan2(ball.position.y - this.position.y, ball.position.x - this.position.x)
	}
	this.update = function () {
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		this.velocity.mult(0.99);
		if (this.position.x < 0 || this.position.x > width || this.position.y < 0 || this.position.y > height) {
			this.toDelete = true;
		}
	}
	this.show = function () {
		this.position2 = createVector(floor(this.position.x + cos(this.angle) * this.d), floor(this.position.y + sin(this.angle) * this.d));
		push();
		strokeWeight(6);
		stroke(this.c);
		line(this.position.x, this.position.y, this.position2.x, this.position2.y);
		pop();
	}
	this.touching = function (b) {
		var d = dist(b.position.x, b.position.y, this.position2.x, this.position2.y);
		if (d < b.r) {
			var finalV = (p5.Vector.add(p5.Vector.mult(b.velocity, b.mass), p5.Vector.mult(this.velocity, this.mass)))
				.div(b.mass + this.mass);
			b.velocity.add(finalV);
			this.toDelete = true;
		}
	}
}
