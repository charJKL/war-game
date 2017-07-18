function Construct(x,y,width,height){
    Region.call(this,x,y,width,height);
    this._select = false;
    this.construct = null;
}
Construct.prototype = Object.create(Region.prototype);

Construct.prototype.draw = function(){
    Region.prototype.draw.call(this);
    if( this._select ){
        $render.outline(this.position);
    }
}