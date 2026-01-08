function hexToRgb(hex){
    var str = "" + hex;
    var hasAlpha = str.match(/[A-Fa-f0-9]{8}$/g);
    var noAlpha = str.match(/[A-Fa-f0-9]{6}$/g);

    if (hasAlpha)
        str = hasAlpha[0];
    else if (noAlpha)
        str = noAlpha[0]+"FF";
    else
        throw new Error("Passed hex value, \"" + hex + "\" is malformed.");

    let r = parseInt(str.slice(0,2), 16);
    let g = parseInt(str.slice(2,4), 16);
    let b = parseInt(str.slice(4,6), 16);
    let a = parseInt(str.slice(6,8), 16);

    return [r,g,b,a];
}
function capitalizeFirst(str){
    return str.toUpperCase()[0]+str.substr(1);
}

s = function(p){
    p.preload = function(){
        p.font = p.loadFont('./assets/font/Jost-ExtraBold.ttf');
        p.settingsIcon = p.loadImage('./assets/uil_setting.png');
        p.returnIcon = p.loadImage('./assets/uil_return.png');
        p.arrowIcon = p.loadImage('./assets/uil_arrow.png');
        p.carrotIcon = p.loadImage('./assets/uil_carrot.png');
        loadout.burnout.trueimg = p.loadImage('./assets/loadout/uil_fire.png');
        loadout.conjure.trueimg = p.loadImage('./assets/loadout/uil_box-plus.png');
        loadout.fish.trueimg = p.loadImage('./assets/loadout/uil_fish.png');
        loadout.focus.trueimg = p.loadImage('./assets/loadout/uil_box-block.png');
        loadout.grind.trueimg = p.loadImage('./assets/loadout/uil_clock.png');
        loadout.roulette.trueimg = p.loadImage('./assets/loadout/uil_refresh.png');
        loadout.scry.trueimg = p.loadImage('./assets/loadout/uil_eye.png');
        loadout.slice.trueimg = p.loadImage('./assets/loadout/uil_box-slash.png');
        loadout.void.trueimg = p.loadImage('./assets/loadout/uil_box-clear.png');
        let temp = Object.getOwnPropertyNames(loadout);
        let lock = p.loadImage('./assets/uil_lock.png');
        for (let i = 0; i < temp.length; i++){
            loadout[temp[i]].img = lock;
            loadout[temp[i]].truedes = loadout[temp[i]].description;
            loadout[temp[i]].description = "Locked.";
            //debug
            p.unlockLoadout(temp[i]);
        }
        p.unlockLoadout("scry");
    }
    p.unlockLoadout = function(property){
        loadout[property].img = loadout[property].trueimg;
        loadout[property].description = loadout[property].truedes;
    }
    p.reloadScreens = function(){
        p.Screens = {Title: new Title(p), Settings: new Settings(p), ModeSelect: new ModeSelect(p), Shop: new Shop(p), Game: new GameScreen(p), Lost: new LossScreen(p)};
    }
    p.setup = function(){
        p.createCanvas(393,852).parent("canvasContainer");
        //remove some caret browsing features (if we use space as an input it wont forcibly shoot the user to the bottom of the page)
        window.addEventListener("keydown", function(e) { if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab"].indexOf(e.code) > -1) {e.preventDefault();}}, false);
        p.dropShadow = (blur, y, color = p.color(0,0,0,64)) =>{
            if (Array.isArray(color)){
                color = p.color(color);
            }
            p.drawingContext.shadowColor = color;
            p.drawingContext.shadowBlur = blur;
            //multiplication to match figma; idk why figma does this but matching params should be easier at least
            p.drawingContext.shadowOffsetY = y * 2; 
        }
        p.clearDropShadow = () =>{
            p.drawingContext.shadowColor = p.color(0,0,0,0);
            p.drawingContext.shadowBlur = 0;
            p.drawingContext.shadowOffsetY = 0; 
        }
        p.textFont(p.font);
        p.game = new Game();
        p.game.generatePuzzle();
        p.reloadScreens();
        //I didn't really know what to call this
        //use .push to change the screen and then .pop to go back to a previous screen
        //popping more than ten times will go back to the title but who cares
        p.prvNxtScrns = ["Title"];
        p.mouseStatus = {click: false, held: false, release: false};
        p.volume = {mas: 1, bgm: 1, sfx: 1};
        p.score = {now: 0, total: 0, high: 0};
        p.cooldown = 0;
        p.timer = 300;
    }
    //technically a misnomber since it also updates but who cares
    p.draw = function(){
        if (p.prvNxtScrns.length > 10)
            p.prvNxtScrns.shift();
        if (p.prvNxtScrns.length == 0)
            p.prvNxtScrns = ["Title"];
        let temp = p.Screens[p.prvNxtScrns.at(-1)];
        if (temp == undefined)
            throw new Error("Selected screen \""+p.prvNxtScrns.at(-1)+"\" does not exist.")
        else
            temp.draw();
        p.mouseStatus.click = false;
        p.mouseStatus.release = false;
    }
    //theres a function for holding down the mouse buttons but it has a stupid name and isnt necessary
    p.mousePressed = function(){
        p.mouseStatus = {click: true, held: true, release: false};
    }
    p.mouseReleased = function(){
        p.mouseStatus = {click: false, held: false, release: true};
    }
    //mobile device functionality
    p.touchStarted = function(){
        p.mouseStatus = {click: true, held: true, release: false};
    }
    p.touchEnded = function(){
        p.mouseStatus = {click: false, held: false, release: true};
    }
}

var myp5_1 = new p5(s, "container");