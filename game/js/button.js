class ButtonSkeleton{
    //font size isn't actually zero by default see line 21
    constructor(p, x, y, w, h, passedFuncs = {}, text = "", textcolor = "FFFFFF", backcolor = theme[theme.current].lightest, align = null, fontSize = 0){
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
        this.textcolor = textcolor;
        this.backcolor = backcolor;
        this.align = align ? align : this.p.CENTER;
    }
    activate(){
        if (this.state == "inactive")
            this.state = "default"
    }
    deactivate(){
        if (this.state != "inactive")
            this.state = "inactive"
    }
    draw(){
        if (this.state == "inactive")
            return;
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
            this.p.fill(hexToRgb(this.backcolor));
            this.p.dropShadow(4, 6);
            this.p.rect(this.x,this.y,this.w,this.h,10);
        }else{
            this.p.fill(hexToRgb(theme[theme.current].light));
            this.p.rect(this.x,this.y,this.w,this.h,10);
            this.p.fill(hexToRgb("00000064",1));
            this.p.rect(this.x,this.y,this.w,this.h,10);
            let temp = hexToRgb(theme[theme.current].light)
            temp[3] = 0x18;
            this.p.fill(temp);
            for (let i = 0; i < 17; i++)
                this.p.rect(this.x+i,this.y+i+8,this.w-i*2,this.h-i-8,20,20,10);
        }
        this.p.pop();
        //rendered text on button face
        this.p.push();
        this.p.fill(hexToRgb(this.textcolor));
        this.p.textSize(this.fontSize);
        this.p.textAlign(this.align,this.p.CENTER);
        //I don't know why center vertical alignment doesn't actually align the font to the center
        this.p.text(this.text,this.x,this.y-this.fontSize*0.2,this.w,this.h);
        this.p.pop();
        if (this.state == "hover"){
            let temp = hexToRgb(this.textcolor)
            temp[3] = 0x55;
            this.p.fill(temp,true);
            this.p.rect(this.x,this.y,this.w,this.h,10);
        }
    }
}