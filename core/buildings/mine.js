function Mine(x,y){
    Building.call(this,x,y,$assets.get('mine'));

    this.wood = 10;
    this.stone = 40;

    this.resource = 'gold';
    this.time = 2000;
}
Mine.prototype = Object.create(Building.prototype);