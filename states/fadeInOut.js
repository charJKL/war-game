function FadeInOut(state){
    State.call(this);
    this.state = state;

    this.start = Date.now();
    this.opacity = 0;
    this.duraction = 500;
}
FadeInOut.prototype = Object.create(State.prototype);

FadeInOut.prototype.update = function(delta){
    if( this.opacity < 1 ){
        this.opacity += delta / this.duraction;
    }else{
        this.opacity = 1;
    }
    this.state.update(delta);
}

FadeInOut.prototype.draw = function(){
    $render.alpha(this.opacity);
    this.state.draw();
}

FadeInOut.prototype.handleDown = function(e){
    this.state.handleDown(e);
}

FadeInOut.prototype.handleMove = function(e){
    this.state.handleMove(e);
}

FadeInOut.prototype.handleUp = function(e){
    this.state.handleUp(e);
}

FadeInOut.prototype.handleKeyboard = function(e){
    this.state.handleKeyboard(e);
}