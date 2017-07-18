function Node(){
    this.h = 0;
    this.g = Infinity;
    this.parent = null;
}

Node.prototype.f = function(){
    return this.h + this.g;
}
