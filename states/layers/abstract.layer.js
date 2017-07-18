function Layer(){
    State.call(this);
    this.camera = new Rect(0,0,0,0);
}
Layer.prototype = Object.create(State.prototype);

Layer.prototype.load = function(){
    return []
}

Layer.prototype.updateCamera = function(width,height){
    this.camera.width = width;
    this.camera.height = height;
}

Layer.prototype.handleMove = function(e){
    this.camera.x += e.diffX * -1;
    this.camera.y += e.diffY * -1;
}
