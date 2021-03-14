function Player(_position) {
	this.position = _position.copy();
	this.history = [];
	this.history.push(this.position);

	this.show = function() {
		for (var i = this.history.length - 1; i >= 0; i--) {
			rect(this.history[i].x * w, this.history[i].y * w, w, w);
		}
	}

	this.check = function() {
		if (this.position.x == maze[maze.length - 1].c && this.position.y == maze[maze.length - 1].r) {
			state = 1;
		}
	}
}
