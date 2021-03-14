class Bird extends CircularBody{
    constructor(x, y, r){
        const opts = {
            restitution: 0.3,
            label: "bird"
        };
        super(x, y, r, opts);
        this.originalPosition = {x: x, y: y};
        this.hasSlingshot = false;
        this.color = presets['yellow'];
        this.addSlingshot(this.originalPosition);
        Body.setDensity(this.body, 0.8);

    }

    removeSlingshot(){
        if(this.hasSlingshot){
        this.hasSlingshot = false;
        World.remove(engine.world, this.slingshot);
        }
    }
  
    reset(){
      if(!this.hasSlingshot){
        Body.setPosition(this.body, this.originalPosition);
        this.addSlingshot(this.originalPosition);
      }
    }

    addSlingshot(pos){
      if(!this.hasSlingshot){
        this.hasSlingshot = true;
        this.slingshot = Constraint.create({
            pointA: {x:pos.x+1, y:pos.y-50},
            bodyB: this.body,
            stiffness: 0.1,
        });
        World.add(engine.world, this.slingshot);
      }
    }

    show(){
        const {position} = this.body;
        push();
        fill(this.color);
        noStroke();
        translate(position.x, position.y);
        circle(0, 0, this.r*2)
        pop();       
        if(this.hasSlingshot){ 
            const {pointA} = this.slingshot;
            stroke(0);
            line(position.x, position.y, pointA.x, pointA.y)
        }
    }

}