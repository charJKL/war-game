function State(){ 
    Dispatcher.call(this);
}
State.prototype = Object.create(Dispatcher.prototype);

State.prototype.load = function(){
    return Promise.all();
}

State.prototype.init = function(){
    // Shoud be override
}

State.prototype.update = function(){
    // Shoud be override
}

State.prototype.draw = function(){
    // Shoud be override
}

State.prototype.handleDown = function(e){
    // Shoud be override
}

State.prototype.handleUp = function(e){
    // Shoud be override
}

State.prototype.handleMove = function(e){
    // Shoud be override
}

State.prototype.handleKeyboard = function(e){
    // Shoud be override
}