class Title{
    constructor(p){
        this.p = p;
    }
    setup(){
        
    }
    draw(){
        this.p.noStroke();
        this.p.background(hexToRgb(theme[theme.current].light));
        //this.p.push();
        //this.p.translate(this.p.width/2,this.p.height/2);
        //this.p.rotate(this.p.frameCount * 0.01);
        //this.p.square(-40,-40,80);
        //this.p.pop();
        this.p.textSize(72);
        this.p.textAlign(this.p.CENTER,this.p.CENTER);
        this.p.fill(hexToRgb(theme[theme.current].lightest));
        this.p.rect(79,507,235,99,10);
        this.p.rect(79,507,235,99,10);
        this.p.rect(79,628,146,70,10);
        this.p.rect(242,628,70,70,10);
        this.p.fill(hexToRgb("FFFFFF"));
        this.p.text("GridFill", 66, 63, 259, 104);
        this.p.square(46.5,176,300,10);
        this.p.fill(hexToRgb(theme[theme.current].blue));
        this.p.rect(62,192,126,268,10);
        this.p.fill(hexToRgb(theme[theme.current].pink));
        this.p.rect(204,192,126,126,10);
        this.p.fill(hexToRgb(theme[theme.current].green));
        this.p.rect(204,334,126,126,10);
        //this.p.rectangle(-40,-40,80);
    }
}
