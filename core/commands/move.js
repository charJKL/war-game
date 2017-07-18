function Move(unit, target){
    Order.call(this);
    assert( unit.position );
    assert( target.position );
    assert( $pathfind ,'Must init $pathfind module.');
    this.obstacle = null;
    this.unit = unit;
    this.target = target;
    this.current = 0;
    this.waypoints = [];
    this.range = 5;
}
Move.prototype = Object.create(Order.prototype);

Move.prototype.init = function(){
    Order.prototype.init.call(this);
    if( !this.findPath() ){
        return false;
    }
    this.unit.changeAnimation('move');
    if( !(this.unit instanceof Enemy) ){
        $hud.say($hud.getDialog('move'));
    }
}

Move.prototype.ignore = function(object){
    this.obstacle = object;
    $pathfind.ignore(object);
}

Move.prototype.findPath = function(){
    this.waypoints = $pathfind.find(this.unit.position, this.target.position);
    if( this.waypoints === false ){
        this.cantFindPath();
        return false;
    }
    return true;
}

Move.prototype.start = function(unit){
    if( this.current >= this.waypoints.length ){
        return false;
    }
    if( this.waypoints == false){
        return false;
    }
    var current = this.waypoints[this.current];
    var obstacle = $collisions.isTraversable(current);
    if( obstacle ){
        if( obstacle === this.obstacle ){
            return true;
        }
        if( !this.findPath() ){
            return false;
        }
        this.current = 0;
        return true;
    }
    return true;
}

Move.prototype.execute = function(unit){
    var current = this.waypoints[this.current];
    var position = new Vector2(unit.position.x,unit.position.y);
    var target = new Vector2(current.x,current.y);
        target.sub(position);
    if( target.magnitude() < this.range ){
        this.current++;
    }  
    target.normalize();
    unit.setDirection(target);
}

Move.prototype.end = function(unit){
    return this.current >= this.waypoints.length;
}

Move.prototype.shutdown = function(){
    this.unit.stop();
    this.unit.changeAnimation('stop');
}

Move.prototype.cantFindPath = function(){
    $hud.shout($hud.getDialog('cantMove'));
    this.waypoints = [];
}

Move.prototype.getType = function(){
    return 'move';
}