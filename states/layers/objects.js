function Objects(){
    Layer.call(this);
    this.entities = [];
    this.dirty = false;
}
Objects.prototype = Object.create(Layer.prototype);

Objects.prototype.load = function(){
    return [
        $assets.loadTexture('assets/buildings'),
        $assets.loadTexture('assets/nature'),
        $assets.loadTexture('assets/settler'),
        $assets.loadTexture('assets/woodcutter'),
        $assets.loadTexture('assets/enemy'),
        $assets.loadTexture('assets/enemy_attack'),
        $assets.loadTexture('assets/collect'),
        $assets.loadTexture('assets/miner'),
        $assets.loadTexture('assets/knight'),
        $assets.loadTexture('assets/knight_attack')
    ];
}

Objects.prototype.init = function(){
    this.entities = [];
}

Objects.prototype.add = function(object){
    if( this.entities.length == 0){
        this.entities.push(object);
        return;
    }
    for(var i=0; i < this.entities.length; i++){
        if( this.entities[i].position.z > object.position.z ){
            this.entities.splice(i,0,object);
            return;
        }
    }
    this.entities.push(object);
}

Objects.prototype.update = function(delta){
    for(let i=0 ; i < this.entities.length ; i++){
        if( this.entities[i].remove ){
            continue;
        }
        this.entities[i].update(delta);
    }
    if( this.dirty ){
        this.entities.sort(this.comperator);
        this.dirty = false;
    }
}

Objects.prototype.draw = function(){
    for(let i=0 ; i < this.entities.length ; i++){
        if( this.entities[i].remove ){
            continue;
        }
        var position = this.entities[i].position;
        this.entities[i].draw(-this.camera.x + position.x, -this.camera.y + position.y);
    }
}

Objects.prototype.handleDown = function(e){
    var worldX = e.x + this.camera.x;
    var worldY = e.y + this.camera.y;
    for( let i= this.entities.length-1 ; i>=0 ; i--){
        if( this.entities[i].wasClicked(worldX,worldY) ){
            e.handled = true;
            this.raise('entityClicked',this.entities[i],e);
            return;
        }
    }
}

Objects.prototype.markDirty = function(){
    this.dirty = true;
}

Objects.prototype.comperator = function(a,b){
    return a.position.z - b.position.z;
}