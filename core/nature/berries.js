function Berries(x,y){
    Nature.call(this,x,y,$assets.get('berries'));

    this.amount = 20;
    this.resource = 'food';
    this.limit = 1;
    this.animation = 'collect';
}
Berries.prototype = Object.create(Nature.prototype);