function Player(xVal, distance) {
	this.half = distance / 2;
	this.position = createVector(xVal - this.half, height - this.half);
	this.killed = false;

	this.show = function() {
		fill(231, 76, 60, 255);
		triangle(this.position.x, this.position.y - this.half, this.position.x - this.half, this.position.y + this.half, this.position.x + this.half, this.position.y + this.half);
	}

	this.update = function() {
		if (keyIsDown(LEFT_ARROW)) {
			this.position.x += -8;
		} else if (keyIsDown(RIGHT_ARROW)) {
			this.position.x += +8;
		} else if(pmouseX != mouseX){
			this.position.x = mouseX;
		}
		if(this.position.x< 0){
			this.position.x = 0;
		}
		else if(this.position.x > width){
			this.position.x = width;
		}
	}


	this.touching = function(obj) {
		if (obj instanceof BadGuy) {
			var d = dist(this.position.x, this.position.y, obj.position.x + obj.halfw, obj.position.y + obj.halfh);
			if (d < this.half + obj.halfw) {
				this.killed = true;
			}
		} else if (obj instanceof Coin) {
			var d = dist(obj.position.x + obj.offset / 2, obj.position.y + obj.offset / 4, this.position.x, this.position.y);
			if (d < obj.r + obj.offset / 2 + this.half) {
				score += 100;
				obj.offscreen = true;
			}
		}
	}

}
