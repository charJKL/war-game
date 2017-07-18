function Rect(x,y,width,height){
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.width = parseInt(width);
    this.height = parseInt(height);
}

Rect.prototype.contains = function(x,y){
    return x > this.x && x < (this.x + this.width) && y > this.y && y < (this.y + this.height);
}

Rect.prototype.collide = function(rect){
    assert( rect instanceof Rect );
    return !(this.x +this.width < rect.x || this.x  > rect.x + rect.width || this.y + this.height < rect.y || this.y > rect.y + rect.height);
}