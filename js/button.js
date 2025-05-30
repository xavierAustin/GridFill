class ButtonSkeleton{
    //font size isn't actually zero by default see line 21
    constructor(p, x, y, w, h, passedFuncs = {}, text = "", fontSize = 0){
        //handle half defined arguments
        //ie if only an onClick function is passed fill in the other functions with empty functions
        let funcs = {onClick: ()=>{},onHold: ()=>{},onRelease: ()=>{}};
        let keys = Object.getOwnPropertyNames(funcs);
        for (let i = 0; i < keys.length; i++)
            if (passedFuncs[keys[i]] != undefined)
                funcs[keys[i]] = passedFuncs[keys[i]];
        //init
        this.p = p;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.onClick = funcs.onClick;
        this.onHold = funcs.onHold;
        this.onRelease = funcs.onRelease;
        this.text = text;
        this.fontSize = fontSize? fontSize : h*0.6;
        this.state = "default";
    }
    draw(){
        //update
        if (this.p.mouseX < this.x || this.p.mouseX > this.x + this.w || this.p.mouseY < this.y || this.p.mouseY > this.y + this.h)
            this.state = "default";
        else if (this.p.mouseStatus.release)
            this.onRelease();
        else if (this.p.mouseStatus.click)
            this.onClick();
        else if (this.p.mouseStatus.held){
            this.onHold();
            this.state = "held";
        }else 
            this.state = "hover";
        //draw
        //actual button
        this.p.push();
        if (this.state != "held"){
            this.p.fill(hexToRgb(theme[theme.current].lightest));
            this.p.dropShadow(4, 6);
        }else
            this.p.fill(hexToRgb(theme[theme.current].light));
        this.p.rect(this.x,this.y,this.w,this.h,10);
        this.p.pop();
        //rendered text on button face
        this.p.push();
        this.p.fill(hexToRgb("FFFFFF"));
        this.p.textSize(this.fontSize);
        this.p.textAlign(this.p.CENTER,this.p.CENTER);
        //I don't know why center vertical alignment doesn't actually align the font to the center
        this.p.text(this.text,this.x,this.y-this.fontSize*0.2,this.w,this.h);
        this.p.pop();
        if (this.state == "hover"){
            this.p.fill(hexToRgb("FFFFFF55",true));
            this.p.rect(this.x,this.y,this.w,this.h,10);
        }
    }
}