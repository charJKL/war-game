function Settler(x,y){
    Unit.call(this,x,y,[
        $assets.get('settler_down_stop'),
        $assets.get('settler_down_stop'),
        $assets.get('settler_down_stop'),
        $assets.get('settler_down_stop'),
        $assets.get('settler_down_stop'),
        $assets.get('settler_down_stop'),
        $assets.get('settler_down_stop'),
        $assets.get('settler_down_stop'),
        $assets.get('settler_down_stop')
    ]);
    this.addAnimation('move',[
        $assets.get('settler_down_stop'),
        $assets.get('settler_right'),
        $assets.get('settler_right_up'),
        $assets.get('settler_up'),
        $assets.get('settler_left_up'),
        $assets.get('settler_left'),
        $assets.get('settler_left_down'),
        $assets.get('settler_down'),
        $assets.get('settler_right_down')
    ]);
    this.addAnimation('woodcutter',[
        $assets.get('settler_down_stop'),
        $assets.get('woodcutter_right'),
        $assets.get('woodcutter_right_up'),
        $assets.get('woodcutter_up'),
        $assets.get('woodcutter_left_up'),
        $assets.get('woodcutter_left'),
        $assets.get('woodcutter_left_down'),
        $assets.get('woodcutter_down'),
        $assets.get('woodcutter_right_down')
    ]);
    this.addAnimation('collect',[
        $assets.get('settler_down_stop'),
        $assets.get('collect_right'),
        $assets.get('collect_right_up'),
        $assets.get('collect_up'),
        $assets.get('collect_left_up'),
        $assets.get('collect_left'),
        $assets.get('collect_left_down'),
        $assets.get('collect_down'),
        $assets.get('collect_right_down')
    ]);
    this.addAnimation('miner',[
        $assets.get('settler_down_stop'),
        $assets.get('miner_right'),
        $assets.get('miner_right_up'),
        $assets.get('miner_up'),
        $assets.get('miner_left_up'),
        $assets.get('miner_left'),
        $assets.get('miner_left_down'),
        $assets.get('miner_down'),
        $assets.get('miner_right_down')
    ]);

    this.attach('hit',this.interrupt);
}
Settler.prototype= Object.create(Unit.prototype);

Settler.prototype.use = function(invoker){
    if( !(invoker instanceof Enemy) ){
        return false;
    }
    invoker.command(new Fight(invoker,this));
    return true;
}

Settler.prototype.interrupt = function(e){
    var last = this.commands.orders.front();
    if( last ){
        last.markDismiss();
        $hud.shout($hud.getDialog('hit'));
    }
}