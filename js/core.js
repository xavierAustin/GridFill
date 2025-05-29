s = function(p){
    p.preload = function(){
        
    }
    p.setup = function(){
        p.createCanvas(800,800).parent("canvasContainer");
        //remove some caret browsing features (if we use space as an input it wont forcibly shoot the user to the bottom of the page)
        window.addEventListener("keydown", function(e) { if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab"].indexOf(e.code) > -1) {e.preventDefault();}}, false);
    }
    p.draw = function(){
        p.background(125);
        p.translate(p.width/2,p.height/2);
        p.rotate(p.frameCount * 0.01);
        p.square(-40,-40,80);
    }
}

var myp5_1 = new p5(s, "container");