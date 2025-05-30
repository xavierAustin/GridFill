class Title{
    constructor(p){
        this.p = p;
        this.start = new ButtonSkeleton(p,79,507,235,99,{onRelease: ()=>{this.p.currentScreen = "PlayConfig"}},"Play");
        this.shop = new ButtonSkeleton(p,79,628,146,70,{onRelease: ()=>{this.p.currentScreen = "Shop"}},"Shop");
        this.options = new ButtonSkeleton(p,242,628,70,70,{onRelease: ()=>{this.p.currentScreen = "Options"}});
    }
    draw(){
        this.p.noStroke();
        //clear last frame and yk background colors yay
        this.p.background(hexToRgb(theme[theme.current].light));
        //draw buttons
        this.start.draw();
        this.shop.draw();
        this.options.draw();
        //icon for options button
        this.p.image(this.p.settingsIcon,250,635,56,56);
        //draw title
        this.p.push();
        this.p.fill(hexToRgb("FFFFFF"));
        this.p.dropShadow(4, 6);
        this.p.textSize(72);
        this.p.textAlign(this.p.CENTER,this.p.CENTER);
        this.p.text("GridFill", 66, 63, 259, 104);
        this.p.pop();
        //draw logo
        this.p.fill(hexToRgb("FFFFFF"));
        this.p.square(46.5,176,300,10);
        this.p.fill(hexToRgb(theme[theme.current].blue));
        this.p.rect(62,192,126,268,10);
        this.p.fill(hexToRgb(theme[theme.current].pink));
        this.p.rect(204,192,126,126,10);
        this.p.fill(hexToRgb(theme[theme.current].green));
        this.p.rect(204,334,126,126,10);
    }
}
