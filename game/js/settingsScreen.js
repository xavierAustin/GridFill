class Settings{
    constructor(p){
        this.p = p;
        this.buttons = [
            new ButtonSkeleton(p,24,64,70,70,{onRelease: ()=>{this.p.prvNxtScrns.pop()}}),
            new ButtonSkeleton(p,24 ,183,70,70,{onRelease: ()=>{
                let temp = Object.keys(theme);
                theme.current = temp[temp.indexOf(theme.current) - 1];
                if (!theme.current)
                    theme.current = temp[temp.length - 3];
                p.reloadScreens();
            }},"<"),
            new ButtonSkeleton(p,300,183,70,70,{onRelease: ()=>{
                let temp = Object.keys(theme);
                theme.current = temp[temp.indexOf(theme.current) + 1];
                if (theme.current == "current")
                    theme.current = temp[0];
                p.reloadScreens();
            }},">"),
            new ButtonSkeleton(p,24,243+60,346,70,{onRelease: ()=>{this.p.prvNxtScrns.push("Title")}},"Quit To Menu",theme[theme.current].red),
            new ButtonSkeleton(p,24,333+60,346,70,{onRelease: ()=>{this.p.prvNxtScrns.push("ConfirmUnlock")}},"Unlock All",theme[theme.current].orange),
            new ButtonSkeleton(p,24,423+60,346,70,{onRelease: ()=>{this.p.prvNxtScrns.push("ConfirmReset")}},"Reset Progress",theme[theme.current].red),
            new ButtonSkeleton(p,24 ,563+50,83,83,{onHold: ()=>{this.p.volume.mas = Math.min(this.p.volume.mas + 0.02, 1)}},"+"),
            new ButtonSkeleton(p,24 ,656+50,83,83,{onHold: ()=>{this.p.volume.mas = Math.max(this.p.volume.mas - 0.02, 0)}},"\u2012"),
            new ButtonSkeleton(p,155,563+50,83,83,{onHold: ()=>{this.p.volume.bgm = Math.min(this.p.volume.bgm + 0.02, 1)}},"+"),
            new ButtonSkeleton(p,155,656+50,83,83,{onHold: ()=>{this.p.volume.bgm = Math.max(this.p.volume.bgm - 0.02, 0)}},"\u2012"),
            new ButtonSkeleton(p,286,563+50,83,83,{onHold: ()=>{this.p.volume.sfx = Math.min(this.p.volume.sfx + 0.02, 1)}},"+"),
            new ButtonSkeleton(p,286,656+50,83,83,{onHold: ()=>{this.p.volume.sfx = Math.max(this.p.volume.sfx - 0.02, 0)}},"\u2012")
        ];
    }
    draw(){
        this.p.noStroke();
        //clear last frame and yk background colors yay
        this.p.background(hexToRgb(theme[theme.current].light));
        //draw buttons
        for (let i = 0; i < this.buttons.length; i++)
            this.buttons[i].draw();
        //icon for return button
        this.p.image(this.p.returnIcon,24,64,70,70);
        //setup to draw text
        this.p.push();
        this.p.fill(hexToRgb("FFFFFF"));
        this.p.dropShadow(4, 6);
        this.p.textAlign(this.p.CENTER,this.p.CENTER);
        //draw volume values
        this.p.textSize(38);
        this.p.text(Math.round(this.p.volume.mas*100), 24, 743+50, 83, 41);
        this.p.text(Math.round(this.p.volume.bgm*100), 155, 743+50, 83, 41);
        this.p.text(Math.round(this.p.volume.sfx*100), 286, 743+50, 83, 41);
        //draw screen title
        this.p.textSize(45);
        this.p.text("Settings", 0, 64, 393, 70);
        //draw volume names
        this.p.textSize(24);
        this.p.dropShadow(4, 4);
        this.p.text("Master", 24, 513+50, 83, 41);
        this.p.text("BGM", 155, 513+50, 83, 41);
        this.p.text("SFX", 286, 513+50, 83, 41);
        //section names
        this.p.text("Theme", 155, 140, 83, 41);
        this.p.text("Administrative", 155, 255, 83, 41);
        //theme name
        this.p.fill(hexToRgb(theme[theme.current].lightest));
        this.p.dropShadow(4, 6);
        this.p.rect(104,183,186,70,10);
        this.p.dropShadow(4, 4);
        this.p.textSize(35);
        this.p.fill(hexToRgb("FFFFFF"));
        this.p.text(capitalizeFirst(theme.current),104,178,186,70);
        this.p.pop();
    }
}
