function Bakery(x,y){
    Building.call(this,x,y,$assets.get('bakery'));

    this.wood = 20;
    this.stone = 10;

    this.resource = 'food';
    this.time = 3000;
}
Bakery.prototype = Object.create(Building.prototype);

