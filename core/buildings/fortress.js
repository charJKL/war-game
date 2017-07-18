function Fortress(x,y){
    Building.call(this,x,y,$assets.get('fortress'));

    this.wood = 50;
    this.stone = 100;
    this.gold = 50;
    
    this.time = 5000;
}
Fortress.prototype = Object.create(Building.prototype);

Fortress.prototype.update = function(delta){
    Static.prototype.update.call(this,delta);
    if( this.empty() ){
        return;
    }
    this.extract += delta;
    if( this.extract > this.time ){
        this.promotion();
        this.extract = 0;
    }
}

Fortress.prototype.promotion  = function(){
    var knight = new Knight(0,0);
        knight.inside = this;
        $objects.add(knight);
    this.inside.remove = true;
    this.inside = knight;
    this.escape();
}