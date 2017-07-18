function Deque(){
    this.storage = [];
}

Deque.prototype.push_back = function(element){
    this.storage.push(element);
}

Deque.prototype.push_front = function(element){
    this.storage.unshift(element);
}

Deque.prototype.pop_back = function(){
    return this.storage.pop();
}

Deque.prototype.pop_front = function(){
    return this.storage.shift();
}

Deque.prototype.front = function(){
    if( this.storage.length === 0 ){
        return false;
    }
    return this.storage[0];
}

Deque.prototype.back = function(){
    if( this.storage.length === 0 ){
        return false;
    }
    return this.storage[this.storage.length-1];
}

Deque.prototype.clear = function(){
    this.storage = [];
}

Deque.prototype.empty = function(){
    return this.storage.length === 0;
}