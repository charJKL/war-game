function Entity(x,y,sprite){
    Dispatcher.call(this);
    this.id = Entity.id++;
    this.position = new Vector3(x,y,1);
    this.sprite = sprite;
    this.currentFrame = 0;
    this.clickable = new Rect(0,0,0,0);
    this.hitbox = new Rect(0,0,0,0);
    this.commands = new Orders();
    this._select = false;
    this.remove = false;
    this.calculateZ(); 
    this.updateClickable();
    this.updateHitbox();
    this.attach('collide',this.collide);
}
Entity.prototype = Object.create(Dispatcher.prototype);
Entity.id = 1;

Entity.prototype.update = function(delta){
    this.commands.execute(this,delta);
}

Entity.prototype.collide = function(event){
    // Shoud be override
}

Entity.prototype.resolve = function(){
    // Shoud be overrride
}

Entity.prototype.draw = function(x,y){
    $render.drawSprite(this.sprite,this.currentFrame,x,y);
    if( this._select ){
        $render.select(this.sprite,this.currentFrame,x,y);
    }
    if( $debug.entityInformation ){
        this.debug(x,y);
    }
}

Entity.prototype.command = function(command){
    if( !(command instanceof Command) ){
        throw 'Must pass <<Command>> instance. Give: '+command;
    }
    var last = this.commands.orders.front();
    if( last ){
        last.markDismiss();
    }
    this.commands.after(command);
}

Entity.prototype.goNext = function(){
    var last = this.commands.orders.front();
    if( last.getType() === 'move'){
        last.current++;
        return;
    }
    if( last instanceof Orders ){
        var sub = last.orders.front();
        if( sub.getType() === 'move' ){
            sub.current++;
        }
    }
}

Entity.prototype.use = function(invoker){
    return false;
}

Entity.prototype.wasClicked = function(x,y){
    if( this.remove ){
        return false;
    }
    return this.clickable.contains(x,y);
}

Entity.prototype.calculateZ = function(){
    this.position.z = this.position.y;
}

Entity.prototype.updateClickable = function(){
    this.clickable.x = this.position.x - this.sprite.frames[this.currentFrame].clickable.x;
    this.clickable.y = this.position.y - this.sprite.frames[this.currentFrame].clickable.y;
    this.clickable.width = this.sprite.frames[this.currentFrame].clickable.width;
    this.clickable.height = this.sprite.frames[this.currentFrame].clickable.height;
}

Entity.prototype.updateHitbox = function(){
    this.hitbox.x = this.position.x - this.sprite.frames[this.currentFrame].hitbox.x;
    this.hitbox.y = this.position.y - this.sprite.frames[this.currentFrame].hitbox.y;
    this.hitbox.width = this.sprite.frames[this.currentFrame].hitbox.width;
    this.hitbox.height = this.sprite.frames[this.currentFrame].hitbox.height;
}

Entity.prototype.debug = function(x,y){
    var screenX = x - this.position.x;
    var screenY = y - this.position.y; 

    if( $debug.entityRegions ){
        $render.scene.globalAlpha = 0.5;
        $render.scene.fillStyle = '#ff0000';
        $render.scene.fillRect(screenX + this.clickable.x ,screenY + this.clickable.y,this.clickable.width,this.clickable.height);

        $render.scene.fillStyle = '#000000';
        $render.scene.fillRect(screenX + this.hitbox.x ,screenY + this.hitbox.y,this.hitbox.width,this.hitbox.height);
        $render.scene.globalAlpha = 1;

        $render.scene.fillStyle = '#ff0000';
        $render.scene.beginPath(); 
        $render.scene.arc(x, y, 2, 0, 2 * Math.PI, true); 
        $render.scene.fill();
    }

    if( $debug.entityId){
        $render.scene.font='bold 13px Segoe UI';
        $render.scene.fillStyle = '#ff0000';
        $render.scene.textAlign = 'center';
        $render.scene.textBaseline = 'middle';
        $render.scene.fillText(this.id,x,y-10);
    }

    if( $debug.entityCoords ){
        $render.scene.font='bold 13px Segoe UI';
        $render.scene.fillStyle = '#ff0000';
        $render.scene.textAlign = 'center';
        $render.scene.textBaseline = 'middle';
        $render.scene.fillText(Math.round(this.position.x)+':'+Math.round(this.position.y),x,y+10);
    }
    if( $debug.entityZ ){
        $render.scene.font='12px Segoe UI';
        $render.scene.fillStyle = '#ff0000';
        $render.scene.textAlign = 'center';
        $render.scene.textBaseline = 'middle';
        $render.scene.fillText(this.position.z,x,y+30);
    }
}