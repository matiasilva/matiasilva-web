function Firework(gravity) {
	this.firework = new Particle(player.position.x, player.position.y, true);
	this.exploded = false;
	this.particles = [];

	this.done = function() {
		if (this.exploded && this.particles.length === 0) {
			this.explode();
		}
	}

	this.touching = function(obj) {
		var d = dist(player.position.x, player.position.y, obj.position.x, obj.position.y);
		if (d < 75 + obj.halfw){
      obj.offscreen = true;
    }
	}

	this.update = function() {
    this.firework.pos = player.position;
		if (!this.exploded) {
			this.firework.applyForce(gravity);
			this.firework.update();
			if (this.firework.vel.y > 0) {
				this.exploded = true;
				this.explode();
			}
		}
		for (var i = this.particles.length - 1; i >= 0; i--) {
			this.particles[i].applyForce(gravity);
			this.particles[i].update();
			if (this.particles[i].done()) {
//				print(dist(this.particles[i].pos.x, this.particles[i].pos.y, player.x, player.y));
				this.particles.splice(i, 1);
			}
		}
		this.done();
	}

	this.explode = function() {
		score -= 10;
		for (var i = 0; i < 25; i++) {
			var p = new Particle(this.firework.pos.x, this.firework.pos.y, false);
			this.particles.push(p);
		}
	}

	this.show = function() {
		if (!this.exploded) {
			this.firework.show();
		}
		for (var i = 0; i < this.particles.length; i++) {
			this.particles[i].show();
		}

	}


}
