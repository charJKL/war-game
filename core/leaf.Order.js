function Order(){
    Command.call(this);
}
Order.prototype = Object.create(Command.prototype);

Order.prototype.before = function(order){
    assert( order instanceof Command );
    this.belong.before(order);
}

Order.prototype.after = function(order){
    assert( order instanceof Command );
    this.belong.after(order);
}