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
        p.dropShadow = (blur, y, color = p.color(0,0,0,64)) =>{
            p.drawingContext.shadowColor = color;
            p.drawingContext.shadowBlur = blur;
            //multiplication to match figma; idk why it does this but matching params should be easier at least
            p.drawingContext.shadowOffsetY = y * 2; 
        }
        p.clearDropShadow = () =>{
            p.drawingContext.shadowColor = p.color(0,0,0,0);
            p.drawingContext.shadowBlur = 0;
            p.drawingContext.shadowOffsetY = 0; 
        }
        p.textFont(p.font);
        p.Screens = {Title: new Title(p)};
        p.currentScreen = "Title";
    }
    p.draw = function(){
        p.Screens[p.currentScreen].draw();
    }
}

var myp5_1 = new p5(s, "container");