s = function(p){
    p.preload = function(){
        p.font = p.loadFont('/assets/Jost-ExtraBold.ttf');
    }
    p.setup = function(){
        p.createCanvas(393,852).parent("canvasContainer");
        //remove some caret browsing features (if we use space as an input it wont forcibly shoot the user to the bottom of the page)
        window.addEventListener("keydown", function(e) { if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab"].indexOf(e.code) > -1) {e.preventDefault();}}, false);
        p.textFont(p.font);
    }
    p.draw = function(){
        p.background(125);
        p.push();
        p.translate(p.width/2,p.height/2);
        p.rotate(p.frameCount * 0.01);
        p.square(-40,-40,80);
        p.pop();
        p.textSize(68);
        p.textAlign(p.CENTER)
        p.text("GridFill", p.width/2, p.height/10);
    }
}

var myp5_1 = new p5(s, "container");