function Headquarter(x,y){
    Building.call(this,x,y,$assets.get('headquarter'));
}
Headquarter.prototype = Object.create(Building.prototype);