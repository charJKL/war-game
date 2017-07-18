function Raytrace(){
    assert( $map );
}
Raytrace.prototype.find = function(a, b){
    assert( a.position );
    assert( b.position );
    var fromTile = $map.getTile(a.position.x,a.position.y); 
    var toTile = $map.getTile(b.position.x,b.position.y);
    var line = this.search(fromTile,toTile);
    if( $debug.raytrace ){
        this.debug(a,b,line);
    }
    return line;
}

Raytrace.prototype.search = function(a,b){
    var diff = new Vector2(Math.abs(a.coordinates.x - b.coordinates.x),Math.abs(a.coordinates.y - b.coordinates.y));
    var tiles = [$map.checkTile(a.coordinates.x,a.coordinates.y)];
    var currentX = a.coordinates.x;
    var currentY = a.coordinates.y;
    var moveX = ( a.coordinates.x <= b.coordinates.x ) ? 1 : -1; 
    var moveY = ( a.coordinates.y <= b.coordinates.y ) ? 1 : -1;
    if( diff.x >= diff.y ){
        var e = diff.x / 2;
        for(var i=0; i < diff.x ; i++){
            currentX += moveX;
            e -= diff.y;
            if( e < 0 ){
                currentY += moveY;
                e += diff.x;
            }
            tiles.push($map.checkTile(currentX,currentY));
        }
    }else{
        e = diff.y / 2;
        for(var i=0; i < diff.y ; i++){
            currentY += moveY;
            e -= diff.x;
            if( e < 0 ){
                currentX += moveX;
                e += diff.y;
            }
            tiles.push($map.checkTile(currentX,currentY));
        }
    }
    return tiles;
}

Raytrace.prototype.debug = function(a,b,line){
    var screenX = $map.camera.x;
    var screenY = $map.camera.y;

    $render.scene.beginPath();
    $render.scene.lineWidth='1';
    $render.scene.strokeStyle = '#cc00cc' ;
    $render.scene.moveTo(screenX + a.position.x,screenY + a.position.y);
    $render.scene.lineTo(screenX + b.position.x,screenY + b.position.y);
    $render.scene.stroke();

    for(var i=0; i < line.length ; i++){
        var tile = line[i];
        $render.scene.beginPath();
        $render.scene.lineWidth='1';
        $render.scene.strokeStyle = '#ff0000';
        $render.scene.rect(screenX + tile.size.x,screenY + tile.size.y,tile.size.width,tile.size.height);
        $render.scene.stroke(); 
    }

}