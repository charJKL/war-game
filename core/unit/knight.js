function Knight(x,y){
    Unit.call(this,x,y,[
        $assets.get('knight_down_stop'),
        $assets.get('knight_down_stop'),
        $assets.get('knight_down_stop'),
        $assets.get('knight_down_stop'),
        $assets.get('knight_down_stop'),
        $assets.get('knight_down_stop'),
        $assets.get('knight_down_stop'),
        $assets.get('knight_down_stop'),
        $assets.get('knight_down_stop')
    ]);
    this.addAnimation('move',[
        $assets.get('knight_down_stop'),
        $assets.get('knight_right'),
        $assets.get('knight_right_up'),
        $assets.get('knight_up'),
        $assets.get('knight_left_up'),
        $assets.get('knight_left'),
        $assets.get('knight_left_down'),
        $assets.get('knight_down'),
        $assets.get('knight_right_down')
    ]);
    this.addAnimation('attack',[
        $assets.get('knight_down_stop'),
        $assets.get('knight_attack_right'),
        $assets.get('knight_attack_right_up'),
        $assets.get('knight_attack_up'),
        $assets.get('knight_attack_left_up'),
        $assets.get('knight_attack_left'),
        $assets.get('knight_attack_left_down'),
        $assets.get('knight_attack_down'),
        $assets.get('knight_attack_right_down')
    ],false);
    this.health = 100;
    this.dmg = 0.50;

    this.attach('hit',this.defence);
}
Knight.prototype= Object.create(Unit.prototype);

Knight.prototype.use = function(invoker){
    if( !(invoker instanceof Enemy) ){
        return false;
    }
    invoker.command(new Fight(invoker,this));
    return true;
}

Knight.prototype.defence = function(e){
    assert( e.predator instanceof Unit);
    var command = this.commands.orders.front();
    if( command && command instanceof Fight ){
        return;
    }
    if( command ){
        command.markDismiss();
    }
    this.command(new Fight(this,e.predator));
}