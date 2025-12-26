class LossScreen{
    constructor(p){
        this.p = p;
        this.buttons = [
            new ButtonSkeleton(p,299,64,70,70,{onRelease: ()=>{this.p.prvNxtScrns.push("Settings")}}),
            new ButtonSkeleton(p,207,574,163,70,{onRelease: ()=>{this.p.prvNxtScrns.push("Title")}},"Quit",theme[theme.current].red),
            new ButtonSkeleton(p,24,574,163,70,{onRelease: ()=>{this.p.prvNxtScrns.push("Shop")}},"Shop"),
            new ButtonSkeleton(p,24,484,346,70,{onRelease: ()=>{this.p.prvNxtScrns.push("ModeSelect")}},"Retry")
        ];
    }
    draw(){
        this.p.noStroke();
        //clear last frame and yk background colors yay
        this.p.background(hexToRgb(theme[theme.current].light));
        //draw container for options and text
        this.p.fill(hexToRgb(theme[theme.current].dark));
        this.p.rect(24,188,345,476-140-60,10);
        //draw buttons
        for (let i = 0; i < this.buttons.length; i++)
            this.buttons[i].draw();
        //icon for return button
        this.p.image(this.p.settingsIcon,299,64,70,70);
        //draw text
        this.p.push();
        this.p.fill(hexToRgb("FFFFFF"));
        this.p.dropShadow(4, 6);
        this.p.textAlign(this.p.CENTER,this.p.CENTER);
        this.p.textSize(45);
        this.p.text("Time's Up!", 62, 180, 264, 136);
        this.p.textAlign(this.p.LEFT,this.p.CENTER);
        this.p.textSize(24);
        this.p.dropShadow(4, 4);
        this.p.text("Score:", 44, 300, 306, 41);
        this.p.text("Highscore:", 44, 340, 306, 41);
        this.p.text("Progress:", 44, 380, 306, 41);
        this.p.textAlign(this.p.RIGHT,this.p.CENTER);
        this.p.text((""+this.p.score.now).padStart(8,"0"), 44, 300, 306, 41);
        this.p.text((""+this.p.score.high).padStart(8,"0"), 44, 340, 306, 41);
        this.p.noFill();
        this.p.stroke(hexToRgb("FFFFFF"));
        this.p.strokeWeight(3);
        this.p.rect(220,398,130,18,2);
        this.p.pop();
        this.p.fill(hexToRgb("FFFFFF"));
        if (itemsForPurchase[0])
            this.p.rect(220,398,130*Math.min(this.p.score.total/itemsForPurchase[0].cost,1),18,2);
    }
}
