class GameScreen{
    constructor(p){
        this.p = p;
        this.cooldown = -1;
        this.buttons = [
            //new ButtonSkeleton(p,24,64,70,70,{onRelease: ()=>{this.p.prvNxtScrns.pop()}}),
            new ButtonSkeleton(p,299,64,70,70,{onRelease: ()=>{this.p.prvNxtScrns.push("Settings")}}),
            //must be the last button in the array!
            new ButtonSkeleton(p,163,763,206,70,{onRelease: ()=>{
                if (this.cooldown > 0)
                    return;
                switch(modeout.l){
                    case ("roulette"):
                        this.p.game.generatePuzzle();
                        this.cooldown = 420;
                    break;
                }
            }}, "", "FFFFFF", theme[theme.current].blue, p.RIGHT, 27)
        ];
        this.p.game.generatePuzzle();
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
        //draw timer back
        this.p.push();
        this.p.dropShadow(4, 6);
        this.p.fill(hexToRgb(theme[theme.current].lightest));
        this.p.rect(24,64,143,69,10);
        this.p.pop();
        //draw container for puzzle and piece tray
        this.p.fill(hexToRgb(theme[theme.current].dark));
        this.p.square(24,155,345,10);
        this.p.rect(24,529,345,213,10);
        //icon for loadout button
        this.p.image(loadout[modeout.l].img,168,763,70,70);
        //make the powerup button actually reflect the loadout
        this.buttons.at(-1).text = capitalizeFirst(modeout.l)+"\u2800";
        this.buttons.at(-1).backcolor = (this.cooldown < 0 && loadout[modeout.l].hasButton) ? theme[theme.current].blue : theme[theme.current].lightest;
        //draw actual game stuff
        let temp = this.p.game.getGrid();
        let colorList = [theme[theme.current].blue,theme[theme.current].pink,theme[theme.current].green,theme[theme.current].orange];
        let cellSize = (345-6)/temp.length;
        for (let x = 0; x < temp.length; x++){
            for (let y = 0; y < temp.length; y++){
                this.p.push();
                if (temp[x][y]){
                    this.p.dropShadow(4, 6);
                    this.p.fill(hexToRgb(colorList[temp[x][y]%4]));
                }else
                    this.p.fill(hexToRgb(theme[theme.current].darkest));
                // 30 = 24 + 3 (spacing between each cell) + 3 (spacing bewtween boarder)
                this.p.square(x*cellSize+30,y*cellSize+161,cellSize-6,10);
                this.p.pop();
            }
        }
        //update
        this.cooldown --;
    }
}
