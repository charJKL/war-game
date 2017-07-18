function Region(x,y,width,height){
    this.id = Region.id++;
    this.position = new Rect(x,y,width,height);
    this.handleClick = function(){ console.log('Clicked: Region#'+this.id); };
}
Region.id = 0;

Region.prototype.draw = function(){
    if( $debug.region ){
        this.debug();
    }
}

Region.prototype.debug = function(){
    $render.color('#0000ff').alpha(0.4).rect(this.position.x,this.position.y,this.position.width,this.position.height);
}

Region.prototype.wasClicked = function(x,y){
    return this.position.contains(x,y);
}