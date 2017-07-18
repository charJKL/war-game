function Tree3(x,y){
    Nature.call(this,x,y,$assets.get('tree3'));

    this.amount = 10;
    this.resource = 'wood';
    this.limit = 1;
    this.animation = 'woodcutter';
}
Tree3.prototype = Object.create(Nature.prototype);