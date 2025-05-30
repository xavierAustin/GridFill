class Settings{
    constructor(p){
        this.p = p;
        this.buttons = [
            new ButtonSkeleton(p,24,64,70,70,{onRelease: ()=>{this.p.prvNxtScrns.pop()}},"<"),
            new ButtonSkeleton(p,24 ,550,83,96,{onHold: ()=>{this.p.volume.mas = Math.min(this.p.volume.mas + 0.02, 1)}},"+"),
            new ButtonSkeleton(p,24 ,656,83,96,{onHold: ()=>{this.p.volume.mas = Math.max(this.p.volume.mas - 0.02, 0)}},"\u2012"),
            new ButtonSkeleton(p,155,550,83,96,{onHold: ()=>{this.p.volume.bgm = Math.min(this.p.volume.bgm + 0.02, 1)}},"+"),
            new ButtonSkeleton(p,155,656,83,96,{onHold: ()=>{this.p.volume.bgm = Math.max(this.p.volume.bgm - 0.02, 0)}},"\u2012"),
            new ButtonSkeleton(p,286,550,83,96,{onHold: ()=>{this.p.volume.sfx = Math.min(this.p.volume.sfx + 0.02, 1)}},"+"),
            new ButtonSkeleton(p,286,656,83,96,{onHold: ()=>{this.p.volume.sfx = Math.max(this.p.volume.sfx - 0.02, 0)}},"\u2012")
        ];
    }
    draw(){
        this.p.noStroke();
        //clear last frame and yk background colors yay
        this.p.background(hexToRgb(theme[theme.current].light));
        //draw buttons
        for (let i = 0; i < this.buttons.length; i++)
            this.buttons[i].draw();
        //setup to draw text
        this.p.push();
        this.p.fill(hexToRgb("FFFFFF"));
        this.p.dropShadow(4, 6);
        this.p.textAlign(this.p.CENTER,this.p.CENTER);
        //draw volume values
        this.p.textSize(38);
        this.p.text(Math.round(this.p.volume.mas*100), 24, 756, 83, 41);
        this.p.text(Math.round(this.p.volume.bgm*100), 155, 756, 83, 41);
        this.p.text(Math.round(this.p.volume.sfx*100), 286, 756, 83, 41);
        //draw screen title
        this.p.textSize(54);
        this.p.text("Settings", 0, 143, 393, 83);
        //draw volume names
        this.p.textSize(24);
        this.p.dropShadow(4, 4);
        this.p.text("Master", 24, 500, 83, 41);
        this.p.text("BGM", 155, 500, 83, 41);
        this.p.text("SFX", 286, 500, 83, 41);
        this.p.pop();
    }
}
