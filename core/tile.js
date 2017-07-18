function Tile(type,x,y,width,height){
    Node.call(this);
    this.type = type;
    this.coordinates = new Vector2(x,y);
    this.size = new Rect(x * width, y * height, width,height);
    this.hitbox = this.size;
    this.position = new Vector2(x * width + width/2, y * height + height/2);
    this.texture = $assets.get(this.resolveTexture(type));
    this.neighborhood = null;
    this.visible = 1;
    this.unknown = true;
}
Tile.prototype = Object.create(Node.prototype);

TYPE = {
    0: 'grass',
    1: 'grass10',
    2: 'grass1',
    3: 'water',
    4: 'empty',
    5: 'dirt',
    6: 'dirt',
    7: 'lava'
}

Tile.prototype.draw = function(buffer,x,y){
    buffer.drawImage(
        this.texture.image,
        this.texture.frames[this.visible].x, this.texture.frames[this.visible].y,
        this.size.width,this.size.height,
        x*this.size.width, y*this.size.height,
        this.size.width,this.size.height
    );
    if( $debug.tileInformation ){
       this.debug(buffer,x,y);
    }
}

Tile.prototype.isTraversable = function(){
    if( this.type === 3 || this.type === 4 || this.type === 7){
        return false;
    }
    return true;
}

Tile.prototype.resolveTexture = function(type){
    return ( this.unknown ) ? TYPE[4] : TYPE[type];
}

Tile.prototype.debug = function(buffer,x,y){
    var x = x *this.size.width;
    var y = y *this.size.height;
    var center = x+this.size.width/2;

    buffer.beginPath();
    buffer.lineWidth='1';
    buffer.strokeStyle = '#000000';
    buffer.rect(x,y,this.size.width,this.size.height);
    buffer.stroke(); 

    buffer.font='bold 13px Segoe UI';
    buffer.fillStyle = '#000000';
    buffer.textAlign = 'center';
    buffer.textBaseline = 'middle';
    buffer.fillText(this.coordinates.x+':'+this.coordinates.y,center,y+13);

    buffer.font='11px Segoe UI';
    buffer.fillText(this.g.toFixed(3),center,y+28);
    buffer.fillText(this.h.toFixed(3),center,y+42);
    buffer.fillText(this.f().toFixed(3),center,y+55);
}