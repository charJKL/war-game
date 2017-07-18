function Vector2(x,y){
    this.x = x;
    this.y = y;
}
Vector2.multiplie = function(vector, n){
    return new Vector2(vector.x * n, vector.y * n);
}
Vector2.diff = function(one, second){
    return new Vector2(one.x - second.x, one.y - second.y);
}
Vector2.add = function(one, second){
    return new Vector2(one.x + second.x, one.y + second.y);
}
Vector2.prototype.add = function(vector){
    assert(vector instanceof Vector2);
    this.x = this.x + vector.x;
    this.y = this.y + vector.y;
}

Vector2.prototype.sub = function(vector){
    assert(vector instanceof Vector2);
    this.x = this.x - vector.x;
    this.y = this.y - vector.y;
}

Vector2.prototype.multiplie = function(n){
    assert( !isNaN(n) );
    this.x = this.x * n;
    this.y = this.y * n;
}

Vector2.prototype.division = function(d){
    assert( !isNaN(d) );
    this.x = this.x / d;
    this.y = this.y / d;
}

Vector2.prototype.dot = function(vector){
    assert(vector instanceof Vector2);
    return this.x*vector.x + this.y+vector.y;
}

Vector2.prototype.magnitude = function(){
    return Math.sqrt(this.x*this.x + this.y*this.y); 
} 

Vector2.prototype.normalize = function(){
    var magnitude = this.magnitude();
    assert( magnitude !== 0 , 'Cant normalize vector with magnitude equal 0.');
    this.x = this.x / magnitude;
    this.y = this.y / magnitude;
}

Vector2.prototype.angle = function(){
    var angle = -1*Math.atan2(this.y,this.x); 
    return ( angle < 0 ) ? 2*Math.PI+angle : angle;
}

Vector2.prototype.isZero = function(){
    return this.x === 0 && this.y === 0;
}