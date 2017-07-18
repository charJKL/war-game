function Work(nature, unit){
    Order.call(this);
    assert( nature instanceof Nature);
    assert( unit instanceof Unit);
    this.nature = nature;
    this.unit = unit;
    this.workingArea = null;
    this.time = 600;
    this.actual = 0;
}
Work.prototype = Object.create(Order.prototype);

Work.prototype.init = function(){
    Order.prototype.init.call(this);
     this.workingArea = new Rect(
        this.nature.hitbox.x - this.unit.hitbox.width, 
        this.nature.hitbox.y - this.unit.hitbox.height,
        this.nature.hitbox.width + this.unit.hitbox.width*2, 
        this.nature.hitbox.height + this.unit.hitbox.height*2);
    this.unit.changeAnimation(this.nature.animation);
}

Work.prototype.start = function(unit){
    return this.nature.exhausted() || this.workingArea.contains(this.unit.position.x,this.unit.position.y);
}

Work.prototype.execute = function(unit, delta){
    this.actual += delta;
    if( this.actual > this.time ){
        this.nature.get(1);
        this.actual -= this.time;
    }
}

Work.prototype.end = function(unit){
    return this.nature.exhausted() || !this.workingArea.contains(this.unit.position.x,this.unit.position.y);
}

Work.prototype.shutdown = function(){
    this.unit.changeAnimation('stop');
}

Work.prototype.getType = function(){
    return 'work';
}