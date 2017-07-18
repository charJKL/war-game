function Dispatcher(){
    this.listeners = {};
}

Dispatcher.prototype.attach = function(type, callback){
    if( !this.listeners[type] ){
        this.listeners[type] = [];
    }
    this.listeners[type].push(callback);
}

Dispatcher.prototype.raise = function(type, e){
    if( !this.listeners[type] ){
        return;
    }
    for(let i=0 ; i < this.listeners[type].length ; ++i){
        this.listeners[type][i].call(this,e);
    }
}

Dispatcher.prototype.detach = function(callback){
    assert( typeof callback === 'function' );
    for(var event in this.listeners ){
        for(var i=0; i < this.listeners[event].length; i++){
            if( this.listeners[event][i] == callback ){
                this.listeners[event].splice(i, 1);
                return;
            }
        }
    }
}