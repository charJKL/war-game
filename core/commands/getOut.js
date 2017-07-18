function GetOut(building, target){
    Order.call(this);
    this.building = building;
    this.target = target;
}
GetOut.prototype = Object.create(Order.prototype);

GetOut.prototype.start = function(building){
    return !this.building.empty();
}

GetOut.prototype.execute = function(building){
    this.building.inside.raise('leave');
    $commander.select(this.building.inside);
    this.building.raise('leave')
}

GetOut.prototype.end = function(building){
    return this.building.empty();
}

GetOut.prototype.getType = function(){
    return 'getOut';
}