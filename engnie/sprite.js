function Sprite(image,frames){
    this.image = image;
    this.frames = frames;
}

Sprite.prototype.x = function(){
    return this.frames[0].x;
}

Sprite.prototype.y = function(){
    return this.frames[0].y;
}