
class PIECE{
    constructor(p,pieces,index,x = 0,y = 0){
        this.shape = pieces[index];
        this.pieces = pieces;
        this.p = p;
        this.x = x;
        this.y = y;
    }
    draw(){
        //update
        if (this.p.mouseX < this.x || this.p.mouseX > this.x + this.w || this.p.mouseY < this.y || this.p.mouseY > this.y + this.h)
            this.state = "default";
        else if (this.p.mouseStatus.held)
            this.state = "held";
        else 
            this.state = "hover";
        
    }
}