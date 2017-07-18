function Orders(){
    Command.call(this);
    this.orders = new Deque();
}
Orders.prototype = Object.create(Command.prototype);

Orders.prototype.isEmpty = function(){
    return this.orders.empty();
}

Orders.prototype.before = function(order){
    assert( order instanceof Command );
    order.belongTo(this);
    this.orders.push_front(order);
}

Orders.prototype.after = function(order){
    assert( order instanceof Command );
    order.belongTo(this);
    this.orders.push_back(order);
}

Orders.prototype.start = function(entity){
    return !this.orders.empty();
}

Orders.prototype.execute = function(entity, delta){
    if( this.orders.empty() ){
        return false;
    }
    var current = this.orders.front();
    if( !current.wasInit() ){
        current.init();
    }
    if( current.start(entity) && !current.wasDismiss() ){
        current.execute(entity, delta);
    }
    if( current.end(entity) || current.wasDismiss() ){
        current.shutdown();
        this.orders.pop_front();
    }
}

Orders.prototype.end = function(entity){
    return this.orders.empty();
}