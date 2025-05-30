class ButtonSkeleton{
    constructor(p, x, y, w, h, onClick = () => {}, text = "", fontSize = false){
        this.p = p;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.onClick = onClick;
        this.text = text;
        this.fontSize = fontSize? fontSize : h*0.6;
    }
    setup(){
        
    }
    draw(){
        this.p.push();
        this.p.fill(hexToRgb(theme[theme.current].lightest));
        this.p.dropShadow(4, 6);
        this.p.rect(this.x,this.y,this.w,this.h,10);
        this.p.pop();
        this.p.fill(hexToRgb("FFFFFF"));
        this.p.textSize(this.fontSize);
        this.p.textAlign(this.p.CENTER,this.p.CENTER);
        this.p.text(this.text,this.x,this.y-this.fontSize*0.2,this.w,this.h);
    }
}