function Attack(predator, victim){
    Order.call(this);
    assert( predator instanceof Unit);
    assert( victim instanceof Unit);
    this.predator = predator;
    this.victim = victim;
    this.callback = null;
    this.distance = new Vector2(0,0);
    this.range = this.victim.hitbox.width*2;
}
Attack.prototype = Object.create(Order.prototype);

Attack.prototype.init = function(){
    Order.prototype.init.call(this);
    var that = this;
    this.callback = function(){
        that.markDismiss();
    }
    this.victim.attach('dead',this.callback);
}

Attack.prototype.start = function(predator){
    this.distance.x = this.predator.position.x - this.victim.position.x;
    this.distance.y = this.predator.position.y - this.victim.position.y;
    var melee = this.distance.magnitude() < this.range;
    if( !melee ){
        this.before(new Chase(this.predator, this.victim));
        return false;
    }
    this.predator.changeAnimation('attack');
    this.predator.setRotation(Vector2.multiplie(this.distance,-1));
    return true;
}

Attack.prototype.execute = function(predator, delta){
    this.victim.raise('hit',{predator:this.predator});
}

Attack.prototype.end = function(predator){
    return this.victim.remove;
}

Attack.prototype.shutdown = function(){
    this.victim.detach(this.callback);
    this.predator.changeAnimation('stop');
}

Attack.prototype.getType = function(){
    return 'attak';
}