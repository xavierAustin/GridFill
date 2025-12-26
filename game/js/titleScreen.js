class Title{
    constructor(p){
        this.p = p;
        this.buttons = [
            new ButtonSkeleton(p,79,507,235,99,{onRelease: ()=>{this.p.prvNxtScrns.push("ModeSelect")}},"Play"),
            new ButtonSkeleton(p,79,628,146,70,{onRelease: ()=>{this.p.prvNxtScrns.push("Shop")}},"Shop"),
            new ButtonSkeleton(p,242,628,70,70,{onRelease: ()=>{this.p.prvNxtScrns.push("Settings")}})
        ]
    }
    draw(){
        this.p.noStroke();
        //clear last frame and yk background colors yay
        this.p.background(hexToRgb(theme[theme.current].light));
        //draw buttons
        for (let i = 0; i < this.buttons.length; i++)
            this.buttons[i].draw();
        //icon for options button
        this.p.image(this.p.settingsIcon,242,628,70,70);
        //draw title
        this.p.push();
            this.p.translate(0,7*Math.sin(this.p.frameCount*0.03+0.7));
            this.p.push();
            this.p.fill(hexToRgb("FFFFFF"));
            this.p.dropShadow(4, 6);
            this.p.textSize(72);
            this.p.textAlign(this.p.CENTER,this.p.CENTER);
            this.p.text("GridFill", 0, 63, 393, 104);
            this.p.pop();
            //draw logo
            this.p.fill(hexToRgb(theme[theme.current].dark));
            this.p.square(46.5,176,300,10);
            this.p.fill(hexToRgb(theme[theme.current].blue));
            this.p.rect(62,192,126,268,10);
            this.p.fill(hexToRgb(theme[theme.current].pink));
            this.p.rect(204,192,126,126,10);
            this.p.fill(hexToRgb(theme[theme.current].darkest));
            this.p.rect(204,334,126,126,10);
        this.p.pop();
        this.p.push();
        this.p.translate(250,350+18*Math.sin(this.p.frameCount*0.03));
        this.p.rotate((3.14+Math.sin(this.p.frameCount*0.02))*0.10);
        this.p.fill(hexToRgb(theme[theme.current].green));
        this.p.dropShadow(4, 6);
        this.p.rect(-20,-20,126,126,10);
        this.p.pop();
    }
}
