function Bubble() {
	this.r = player.half * 6;

	this.show = function() {
		fill(51, 150);
		ellipse(player.position.x, player.position.y, this.r * 2);
	}

	this.touching = function(obj) {
		var d = dist(obj.position.x + obj.halfw, obj.position.y + obj.halfh, player.position.x, player.position.y);
		if (d < obj.halfw + this.r) {
			obj.offscreen = true;
		}
	}

}
