function Building(x,y,sprite){
    Static.call(this,x,y,sprite);
    this.inside = null;

    this.settlers = 0;
    this.food = 0;
    this.wood = 0;
    this.stone = 0;
    this.gold = 0;

    this.resource = '';
    this.time = 999999;
    this.extract = 0;

    this.attach('enter',this.enter);
    this.attach('leave',this.leave);
}
Building.prototype = Object.create(Static.prototype);

Building.prototype.empty = function(){
    return this.inside === null;
}

Building.prototype.update = function(delta){
    Static.prototype.update.call(this,delta);
    if( this.empty() ){
        return;
    }
    this.extract += delta;
    if( this.extract > this.time ){
        $player.raise('resource',{name:this.resource,amount:1});
        this.extract -= this.time;
    }
}

Building.prototype.draw = function(x,y){
    Static.prototype.draw.call(this,x,y);
    if( !this.empty() ){
        $render.horizontal(x-50).vertical(y+20).progress(this.extract,this.time,100);
    }
}

Building.prototype.use = function(invoker){
    if( !(invoker instanceof Settler) ){
        return false;
    }
    if( !this.empty() ){
        return false;
    }
    invoker.command(new WorkIn(invoker,this));
    return true;
}

Building.prototype.enter = function(e){
    assert( e.object instanceof Settler );
    var unit = e.object;
    this.inside = unit;
}

Building.prototype.leave = function(){
    assert( this.inside );
    this.extract = 0;
    this.inside = null;
}

Building.prototype.escape = function(){
    if( !this.inside ){
        return false;
    }
    var positions = [   
        {
            x: this.clickable.x + this.clickable.width + Math.floor(24),
            y: this.clickable.y + this.clickable.height + Math.floor(18)
        },
        {
            x: this.clickable.x - Math.floor(24),
            y: this.clickable.y + this.clickable.height + Math.floor(18)
        },
        {
            x: this.clickable.x + this.clickable.width + Math.floor(24),
            y: this.clickable.y - Math.floor(18)
        },
        {
            x: this.clickable.x - Math.floor(24),
            y: this.clickable.y - Math.floor(18)
        },
    ];
    var position = new Vector2(0,0);
    for(var i=0; i < positions.length; i++){
        position.x = positions[i].x;
        position.y = positions[i].y;
        if( $collisions.isTraversable(position) === false ){
            this.inside.position.x = position.x;
            this.inside.position.y = position.y;
            this.inside.raise('leave');
            this.raise('leave');
            return;
        }
    }
}