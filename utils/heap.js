function Heap(comperator){
    this.heap = [];
    this.count = 0;
    this.comperator = comperator;
}

Heap.prototype.add = function(object){
    object.iHeap = this.count++;
    this.heap.push(object);
    this.sortUp(this.heap[this.heap.length-1]);
}

Heap.prototype.empty = function(){
    return this.count === 0;
}

Heap.prototype.includes = function(object){
    if( typeof object.iHeap === 'undefined' ){
        return false;
    }
    if( this.heap[object.iHeap] === object ){
        return true;
    }
    return false;
}

Heap.prototype.update = function(object){
    assert( typeof object.iHeap !== 'undefined' );
    this.sortUp(object);
}

Heap.prototype.peek = function(){
    if( this.empty() ){
        return false;
    }
    this.count--;
    if( this.heap.length == 1){
        return this.heap.pop();
    }
    var peek = this.heap[0];
    this.swapPeek();
    this.sortDown(this.heap[0]);
    return peek;
}

Heap.prototype.sortDown = function(current){
    while( true ){
        var iLeft = current.iHeap*2 + 1;
        var iRight = current.iHeap*2 + 2;
        if( iLeft > this.heap.length-1 ){// no childen
            break;
        }
        var iSwap = this.heap[iLeft];
        if( iRight < this.heap.length ){
            if( this.comperator(this.heap[iLeft],this.heap[iRight]) > 0 ){
                iSwap = this.heap[iRight];
            }
        }
        if( this.comperator(current,iSwap) < 0){// correct
            break;
        }
        this.swap(current,iSwap);
    }
}

Heap.prototype.swapPeek = function(){
    this.heap[0] = this.heap[this.heap.length-1];
    this.heap[0].iHeap = 0;
    this.heap.pop();
}

Heap.prototype.sortUp = function(current){
    while( current.iHeap > 0 ){
        var parent = this.heap[Math.floor((current.iHeap - 1) / 2)];
        if( this.comperator(parent,current) > 0 ){
            this.swap(parent,current);
            continue;
        }
        break;
    }
}

Heap.prototype.swap = function(elementA,elementB){
    this.heap[elementA.iHeap] = elementB;
    this.heap[elementB.iHeap] = elementA;
    var tempIndex = elementA.iHeap;
    elementA.iHeap = elementB.iHeap;
    elementB.iHeap = tempIndex;
}

Heap.prototype.print = function(){
    for(var i=0; i < this.heap.length ; i++){
        console.log(this.heap[i]);
    }
}

Heap.prototype.short = function(){
    var short = [];
    for(var i=0; i < this.heap.length ; i++){
        short[i] = this.heap[i].c;
    }
    return short;
}