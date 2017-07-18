function Tree1(x,y){
    Nature.call(this,x,y,$assets.get('tree1'));
    
    this.amount = 20;
    this.resource = 'wood';
    this.limit = 1;
    this.animation = 'woodcutter';
}
Tree1.prototype = Object.create(Nature.prototype);