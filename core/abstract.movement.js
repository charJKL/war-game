function Movement(x,y,sprite){
    Entity.call(this,x,y,sprite);
    this.speed = 0.15;
    this.rotation = new Vector2(0,1);
    this.direction = new Vector2(0,0);
    this.steering = new Vector2(0,0);
    this.last = new Vector2(0,0);
}
Movement.prototype = Object.create(Entity.prototype);

Movement.prototype.update = function(delta){
    Entity.prototype.update.call(this,delta);
    var velocity = new Vector2(0,0);
        velocity.add(this.direction);
        velocity.add(this.steering);
        velocity.multiplie(this.speed);
    this.updatePosition(velocity.x * delta, velocity.y * delta);
    this.fallback();
    if( !velocity.isZero() ){
        $objects.markDirty();
    }
    if( !this.direction.isZero() ){
        this.rotation.x = this.direction.x;
        this.rotation.y = this.direction.y;
    }
}

Movement.prototype.fallback = function(){
    if( this.direction.isZero() ){
        return false;
    }
    var x = (Math.abs(this.last.x - this.position.x));
    var y = (Math.abs(this.last.y - this.position.y));
    if( x < 0.1 && y < 0.1 ){
        this.goNext();
    }
    this.last.x = this.position.x;
    this.last.y = this.position.y;
}

Movement.prototype.updatePosition = function(x,y){
    this.position.x += x; 
    this.position.y += y;
    this.clickable.x += x;
    this.clickable.y += y;
    this.hitbox.x += x;
    this.hitbox.y += y; 
    this.calculateZ();
}

Movement.prototype.setDirection = function(direction){
    this.direction = direction;
}

Movement.prototype.setRotation = function(rotation){
    this.rotation.x = rotation.x;
    this.rotation.y = rotation.y;
}

Movement.prototype.stop = function(){
    this.direction.x = 0;
    this.direction.y = 0;
}

Movement.prototype.debug = function(x,y){
    Entity.prototype.debug.call(this,x,y);
    var screenX = x - this.position.x;
    var screenY = y - this.position.y; 
    
    if( $debug.unitAngle ){
        var angle = this.rotation.angle();
        var length = 20;
        $render.scene.beginPath();
        $render.scene.lineWidth='5';
        $render.scene.strokeStyle = '#0000ff' ;
        $render.scene.moveTo(x,y);
        $render.scene.lineTo(x + Math.cos(angle)*length ,y + Math.sin(angle*-1)*length);
        $render.scene.stroke();

        var angle = this.direction.angle();
        var length = ( this.direction.isZero() ) ? 0 : 20;
        $render.scene.beginPath();
        $render.scene.lineWidth='5';
        $render.scene.strokeStyle = '#00ff00' ;
        $render.scene.moveTo(x,y);
        $render.scene.lineTo(x + Math.cos(angle)*length ,y + Math.sin(angle*-1)*length);
        $render.scene.stroke();

        var angle = this.steering.angle();
        var length = ( this.steering.isZero() ) ? 0 : 30;
        $render.scene.beginPath();
        $render.scene.lineWidth='5';
        $render.scene.strokeStyle = '#ffff00' ;
        $render.scene.moveTo(x,y);
        $render.scene.lineTo(x + Math.cos(angle)*length ,y + Math.sin(angle*-1)*length);
        $render.scene.stroke();

        $render.scene.font='12px Segoe UI';
        $render.scene.fillStyle = '#ff0000';
        $render.scene.textAlign = 'center';
        $render.scene.textBaseline = 'middle';
        $render.scene.fillText(this.direction.angle(),x,y+45);
    }
    if( $debug.unitPath ){
        function draw(path){
            if( path.length > 0){
                $render.scene.beginPath();
                $render.scene.lineWidth='2';
                $render.scene.strokeStyle = '#00ff00' ;
                $render.scene.moveTo(screenX+path[0].x,screenY+path[0].y);
                for(let i=1; i < path.length ; i++){
                    $render.scene.lineTo(screenX+path[i].x,screenY+path[i].y);
                }
                $render.scene.stroke();
            }
        }
        if( this.commands.orders.front() instanceof Move ){
            var path = this.commands.orders.front().waypoints;
            draw(path);
        }
        if( this.commands.orders.front() instanceof Orders && this.commands.orders.front().orders.front() instanceof Move){
            var path = this.commands.orders.front().orders.front().waypoints;
            draw(path);
        }
    }
}