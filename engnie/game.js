function Game(){
    this.state = null;
    this.time = 0;
}
Game.prototype.init = function(){
    $render = new Render(document.getElementById('screen'));
    $input = new Input(window);
    $assets = new Assets();

    this.changeState(new Main(''));
    this.run();
}

Game.prototype.run = function(){
    var lastFrame = 0;
    function loop(time){
        requestAnimationFrame(loop.bind(this));
        var delta = time - lastFrame;
        if( delta < 100 ){
            this.time += delta;
            this.state.update(delta);
        }
        this.state.draw();
        lastFrame = time;
    }
    requestAnimationFrame(loop.bind(this));
}

Game.prototype.stop = function(){
}

Game.prototype.changeState = function(newState){
    this.state = new FadeInOut(new Loading());
    this.time = 0;
    newState
        .load()
        .then(()=>{
            $assets.clear();
            newState.init();
            this.state = new FadeInOut(newState); })
        .catch((e)=>{
            Loading.error = true;
            console.log('Cant load assets.',e);
    });
}

Game.prototype.emitDown = function(e){
    this.state.handleDown(e);
}

Game.prototype.emitUp = function(e){
    this.state.handleUp(e);
}

Game.prototype.emitMove = function(e){
    this.state.handleMove(e);
}

Game.prototype.emitHover = function(e){
    this.state.handleHover(e);
}

Game.prototype.emitKeyboard = function(e){
    this.state.handleKeyboard(e);
}