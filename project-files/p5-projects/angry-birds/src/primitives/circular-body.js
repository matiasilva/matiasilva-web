class CircularBody {
    constructor(x, y, r, opts){
        this.body = Bodies.circle(x, y, r, opts);
        this.r = r;
        this.color = presets['yellow'];
        World.add(engine.world, this.body);
      }
    
    show(){
        const {position} = this.body;
        push();
        fill(this.color);
        noStroke();
        translate(position.x, position.y);
        circle(0, 0, this.r*2)
        pop();
    }
}