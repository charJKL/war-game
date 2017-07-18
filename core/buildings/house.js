function House(x,y){
    Building.call(this,x,y,$assets.get('house'));

    this.wood = 10;
    this.food = 20;

    this.resource = 'settlers';
    this.time = 3000;
    this.inside = 1;
    this.detach(Building.prototype.enter);
    this.detach(Building.prototype.leave);
}
House.prototype = Object.create(Building.prototype);

House.prototype.use = function(invoker){
    $hud.shout($hud.getDialog('whatToDo'));
    return false;
}

House.prototype.update = function(delta){
    if( this.settler === 1 ){
        return;
    }
    this.extract += delta;
    if( this.extract > this.time ){
        $player.raise('resource',{name:this.resource,amount:1});
        this.extract = 0;
        this.settler = 1;
        this.inside = null;
        this.birth();
    }
}

House.prototype.birth = function(){
    var settler = new Settler(0,0);
    var positions = [   
        {
            x: this.clickable.x + this.clickable.width + Math.floor(settler.hitbox.width),
            y: this.clickable.y + this.clickable.height + Math.floor(settler.hitbox.height)
        },
        {
            x: this.clickable.x - Math.floor(settler.hitbox.width),
            y: this.clickable.y + this.clickable.height + Math.floor(settler.hitbox.height)
        },
        {
            x: this.clickable.x + this.clickable.width + Math.floor(settler.hitbox.width),
            y: this.clickable.y - Math.floor(settler.hitbox.height)
        },
        {
            x: this.clickable.x - Math.floor(settler.hitbox.width),
            y: this.clickable.y - Math.floor(settler.hitbox.height)
        },
    ];
    var position = new Vector2(0,0);
    for(var i=0; i < positions.length; i++){
        position.x = positions[i].x;
        position.y = positions[i].y;
        if( $collisions.isTraversable(position) === false ){
            settler.position.x = position.x;
            settler.position.y = position.y;
            $objects.add(settler);
            return;
        }
    }
}