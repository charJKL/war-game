function Stone2(x,y){
    Nature.call(this,x,y,$assets.get('stone2'));

    this.amount = 70;
    this.resource = 'stone';
    this.limit = 1;
    this.animation = 'miner';
}
Stone2.prototype = Object.create(Nature.prototype);