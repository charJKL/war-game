function Stone1(x,y){
    Nature.call(this,x,y,$assets.get('stone1'));

    this.amount = 60;
    this.resource = 'stone';
    this.limit = 1;
    this.animation = 'miner';
}
Stone1.prototype = Object.create(Nature.prototype);