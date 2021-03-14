function Particle(x, y, firework) {
	this.pos = createVector(x, y);
	this.firework = firework;
	this.lifespan = 255;

	if (this.firework) {
		this.vel = createVector(0, 0);
	} else {
		this.vel = p5.Vector.random2D();
		this.vel.mult(random(15, 25));
		this.vel.y = (this.vel.y > 0) ? -this.vel.y : this.vel.y;
	}

	this.acc = createVector(0, 0);

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.update = function() {
		if (!this.firework) {
			this.vel.mult(0.9);
			this.lifespan -= 50;
		}
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	this.done = function() {
		return (this.lifespan < 0);
	}

	this.show = function() {
		strokeWeight(6);
		stroke(51);
		point(this.pos.x, this.pos.y);
	}

}
