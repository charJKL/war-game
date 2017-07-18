function Map(){
    Layer.call(this);
    this.tiles = [];
    this.TILE = {WIDTH:64,HEIGHT:64};

    this.buffer = {};
    this.buffer.canvas = document.createElement('canvas');
    this.buffer.scene = this.buffer.canvas.getContext('2d');
    this.buffer.cache = new Rect(0,0);
    this.buffer.dirty = true;
}
Map.prototype = Object.create(Layer.prototype);

Map.prototype.load = function(){
    return [
        $assets.loadTexture('assets/terrain')
    ];
}

Map.prototype.init = function(level){
    var world = level.world;
    for(var y=0 ; y < world.length ; y++){
        this.tiles[y] = [];
        for(var x=0 ; x < world[y].length ; x++){
            this.tiles[y][x] = new Tile(world[y][x],x,y,this.TILE.WIDTH,this.TILE.HEIGHT);
        }
    }
     for(var y=0 ; y < this.tiles.length ; y++){
        for(var x=0 ; x < this.tiles[y].length ; x++){
            this.tiles[y][x].neighborhood = this.getNeighborhood(this.tiles[y][x]);
        }
    }
    this.initBuffer();
}

Map.prototype.draw = function(){
    if( this.buffer.dirty ){
        this.drawIntoBuffer();
    }
    $render.clear();
    var cameraOffsetX = this.camera.x - ( this.buffer.cache.x * this.TILE.WIDTH);
    var cameraOffsetY = this.camera.y - ( this.buffer.cache.y * this.TILE.HEIGHT);
    $render.swapBuffer(this.buffer.canvas,cameraOffsetX,cameraOffsetY,this.camera.width,this.camera.height);
    if( $debug.camera){
        this.debug();
    }
}

Map.prototype.debug = function(){
    var cameraStartX = Math.floor(this.camera.x / this.TILE.WIDTH);
    var cameraStartY = Math.floor(this.camera.y / this.TILE.HEIGHT);
    var cameraEndX = cameraStartX + this.buffer.cache.width;
    var cameraEndY = cameraStartY + this.buffer.cache.height;
    $render.color('#000').rect(0,30,200,150);
    $render.horizontal(0).vertical(40).align('left').color('#eee').text(this.buffer.cache.width+':'+this.buffer.cache.height);
    $render.horizontal(0).vertical(60).align('left').color('#eee').size(18).text('Camera: '+this.camera.x+':'+this.camera.y);
    $render.horizontal(0).vertical(80).align('left').color('#eee').size(18).text('Camera start: '+cameraStartX+':'+cameraStartY);
    $render.horizontal(0).vertical(100).align('left').color('#eee').size(18).text('Camera end: '+cameraEndX+':'+cameraEndY);

    var startX = Math.max(0,Math.floor(this.camera.x / this.TILE.WIDTH));
    var startY = Math.max(0,Math.floor(this.camera.y / this.TILE.HEIGHT));
    var endX = Math.min(startX + this.buffer.cache.width, this.tiles[0].length );
    var endY = Math.min(startY + this.buffer.cache.height, this.tiles.length );
    $render.horizontal(0).vertical(120).align('left').color('#eee').size(18).text('Map start: '+startX+':'+startY);
    $render.horizontal(0).vertical(140).align('left').color('#eee').size(18).text('Map end: '+endX+':'+endY);
}

Map.prototype.drawIntoBuffer = function(){
    this.buffer.scene.clearRect(0,0,this.buffer.canvas.width,this.buffer.canvas.height);
    var startX = Math.max(0,Math.floor(this.camera.x / this.TILE.WIDTH));
    var startY = Math.max(0,Math.floor(this.camera.y / this.TILE.HEIGHT));
    var endX = Math.min(startX + this.buffer.cache.width, this.tiles[0].length);
    var endY = Math.min(startY + this.buffer.cache.height , this.tiles.length);
    var cameraStartX = Math.floor(this.camera.x / this.TILE.WIDTH);
    var cameraStartY = Math.floor(this.camera.y / this.TILE.HEIGHT);
    for(var y=startY; y < endY; y++){
        for(var x=startX; x < endX ; x++){
            var offsetX = Math.abs(x - cameraStartX);
            var offsetY = Math.abs(y - cameraStartY);
            this.tiles[y][x].draw(this.buffer.scene,offsetX,offsetY);
        }
    }
    this.buffer.cache.x = cameraStartX;
    this.buffer.cache.y = cameraStartY;
    this.buffer.dirty = false;
}

Map.prototype.initBuffer = function(){
    var x = Math.ceil(this.camera.width / this.TILE.WIDTH) + 1;
    var y = Math.ceil(this.camera.height / this.TILE.HEIGHT) +1;
    this.buffer.cache.width = x;
    this.buffer.cache.height = y;
    this.buffer.canvas.width = x*this.TILE.WIDTH;
    this.buffer.canvas.height = y*this.TILE.HEIGHT;
    this.buffer.dirty = true;
}

Map.prototype.getNeighborhood = function(tile){
    var neighborhood = []
    for(let y=-1 ; y <= 1 ; ++y ){
        for(let x=-1 ; x <= 1; ++x ){
            if( x == 0 && y == 0 ){
                 continue;
            }
            var tileX = tile.coordinates.x+x;
            var tileY = tile.coordinates.y+y;
            var neighbour = this.checkTile(tileX,tileY)
            if( neighbour ){
                neighborhood.push(neighbour);
            }
        }
    }
    return neighborhood;
}

Map.prototype.checkTile = function(x,y){
    if( x >= 0 && x < this.tiles[0].length && y >= 0 && y < this.tiles.length ){
        return this.tiles[y][x];
    }
    return false;
}

Map.prototype.getTile = function(x,y){
    var tileX = Math.floor(x / this.TILE.WIDTH);
    var tileY = Math.floor(y / this.TILE.HEIGHT);
    var tile = this.checkTile(tileX,tileY);
    if( tile ){
        return tile;
    }
    return false;
}

Map.prototype.updateSize = function(width,height){
    Layer.prototype.updateSize.call(this,width,height);
    this.initBuffer();
}

Map.prototype.handleDown = function(e){
    var worldX = e.x + this.camera.x;
    var worldY = e.y + this.camera.y;
    if( this.getTile(worldX,worldY) ){
        this.raise('mapClicked',new Point(worldX,worldY));
        e.handled = true;
    }
}

Map.prototype.handleMove = function(e){
    Layer.prototype.handleMove.call(this,e);
    var cameraX = Math.floor(this.camera.x / this.TILE.WIDTH);
    var cameraY = Math.floor(this.camera.y / this.TILE.HEIGHT);
    if( cameraX != this.buffer.cache.x || cameraY != this.buffer.cache.y ){
        this.buffer.dirty = true;
    }
}