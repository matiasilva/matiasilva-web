function PipePair() {
    this.x = width;
    this.width = 30;
    this.distance = 150;
    this.p1height = floor(random(20, height - 200));
    this.p2height = this.p1height + this.distance;
    this.p1y = 0;
    this.vel = 2;

    this.show = function() {
        noStroke()
        fill(255, 0, 100);
        rect(this.x, this.p1y, this.width, this.p1height);
        rect(this.x, this.p2height, this.width, height - this.p2height);
    }
    this.update = function() {
        this.x -= this.vel;
    }
    this.isOffScreen = function() {
        return this.x < 0;
    }

    this.isHitting = function(bird) {
        if (bird.x > this.x && bird.x < this.x + this.width) {
            if (bird.y < this.p1height || bird.y > this.p2height) {
                return 1;
            } else if (bird.y > this.p1height && bird.y < this.p2height) {
                return 2
            }
        }
        return 0;
    }

}
