function Enter(building, unit){
    Order.call(this);
    assert( building instanceof Building);
    assert( unit instanceof Unit);
    this.building = building;
    this.unit = unit;
    this.nearArea = null;
}
Enter.prototype = Object.create(Order.prototype);

Enter.prototype.init = function(){
    Order.prototype.init.call(this);
    this.nearArea = new Rect(
        this.building.hitbox.x - this.unit.hitbox.width, 
        this.building.hitbox.y - this.unit.hitbox.height,
        this.building.hitbox.width + this.unit.hitbox.width*2, 
        this.building.hitbox.height + this.unit.hitbox.height*2);
}

Enter.prototype.start = function(unit){
    return this.nearArea.contains(this.unit.position.x,this.unit.position.y);
}

Enter.prototype.execute = function(unit, delta){
    this.unit.raise('enter',{object: this.building});
    this.building.raise('enter',{object: this.unit});
    this.markDismiss();
}

Enter.prototype.end = function(unit){
    return !this.nearArea.contains(this.unit.position.x,this.unit.position.y);
}

Enter.prototype.getType = function(){
    return 'enter';
}