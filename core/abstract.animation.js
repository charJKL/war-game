function Animation(x,y,animation){
    Movement.call(this,x,y,animation[0]);
    this.animations = {};
    this.name = 'stop';

    this.loop = true;
    this.current = animation;
    this.start = 0;
    this.duration = 600;
    this.frames = 0;
    this.addAnimation('stop',animation);
}
Animation.prototype = Object.create(Movement.prototype);

Animation.prototype.currentAnimation = function(name){
    return this.name == name;
}

Animation.prototype.addAnimation = function(name, animation, loop){
    var loop = (typeof loop === "undefined") ? true : loop;
    assert( typeof name === "string");
    assert( animation instanceof Array );
    this.animations[name] = {loop: loop, frames: animation};
}

Animation.prototype.changeAnimation = function(name){
    if( this.name == name ){
        return;
    }
    if( this.animations[name] ){
        this.name = name;
        this.loop = this.animations[name].loop;
        this.current = this.animations[name].frames;
    }
}

Animation.prototype.update = function(delta){
    Movement.prototype.update.call(this,delta);
    var current = this.current[this.resolveAnimation(this.rotation)]; 
    if( this.sprite != current ){
        this.sprite = current;
        this.start = new Date().getTime();
        this.frames = current.frames.length;
    }
    var now = new Date().getTime();
    var passed = ( now - this.start ) % this.duration;
    this.currentFrame = Math.floor( passed / this.duration * this.frames );
    this.updateClickable();
    this.updateHitbox();
}

Animation.prototype.resolveAnimation = function(rotation){
    if( rotation.isZero() ){
        return 0;
    }
    var angle = rotation.angle();
    switch( true ){
        case ( angle > 5.88 || angle < 0.38): return 1;
        case ( angle >= 0.38 && angle < 1.16): return 2;
        case ( angle >= 1.16 && angle < 1.95): return 3;
        case ( angle >= 1.95 && angle < 2.74): return 4;
        case ( angle >= 2.74 && angle < 3.52): return 5;
        case ( angle >= 3.52 && angle < 4.31): return 6;
        case ( angle >= 4.31 && angle < 5.09): return 7;
        case ( angle >= 5.09 && angle < 5.88): return 8;
    }
}