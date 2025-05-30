function hexToRgb(hex, hasAlpha = false) {
    if (typeof hex === 'string')
        hex = parseInt(hex.slice(hasAlpha? -8 : -6), 16);

    var color = hex;
    var offset = hasAlpha? 8 : 0;

    var r = (color >> (16+offset)) & 255;
    var g = (color >> (8+offset)) & 255;
    var b = (color >> (offset)) & 255;
    var a = (hasAlpha? color : 255) & 255;

    return [r,g,b,a];
}

s = function(p){
    p.preload = function(){
        p.font = p.loadFont('/assets/Jost-ExtraBold.ttf');
        p.settingsIcon = p.loadImage('/assets/uil_setting.png');
    }
    p.setup = function(){
        p.createCanvas(393,852).parent("canvasContainer");
        //remove some caret browsing features (if we use space as an input it wont forcibly shoot the user to the bottom of the page)
        window.addEventListener("keydown", function(e) { if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab"].indexOf(e.code) > -1) {e.preventDefault();}}, false);
        p.textFont(p.font);
        p.titleScreen = new Title(p);
    }
    p.draw = function(){
        p.titleScreen.draw();
    }
}

var myp5_1 = new p5(s, "container");