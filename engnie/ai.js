function AI(timeout,dogs){
    this.timeout = timeout;
    this.hive = dogs;
    this.i = 0;
    this.units = [];
}

AI.prototype.check = function(){
    this.castOfDogs();
    this.scout();
}

AI.prototype.castOfDogs = function(){
    if( this.i === this.hive.length ){
        return false;
    }
    var dog = this.hive[this.i];
    if( $game.time > dog.respawn ){
        var enemy = new Enemy(dog.x,dog.y);
        $objects.add(enemy);
        this.i++;
    }
}

AI.prototype.scout = function(){
    if( $player.settlers !== this.units.length ){
        var units = $objects.entities;
        this.units = [];
        for(var i=0; i < units.length; i++){
            if( (units[i] instanceof Settler) || units[i] instanceof Knight ){
                if( units[i].remove !== true){
                    this.units.push(units[i]);
                }
            }
        }
    }
}

AI.prototype.wantOrder = function(enemy){
    if( this.units.length > 0){
        enemy.command(new Fight(enemy,this.units[0]));
    }
}