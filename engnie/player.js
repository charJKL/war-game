function Player(resource){
    Dispatcher.call(this);
    this.settlers = resource.settlers;
    this.max = resource.max;
    this.food = resource.food;
    this.wood = resource.wood;
    this.stone = resource.stone;
    this.gold = resource.gold;

    this.attach('resource',this.addResource);
}
Player.prototype = Object.create(Dispatcher.prototype);

Player.resources = ['settlers','food','wood','stone','gold'];

Player.prototype.addResource = function(e){
    assert( typeof this[e.name] !== 'undefined');
    this[e.name] += e.amount;
    if( this.settlers <= 0 ){
        $game.changeState(new Main('lose'));
    }
}