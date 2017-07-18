function Render(DOM){
    Dispatcher.call(this);
    this.font = 'Segoe UI';
    this._vertical = ALIGNMENT.TOP;
    this._horizontal = ALIGNMENT.CENTER;

    this.canvas = DOM;
    this.scene = this.canvas.getContext('2d');
    window.addEventListener("resize",this.fullScreenMode.bind(this));
    this.fullScreenMode();
    this.initDefaultStyles();
}
Render.prototype = Object.create(Dispatcher.prototype);
var ALIGNMENT = {
    LEFT: 0,
    CENTER: 0,
    RIGHT: 0,
    TOP: 0,
    MIDDLE: 0,
    BOTTOM: 0
};

Render.prototype.fullScreenMode = function(){
    var width = document.width || document.body.clientWidth;
    var height = document.height || document.body.clientHeight;
    this.canvas.width = width;
    this.canvas.height = height;
    this.raise('resize',{width:width,height:height});
    this.updateAlignment();
}

Render.prototype.updateAlignment = function(){
    ALIGNMENT.CENTER = this.canvas.width / 2;
    ALIGNMENT.RIGHT = this.canvas.width;
    ALIGNMENT.MIDDLE = this.canvas.height / 2;
    ALIGNMENT.BOTTOM = this.canvas.height;
}

Render.prototype.initDefaultStyles = function(){
    this.scene.font='16px Segoe UI';
    this.scene.fillStyle = '#eeeeee';
    this.scene.textAlign = 'center';
    this.scene.textBaseline = 'middle';
    this.scene.globalAlpha = 1;
}

Render.prototype.clear = function(){
    this.scene.fillStyle = "#000000";
    this.scene.fillRect(0,0,this.canvas.width,this.canvas.height);
}

Render.prototype.alpha = function(alpha){
    this.scene.globalAlpha = alpha;
    return this;
}

Render.prototype.color = function(color){
    this.scene.fillStyle = color;
    return this;
}

Render.prototype.size = function(size){
    this.scene.font = size+'px '+this.font;
    return this;
}

Render.prototype.horizontal = function(alignment){
    this._horizontal = alignment;
    return this;
}

Render.prototype.vertical = function(alignment){
    this._vertical = alignment;
    return this;
}

Render.prototype.align = function(textAlign){
    this.scene.textAlign = textAlign;
    return this;
}

Render.prototype.text = function(text){
    this.scene.fillText(text,this._horizontal,this._vertical);
    this.initDefaultStyles();
}

Render.prototype.rect = function(x, y, width, height){
    this.scene.fillRect(x, y, width, height);
    this.scene.globalAlpha = 1;
}

Render.prototype.progress = function(current, max, width, height){
    var height = (typeof height === "undefined") ? 5 : height;
    var percentage = (current / max) * width ;
    this.color('#f00').rect(this._horizontal,this._vertical,percentage,5);
    this.scene.beginPath();
    this.scene.lineWidth='1';
    this.scene.strokeStyle = '#000000';
    this.scene.rect(this._horizontal,this._vertical,width,5);
    this.scene.stroke();
}

Render.prototype.drawStatic = function(sprite){
    assert( sprite instanceof Sprite);
    this.scene.drawImage(sprite.image,
        sprite.frames[0].x, sprite.frames[0].y,
        sprite.frames[0].width, sprite.frames[0].height,
        this._horizontal - sprite.frames[0].offsetX , this._vertical - sprite.frames[0].offsetY,
        sprite.frames[0].width, sprite.frames[0].height);
    this.scene.globalAlpha = 1;
}

Render.prototype.drawSprite = function(sprite,frame,x,y){
    assert( sprite instanceof Sprite );
    this.scene.drawImage(sprite.image,
        sprite.frames[frame].x, sprite.frames[frame].y,
        sprite.frames[frame].width,sprite.frames[frame].height,
        x-sprite.frames[frame].offsetX,y-sprite.frames[frame].offsetY,
        sprite.frames[frame].width,sprite.frames[frame].height);
    this.scene.globalAlpha = 1;
}

Render.prototype.select = function(sprite,frame,x,y){
    this.scene.beginPath();
    this.scene.lineWidth='1';
    this.scene.strokeStyle = '#ff0000';
    this.scene.rect(x-sprite.frames[frame].clickable.x,y-sprite.frames[frame].clickable.y,sprite.frames[frame].clickable.width,sprite.frames[frame].clickable.height);
    this.scene.stroke();
}

Render.prototype.outline = function(rect){
    this.scene.beginPath();
    this.scene.lineWidth='1';
    this.scene.strokeStyle = '#ff0000';
    this.scene.rect(rect.x,rect.y,rect.width,rect.height);
    this.scene.stroke();
}

Render.prototype.swapBuffer = function(buffer,x,y,width,height){
    this.scene.drawImage(buffer,x,y,width,height,0,0,width,height);
}