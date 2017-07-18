function Unit(x,y,sprite){
    Animation.call(this,x,y,sprite);
    this.inside = null;

    this.health = 100;
    this.max = 100;
    this.dmg = 0;

    this.attach('enter',this.enter);
    this.attach('leave',this.leave);
    this.attach('hit',this.hit);
    this.attach('dead',this.dead);
}
Unit.prototype = Object.create(Animation.prototype);

Unit.prototype.draw = function(x,y){
    if( this.inside ){
        return true;
    }
    this.drawHealth(x,y);
    Entity.prototype.draw.call(this,x,y);
}

Unit.prototype.drawHealth = function(x,y){
    if( this.health == this.max ){
        return;
    }
    $render.horizontal(x-25).vertical(y-70).progress(this.health,this.max,50);
}

Unit.prototype.collide = function(event){
    event.manifold.diff.multiplie(-1);
    if( event.manifold.diff.isZero() ){
        event.manifold.diff.x = Math.floor((Math.random() * 10) - 20); 
        event.manifold.diff.y = Math.floor((Math.random() * 10) - 20); 
    }
    event.manifold.diff.normalize();
    this.steering = event.manifold.diff;
    if( !this.direction.isZero() ){
        var s = Vector2.add(this.direction,this.steering);
        if( s.isZero() ){
            if( event.manifold.normal.x == 1 || event.manifold.normal.x == -1 ){
                this.steering.y = 1;
            }
            if( event.manifold.normal.y == 1 || event.manifold.normal.y == -1 ){
                this.steering.x = 1;
            }
        }
    }
}

Unit.prototype.resolve = function(){
    Entity.prototype.resolve.call(this);
    this.steering = new Vector2(0,0);
}

Unit.prototype.enter = function(e){
    assert( e.object instanceof Building );
    var building = e.object;
    if( this._select ){
        $commander.select(building);
    }
    this.inside = building;
}

Unit.prototype.leave = function(){
    assert( this.inside );
    this.inside = null;
}

Unit.prototype.hit = function(e){
    assert( e.predator instanceof Unit);
    if(this.inside){
        this.inside.escape();
    }
    if( this.health <= 0 ){
        this.raise('dead');
        return;
    }
    this.health -= e.predator.dmg;
}

Unit.prototype.dead = function(e){
    if( this.remove ){
        return;
    }
    this.remove = true;
    if( !(this instanceof Enemy) ){
        $hud.shout($hud.getDialog('dead'));
        $player.raise('resource',{name:'settlers',amount:-1});
    }
}