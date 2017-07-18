function Pathfind(){
    assert( $map );
    assert( $collisions );
    this.ignores = [];
    this.target = null;
    this.fromTile = null;
    this.toTile = null;
    this.cost = {
        horizontal: $map.TILE.WIDTH, 
        diagonal: Math.sqrt($map.TILE.WIDTH*$map.TILE.WIDTH + $map.TILE.HEIGHT*$map.TILE.HEIGHT)
    }
}

Pathfind.prototype.find = function(from, to){
    assert( from instanceof Vector2 );
    assert( to instanceof Vector2 );
    this.target = to;
    this.fromTile = $map.getTile(from.x,from.y); 
    this.toTile = $map.getTile(to.x,to.y);
    var roadExist = this.search(this.fromTile,this.toTile);
    this.ignores = [];
    if( roadExist ){
        var road = this.retraceRoad(this.fromTile,this.toTile);
        var index = ( road.length === 0 ) ? 0 : road.length-1 ;
        road[index] = to;
        return road;
    }
    return false;
}

Pathfind.prototype.ignore = function(object){
    assert( object instanceof Entity );
    this.ignores.push(object);
    return this;
}

Pathfind.prototype.isTraversable = function(tile){
    assert( tile instanceof Tile )
    if( !tile.isTraversable() ){
        return false;
    }
    var destination = ( this.toTile == tile ) ? this.target : tile.position;
    var obstacle = $collisions.isTraversable(destination);
    if( obstacle && !this.ignores.includes(obstacle) ){
        return false;
    }
    return true;
}

Pathfind.prototype.comparse = function(a, b){
    return a.f() - b.f();
}

Pathfind.prototype.search = function(from, to){
    var close = [];
    var open = new Heap(this.comparse); 
        from.g = 0;
        open.add(from);
    if( !this.isTraversable(to) ){
        return false;
    }

    while( !open.empty() ){
        var promise = open.peek();
        if( promise === to ){
            return true;
        }
        close.push(promise);
        if( $debug.stepByStep ) debugger;
        for(var i=0; i < promise.neighborhood.length ; i++){
            var neighbour = promise.neighborhood[i];
            if( close.includes(neighbour) || !this.isTraversable(neighbour) ){
                continue;
            }
            var g = promise.g + this.moveCost(promise,neighbour);
            if( g < neighbour.g || !open.includes(neighbour) ){
                neighbour.g = g;
                neighbour.h = this.moveCost(neighbour,to);
                neighbour.parent = promise;
                if( open.includes(neighbour) ){
                    open.update(neighbour);
                }else{
                    open.add(neighbour);
                }
            }
        }
    }
    return false;
}

Pathfind.prototype.retraceRoad = function(from,to){
    var road = [];
    for(let current = to ; current != from ; current = current.parent){
        road.unshift(current.position);
    }
    return road;
}

Pathfind.prototype.moveCost = function(a,b){
    var distanceX = Math.abs(a.coordinates.x - b.coordinates.x);
    var distanceY = Math.abs(a.coordinates.y - b.coordinates.y);
    if( distanceX > distanceY ){
        return this.cost.diagonal*distanceY + this.cost.horizontal*(distanceX-distanceY);
    }
    return this.cost.diagonal*distanceX + this.cost.horizontal*(distanceY-distanceX);
}