class ModeSelect{
    constructor(p){
        this.p = p;
        this.buttons = [
            new ButtonSkeleton(p,24,64,70,70,{onRelease: ()=>{this.p.prvNxtScrns.pop()}}),
            new ButtonSkeleton(p,299,64,70,70,{onRelease: ()=>{this.p.prvNxtScrns.push("Settings")}}),
            new ButtonSkeleton(p,79,730,235,99,{onRelease: ()=>{this.p.prvNxtScrns.push("Game")}},"Go!"),
            new ButtonSkeleton(p,24,523,70,175,{onRelease: ()=>{
                //switch loadout
                let temp = Object.getOwnPropertyNames(loadout);
                modeout.l = temp[(temp.indexOf(modeout.l) + temp.length - 1) % temp.length];
            }}),
            new ButtonSkeleton(p,299,523,70,175,{onRelease: ()=>{
                let temp = Object.getOwnPropertyNames(loadout);
                modeout.l = temp[(temp.indexOf(modeout.l) + 1) % temp.length];
            }}),
            new ButtonSkeleton(p,24,423,162,70,{onRelease: ()=>{
                //switch mode
                let temp = Object.getOwnPropertyNames(mode);
                modeout.m = temp[(temp.indexOf(modeout.m) + temp.length - 1) % temp.length];
            }}),
            new ButtonSkeleton(p,206,423,162,70,{onRelease: ()=>{
                let temp = Object.getOwnPropertyNames(mode);
                modeout.m = temp[(temp.indexOf(modeout.m) + 1) % temp.length];
            }})
        ];
    }
    draw(){
        this.p.noStroke();
        //clear last frame and yk background colors yay
        this.p.background(hexToRgb(theme[theme.current].light));
        //draw text boxes
        this.p.fill(hexToRgb(theme[theme.current].dark));
        this.p.rect(24,299,346,114,10);
        this.p.rect(109,523,175,175,10);
        //draw buttons
        for (let i = 0; i < this.buttons.length; i++)
            this.buttons[i].draw();
        //icon for options button
        this.p.image(this.p.settingsIcon,299,64,70,70);
        //icon for return button
        this.p.image(this.p.returnIcon,24,64,70,70);
        //draw evolution/static icons
        this.p.push();
        this.p.dropShadow(4, 6);
        this.p.fill(hexToRgb("FFFFFF"));
        this.p.square(24,156,128,10);
        this.p.square(241,156,128,10);
        this.p.image(this.p.arrowIcon,161.5,185,70,70);
        //draw loadout images
        this.p.image(loadout[modeout.l].img,151.5,523,90,90);
        //draw loadout and mode information
        this.p.dropShadow(4, 5);
        this.p.textSize(30);
        this.p.textAlign(this.p.CENTER,this.p.TOP);
        this.p.text(capitalizeFirst(modeout.m),24,299,346,114);
        this.p.text(capitalizeFirst(modeout.l),24,608,346,114);
        this.p.pop();
    }
}
