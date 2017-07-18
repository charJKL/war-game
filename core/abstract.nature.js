function Nature(x,y,sprite){
    Static.call(this,x,y,sprite);

    this.amount = 0;
    this.resource = '';
    this.limit = 0;
    this.exact = 0;
    this.animation = 'stop';
}
Nature.prototype = Object.create(Static.prototype);

Nature.prototype.use = function(invoker){
    if( !(invoker instanceof Settler) ){
        return false;
    }
    invoker.command(new WorkOut(invoker,this));
}

Nature.prototype.exhausted = function(){
    return this.amount == 0;
}

Nature.prototype.get = function(amount){
    this.exact += amount;
    if( this.exact >= this.limit ){
        $player.raise('resource',{name:this.resource,amount:1});
        this.amount--;
        this.exact -= this.limit;
    }
    if( this.exhausted() ){
        this.remove = true;
    }
}

Nature.prototype.debug = function(x,y){
    Static.prototype.debug.call(this,x,y);
    var screenX = x - this.position.x;
    var screenY = y - this.position.y; 
    if( $debug.natureLimit ){
        $render.scene.font='12px Segoe UI';
        $render.scene.fillStyle = '#ff0000';
        $render.scene.textAlign = 'center';
        $render.scene.textBaseline = 'middle';
        $render.scene.fillText(this.exact +'/'+this.limit+'/'+this.amount,x,y-30);
    }
}