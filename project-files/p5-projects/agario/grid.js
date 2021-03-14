// use percentage zoom not absolute
class Grid {
  constructor(scaleX, scaleY, zoom) {
    this.width = windowWidth * scaleX;
    this.height = windowHeight * scaleY;
    this.rows = this.height / zoom;
    this.cols = this.width / zoom;
    this.zoom = zoom;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.originX = width * (1 - this.scaleX) * 0.5;
    this.originY = height * (1 - this.scaleY) * 0.5;
  }

  display(player) {
    stroke(180);
    strokeWeight(0.5);
    push();
    translate(this.originX, this.originY);
    for (let x = 0; x < this.cols; x++) {
      line(x * this.zoom, 0, x * this.zoom, this.height);
    }
    for (let y = 0; y < this.rows; y++) {
      line(0, y * this.zoom, this.width, y * this.zoom);
    }
    pop();
  }
}
