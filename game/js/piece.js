
class PIECE{
    constructor(p,pieces,index,x = 0,y = 0){
        this.shape = pieces[index];
        this.pieces = pieces;
        this.p = p;
        this.x = x;
        this.y = y;
        let max = {x: 0, y: 0};
        for (let i = 0; i < this.shape.length; i++){
            if (this.shape[i].x > max.x)
                max.x = this.shape[i].x;
            if (this.shape[i].y > max.y)
                max.y = this.shape[i].y;
        }
        this.h = max.x;
        this.w = max.y;
    }
    draw(){
        //update
        if (this.p.mouseX < this.x || this.p.mouseX > this.x + this.w || this.p.mouseY < this.y || this.p.mouseY > this.y + this.h)
            this.state = "default";
        else if (this.p.mouseStatus.held)
            this.state = "held";
        
    }
}