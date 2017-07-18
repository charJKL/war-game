function WorkOut(unit, nature){
    Orders.call(this);
    assert( unit instanceof Unit);
    assert( nature instanceof Nature);
    this.unit = unit;
    this.nature = nature
    this.callback = null;
}
WorkOut.prototype = Object.create(Orders.prototype);

WorkOut.prototype.init = function(){
    Orders.prototype.init.call(this);
    var move = new Move(this.unit,this.nature);
        move.ignore(this.nature);
    var that = this;
    this.callback = function(e){
        if( e.entity == that.nature ){
            move.markDismiss();
        }
    }
    this.unit.attach('collide',this.callback);
    this.after(move);
    this.after(new Work(this.nature, this.unit));
    $hud.say($hud.getDialog('workOut'));
}

WorkOut.prototype.shutdown = function(){
    this.unit.detach(this.callback);
    this.unit.changeAnimation('stop');
}

WorkOut.prototype.getType = function(){
    return 'workOut';
}