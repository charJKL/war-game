function Build(construction, point){
    assert( construction instanceof Construct );
    assert( point instanceof Point);
    this.construction = new construction.construct(point.position.x,point.position.y);
    this.point = point;
    Command.call(this);
    this.start(this) && this.execute(this);
}
Build.prototype = Object.create(Command.prototype);

Build.prototype.start = function(construction){
    if( !this.enoughResources() ){
        $hud.shout($hud.getDialog('missingResources'));
        return false;
    }
    if( !this.canBuildHere() ){
        $hud.shout($hud.getDialog('canBuildHere'));
        return false;
    }
    return true;
}

Build.prototype.execute = function(construction){
    $objects.add(this.construction);
    this.takeResources();
}

Build.prototype.enoughResources = function(){
    for(var i=0; i < Player.resources.length; i++){
        var resource = Player.resources[i];
        if( this.construction[resource] > $player[resource] ){
            $hud.shout('Need '+this.construction[resource]+' '+resource+'.');
            return false;
        }
    }
    return true;
}

Build.prototype.takeResources = function(){
     for(var i=0; i < Player.resources.length; i++){
        var resource = Player.resources[i];
        $player[resource] -= this.construction[resource];
    }
}

Build.prototype.canBuildHere = function(){
    var startTile = $map.getTile(this.construction.hitbox.x,this.construction.hitbox.y);
    var endTile = $map.getTile(this.construction.hitbox.x + this.construction.hitbox.width, this.construction.hitbox.y+this.construction.hitbox.height);
    if( !startTile || !endTile ){
        return false;
    }
    for(var i = startTile.coordinates.y; i <= endTile.coordinates.y ; i++ ){
        for(var j= startTile.coordinates.x; j <= endTile.coordinates.x ; j++){
            var tile = $map.checkTile(j,i);
            if( !tile.isTraversable() ){
                return false;
            }
        }
    }
    if( $collisions.checkPosition(this.construction.hitbox) ){
        return false;
    }
    if( $debug.buildingRegion ){
        $render.color('#000').rect($map.camera.x + this.construction.hitbox.x,$map.camera.y + this.construction.hitbox.y,this.construction.hitbox.width,this.construction.hitbox.height);
    }
    return true;
}