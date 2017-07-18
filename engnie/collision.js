function Collision(entities,map){
    assert( $objects );
    assert( $map );
    
    this.entities = $objects.entities;
    this.map = $map;
    this.collision = {};
}

Collision.prototype.check = function(){
    for(var i=0; i < this.entities.length ; i++ ){
        if( this.entities[i].remove ){
            continue;
        }
        if( !(this.entities[i] instanceof Unit) ){
            continue;
        }

        for(var j=0; j < this.entities.length ; j++){
            if( this.entities[j].remove ){
                continue;
            }
            if( i === j ){
                continue;
            }
            var id = this.id(this.entities[i].id,this.entities[j].id);
            if( this.entities[i].hitbox.collide(this.entities[j].hitbox) ){
                if( this.collision[id] ){
                    continue;
                }
                this.collision[id] = {
                    frame: new Date().getTime(),
                    a: this.entities[i],
                    b: this.entities[j]
                } 
                this.entities[i].raise('collide',{entity: this.entities[j],manifold: this.manifold(this.entities[i],this.entities[j])})
                this.entities[j].raise('collide',{entity: this.entities[i],manifold: this.manifold(this.entities[j],this.entities[i])})
            }else{
                if( !this.collision[id] ){
                    continue;
                }
                this.entities[i].resolve();
                this.entities[j].resolve();
                this.collision[id] = null;
            }
        }
    }
}

Collision.prototype.isTraversable = function(vector){
    assert( vector instanceof Vector2 );
    if( $map.getTile(vector.x,vector.y) === false ){
        return true;
    }
    for(var i=0; i < this.entities.length ; i++ ){
        if( this.entities[i].remove ){
            continue;
        }
        if( this.entities[i] instanceof Unit ){
            continue;
        }
        if( this.entities[i].hitbox.contains(vector.x,vector.y) ){
            return this.entities[i];
        }
    }
    return false;
}

Collision.prototype.isPlaceable = function(vector){
    assert( vector instanceof Vector2 );
    for(var i=0; i < this.entities.length ; i++ ){
        if( this.entities[i].remove ){
            continue;
        }
        if( this.entities[i] instanceof Unit ){
            return this.entities[i];
        }
        if( this.entities[i].hitbox.contains(vector.x,vector.y) ){
            return this.entities[i];
        }
    }
    return false;
}

Collision.prototype.checkPosition = function(hitbox){
    assert( hitbox instanceof Rect );
    for(var i=0; i < this.entities.length ; i++ ){
        if( this.entities[i].remove ){
            continue;
        }
        if( this.entities[i].hitbox.collide(hitbox) ){
            return this.entities[i];
        }
    }
    return false;
}

Collision.prototype.id = function(x,y){
    assert( x < 65535 );
    assert( y < 65535 );
    if( x > y ){
        //[x, y] = [y, x]
        var temp = x;
        x = y;
        y = temp;
    }
    return (x << 16) + y;
}

Collision.prototype.manifold = function(a,b){
    var diff = new Vector2(b.position.x - a.position.x, b.position.y - a.position.y);
    var diff_x = a.hitbox.width/2 + b.hitbox.width/2 - Math.abs(diff.x);
    var diff_y = a.hitbox.height/2 + b.hitbox.height/2 - Math.abs(diff.y);
    var normal = new Vector2(0,0);
    var penetration = 0;
    if( diff_x < diff_y ){
        normal.x = ( diff.x > 0 ) ? -1 : 1;
        penetration = diff_x;
    }else{
        normal.y = ( diff.y > 0 ) ? -1 : 1;
        penetration = diff_y;
    }
    return {diff: diff, normal: normal, penetration: penetration}
}