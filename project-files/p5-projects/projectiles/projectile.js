class Projectile {

    constructor(posx, posy, shape, size, platform){
        this.position = createVector(posx, posy);
        this.velocity = createVector(0, 0);
        this.shape = shape;
        this.size = size;
        this.platform = platform;
        this.stage = 1;
        this.theta = 0;
        this.deg = 0;
        this.color = 255;
        this.override = false;
        this.locationhistory = createGraphics(width, height);
        this.px;
        this.py;
    }

    show() {
        if(this.shape == "circle"){
            fill(this.color);
            stroke(0);
            push();
            translate(this.position.x, this.position.y);
            rotate(this.theta);
            ellipse(0, 0, this.size*2);
            line(0, 0, this.size, 0);
            pop();
            image(this.locationhistory, 0, 0, width, height);
            noStroke();
            fill(0);
            text("a = " + this.deg, this.platform.initialWidth*0.5, this.platform.initialHeight+this.platform.thick*0.5);
        }
        else if(this.shape == "rectangle"){

        }
    }

    physics() {
        // no launch
        if(this.stage == 1){
            this.position.y = this.platform.initialHeight - this.size;
            this.position.x = this.platform.initialWidth - this.size;
        }
        else if (this.stage == 2){
            this.locationhistory.stroke(255);
            this.locationhistory.point(this.position.x, this.position.y);
            this.velocity.add(gravity);
            this.position.add(this.velocity);
            if(this.px || this.py){
                this.locationhistory.line(this.px, this.py, this.position.x, this.position.y);
            }
            this.px = this.position.x;
            this.py = this.position.y;

            if(this.position.y+this.size > height) this.stage = 3;
        }
        else if (this.stage == 3){
            this.position.y = height-this.size;
        }
    }

    hover(){
        if(this.stage == 1){
        this.color = 255;
        if(this.override && !this.platform.override){
            if(mouseY < pmouseY){
                this.theta -= radians(2);
                this.deg += 2;
            }
            else if(mouseY > pmouseY){
                this.theta += radians(2);
                this.deg -= 2;
            }
            this.theta = constrain(this.theta, -HALF_PI, 0);
            this.deg = constrain(this.deg, 0, 90);
        }
        if(this.shape == "circle"){
            let d = (mouseX-this.position.x)*(mouseX-this.position.x) + (mouseY-this.position.y)*(mouseY-this.position.y)
            if(d < this.size*this.size){
                this.color = 230;
                if(mouseIsPressed){
                    this.override = true;
                }
            }
        }
    }
    }

    launched(){
        // projectile launched
        this.stage = 2;
        this.velocity = p5.Vector.fromAngle(this.theta);
        this.velocity.mult(random(10, 15));
        this.px = this.position.x;
        this.py = this.position.y;
    }

    reset(){
        this.stage = 1;
        this.locationhistory.clear();
        this.theta = 0;
        this.deg = 0;
    }
}