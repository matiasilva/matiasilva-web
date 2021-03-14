class Platform {
    
    constructor(initialHeight, initialWidth) {
        this.initialHeight = initialHeight;
        this.initialWidth = initialWidth;
        this.color = 240;
        this.thick = this.initialWidth*0.25
    }

    show(){
        fill(this.color);
        stroke(0);
        strokeWeight(3);
        rect(0, this.initialHeight, this.initialWidth, this.thick);
    }

    hover(){
        this.color = 240;
        if(this.override){
            this.initialHeight = constrain(mouseY, 0, height);
        }
        if(mouseX < this.initialWidth && mouseX > 0){
            if(mouseY < (this.initialHeight + this.thick) && mouseY > this.initialHeight){
                this.color = 200;
                if(mouseIsPressed){
                    this.override = true;
                }
            }
        }
    }
}