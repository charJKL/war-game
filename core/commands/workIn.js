function WorkIn(unit, building){
    Orders.call(this);
    assert( unit instanceof Unit);
    assert( building instanceof Building);
    this.unit = unit;
    this.building = building
    this.callback = null;
}
WorkIn.prototype = Object.create(Orders.prototype);

WorkIn.prototype.init = function(){
    Orders.prototype.init.call(this);
    var move = new Move(this.unit,this.building);
        move.ignore(this.building);
    var that = this;
    this.callback = function(e){
        if( e.entity == that.building ){
            move.markDismiss();
        }
    }
    this.unit.attach('collide',this.callback);
    this.after(move);
    this.after(new Enter(this.building, this.unit));
    $hud.say($hud.getDialog('workIn'));
}

WorkIn.prototype.shutdown = function(){
    this.unit.detach(this.callback);
}

WorkIn.prototype.getType = function(){
    return 'workIn';
}