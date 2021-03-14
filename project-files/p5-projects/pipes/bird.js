function Bird() {
    this.x = 100;
    this.y = height / 2;
    this.gravity = 0.6;
    this.speedY = 0;
    this.lift = 15;

    this.update = function() {
        this.speedY += this.gravity;
        this.speedY *= 0.9;
        this.y += this.speedY;
        if (this.y > height) {
            this.y = height;
            this.speedY = 0;
        }
    }

    this.show = function() {
        fill(255);
        noStroke();
        ellipse(this.x, this.y, 20, 20);
    }

    this.up = function() {
        this.speedY -= this.lift;
    }
}
