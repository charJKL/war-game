function Tree2(x,y){
    Nature.call(this,x,y,$assets.get('tree2'));

    this.amount = 30;
    this.resource = 'wood';
    this.limit = 1;
    this.animation = 'woodcutter';
}

Tree2.prototype = Object.create(Nature.prototype);