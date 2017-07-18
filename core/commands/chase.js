function Chase(predator, victim){
    Move.call(this, predator, victim);
    this.last = new Vector2(0,0);
    this.callback = null;
}
Chase.prototype = Object.create(Move.prototype);

Chase.prototype.init = function(){
    Move.prototype.init.call(this);
    var that = this;
    this.callback = function(e){
        if( e.entity == that.target ){
            that.markDismiss();
        }
    }
    this.last.x = this.target.position.x;
    this.last.y = this.target.position.y;
    this.unit.attach('collide',this.callback);
}

Chase.prototype.start = function(unit){
    if( this.last.x != this.target.position.x || this.last.y != this.target.position.y ){
        this.waypoints = $pathfind.find(this.unit.position, this.target.position);
        this.current = 0;
        this.last.x = this.target.position.x;
        this.last.y = this.target.position.y;
    }
    return Move.prototype.start.call(this,unit);
}

Chase.prototype.shutdown = function(){
    Move.prototype.shutdown.call(this);
    this.unit.detach(this.callback);
}
