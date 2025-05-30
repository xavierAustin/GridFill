class ModeSelect{
    constructor(p){
        this.p = p;
        this.buttons = [
            new ButtonSkeleton(p,24,64,70,70,{onRelease: ()=>{this.p.prvNxtScrns.pop()}}),
            new ButtonSkeleton(p,299,64,70,70,{onRelease: ()=>{this.p.prvNxtScrns.push("Settings")}})
        ];
    }
    draw(){
        this.p.noStroke();
        //clear last frame and yk background colors yay
        this.p.background(hexToRgb(theme[theme.current].light));
        //draw buttons
        for (let i = 0; i < this.buttons.length; i++)
            this.buttons[i].draw();
        //icon for options button
        this.p.image(this.p.settingsIcon,299,64,70,70);
        //icon for return button
        this.p.image(this.p.returnIcon,24,64,70,70);
        //todo: everything ;>_>
    }
}
