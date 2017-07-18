function Enemy(x,y){
    Unit.call(this,x,y,[
        $assets.get('enemy_down_stop'),
        $assets.get('enemy_down_stop'),
        $assets.get('enemy_down_stop'),
        $assets.get('enemy_down_stop'),
        $assets.get('enemy_down_stop'),
        $assets.get('enemy_down_stop'),
        $assets.get('enemy_down_stop'),
        $assets.get('enemy_down_stop'),
        $assets.get('enemy_down_stop')
    ]);
    this.addAnimation('move',[
        $assets.get('enemy_down_stop'),
        $assets.get('enemy_right'),
        $assets.get('enemy_right_up'),
        $assets.get('enemy_up'),
        $assets.get('enemy_left_up'),
        $assets.get('enemy_left'),
        $assets.get('enemy_left_down'),
        $assets.get('enemy_down'),
        $assets.get('enemy_right_down')
    ]);
    this.addAnimation('attack',[
        $assets.get('enemy_down_stop'),
        $assets.get('enemy_attack_right'),
        $assets.get('enemy_attack_right_up'),
        $assets.get('enemy_attack_up'),
        $assets.get('enemy_attack_left_up'),
        $assets.get('enemy_attack_left'),
        $assets.get('enemy_attack_left_down'),
        $assets.get('enemy_attack_down'),
        $assets.get('enemy_attack_right_down')
    ],false);
    this.max = 100;
    this.health = this.max;
    this.dmg = 0.50;

    this.attach('hit',this.defence);
}
Enemy.prototype= Object.create(Unit.prototype);

Enemy.prototype.update = function(delta){
    if( this.commands.isEmpty() ){
        $ai.wantOrder(this);
    }
    Unit.prototype.update.call(this,delta);
}

Enemy.prototype.use = function(invoker){
    if( !(invoker instanceof Knight) ){
        return false;
    }
    invoker.command(new Fight(invoker,this));
    return true;
}

Enemy.prototype.defence = function(e){
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
