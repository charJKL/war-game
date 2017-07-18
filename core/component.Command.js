function Command(){
    this.id = Command.id++;
    this.dismiss = false;
    this.initialized = false;
    this.belong = null;
}
Command.id = 0;

Command.prototype.before = function(order){
    assert( order instanceof Command );
    // Shoud be override
}

Command.prototype.after = function(order){
    assert( order instanceof Command );
    // Shoud be override
}

Command.prototype.belongTo = function(orders){
    assert( orders instanceof Orders);
    this.belong = orders;
}

Command.prototype.wasInit = function(){
    return this.initialized;
}

Command.prototype.markInit = function(){
    this.initialized = true;
}

Command.prototype.init = function(){
    this.markInit();
}

Command.prototype.start = function(object){
    // Shoud be override
    return false;
}

Command.prototype.execute = function(object, delta){
    // Shoud be override
}

Command.prototype.end = function(object){
    // Shoud be override
    return true;
}

Command.prototype.shutdown = function(){
    // Shoud be override
}

Command.prototype.wasDismiss = function(){
    return this.dismiss;
}

Command.prototype.markDismiss = function(){
    this.dismiss = true;
}

Command.prototype.equal = function(command ){
    assert( command instanceof Command);
    return this.getType() === command.getType();
}

Command.prototype.getType = function(){
    assert( false, 'This must be override');
}

Command.prototype.priority = function(command){
    assert( command instanceof Command);
    return true;
}