function Static(x,y,sprite){
    Entity.call(this,x,y,sprite);
}
Static.prototype = Object.create(Entity.prototype);