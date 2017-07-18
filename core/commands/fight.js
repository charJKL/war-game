function Fight(predator, victim){
    Orders.call(this);
    assert( predator instanceof Unit);
    assert( victim instanceof Unit);
    this.predator = predator;
    this.victim = victim;
    this.range = this.victim.hitbox.width*2;
}
Fight.prototype = Object.create(Orders.prototype);

Fight.prototype.init = function(){
    Orders.prototype.init.call(this);
    var distance = new Vector2(
        this.predator.position.x - this.victim.position.x,
        this.predator.position.y - this.victim.position.y
    );
    if( distance.magnitude() > this.range ){
        this.after(new Chase(this.predator,this.victim));
    }
    this.after(new Attack(this.predator, this.victim));
    if( !(this.predator instanceof Enemy) ){
        $hud.say($hud.getDialog('attack'));
    }
}

Fight.prototype.getType = function(){
    return 'fight';
}