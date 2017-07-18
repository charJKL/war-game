function PriorityQueue(comperator){
    this.queue = [];
    this.comperator = comperator;
}

PriorityQueue.prototype.get = function(){
    return this.queue;
}

PriorityQueue.prototype.add = function(element){
    if( this.queue.length === 0 ){
        this.queue.push(element);
        return true;
    }
    for(let i = 0 ; i < this.queue.length ; ++i){
        if( this.comperator(this.queue[i],element) >= 0 ){
            this.queue.splice(i,0,element);
            return;
        }
    }
    this.queue.push(element);
}