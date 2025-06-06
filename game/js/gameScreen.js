const SIXTIETH = 1/60;

class GameScreen{
    constructor(p){
        this.p = p;
        this.buttons = [
            //new ButtonSkeleton(p,24,64,70,70,{onRelease: ()=>{this.p.prvNxtScrns.pop()}}),
            new ButtonSkeleton(p,299,64,70,70,{onRelease: ()=>{this.p.prvNxtScrns.push("Settings")}}),
            //must be the last button in the array!
            new ButtonSkeleton(p,163,763,206,70,{onRelease: ()=>{
                if (this.p.cooldown > 0)
                    return;
                switch(modeout.l){
                    case ("roulette"):
                        this.p.game.generatePuzzle();
                        this.p.cooldown = 420;
                    break;
                    case ("fish"):
                        this.p.cooldown = Math.random()*540+60;
                        this.p.score.now += 80;
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
        //draw timer text
        this.p.textAlign(this.p.CENTER,this.p.CENTER);
        this.p.textSize(40);
        this.p.fill(hexToRgb("FFFFFF"));
        this.p.text(Math.floor(this.p.timer/60)+":"+(""+Math.floor(this.p.timer%60)).padStart(2,"0"),24,54,143,69);
        //draw score text
        this.p.textAlign(this.p.LEFT,this.p.CENTER);
        this.p.textSize(20);
        this.p.text("Score:\n"+(""+this.p.score.now).padStart(8,"0"),24,753,190,70);
        this.p.pop();
        //draw container for puzzle and piece tray
        this.p.fill(hexToRgb(theme[theme.current].dark));
        this.p.square(24,155,345,10);
        this.p.rect(24,529,345,213,10);
        //icon for loadout button
        this.p.image(loadout[modeout.l].img,168,763,70,70);
        //make the powerup button actually reflect the loadout
        this.buttons.at(-1).text = capitalizeFirst(modeout.l)+"\u2800";
        this.buttons.at(-1).backcolor = (this.p.cooldown < 0 && loadout[modeout.l].hasButton) ? theme[theme.current].blue : theme[theme.current].lightest;
        //draw actual game stuff
        let currentGrid = this.p.game.getGrid();
        let colorList = [theme[theme.current].blue,theme[theme.current].pink,theme[theme.current].green,theme[theme.current].orange];
        let cellSize = (345-6)/currentGrid.length;
        for (let x = 0; x < currentGrid.length; x++){
            for (let y = 0; y < currentGrid.length; y++){
                this.p.push();
                if (currentGrid[x][y]){
                    this.p.dropShadow(4, 6);
                    this.p.fill(hexToRgb(colorList[currentGrid[x][y]%4]));
                }else
                    this.p.fill(hexToRgb(theme[theme.current].darkest));
                // 30 = 24 + 3 (spacing between each cell) + 3 (spacing bewtween boarder)
                this.p.square(x*cellSize+30,y*cellSize+161,cellSize-6,10);
                this.p.pop();
            }
        }
        //update 
        this.p.cooldown --;
        this.p.timer = Math.min(this.p.timer-SIXTIETH,5999);
        if (this.p.timer < 0)
            this.p.prvNxtScrns.push("Lost");
        let winCon = (this.p.game.getEmptyCells().length == 0);
        switch (modeout.l){
            case ("fish"):
                if (this.p.cooldown < -50)
                    this.p.cooldown = Math.random()*540+60;
            break;
            case ("grind"):
                if (winCon){
                    this.p.timer += 6;
                    this.p.score.now += this.p.gridSizeUp();
                    this.p.score.now = this.p.score.now*0.95 + 10;
                    return;
                }
            break;
            case ("burnout"):
                this.p.score.now *= 1.05;
            break;
        }
        if (winCon)
            this.p.gridSizeUp();
    }
}
