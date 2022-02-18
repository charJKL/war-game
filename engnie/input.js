function Input(DOM){
    this.falseMoveRange = 10;
    this.isFalseMove = true;
    this.isMove = false;

    DOM.addEventListener('contextmenu',function(e){e.preventDefault();},false);
    DOM.addEventListener('mousedown',this.captureDown.bind(this),false);
    DOM.addEventListener('mouseup',this.captureUp.bind(this),false);
    DOM.addEventListener('mousemove',this.captureMove.bind(this),false);
	 DOM.addEventListener('mousemove',this.captureHover.bind(this),false);
    DOM.addEventListener('mouseout',this.captureLost.bind(this),false);
    DOM.addEventListener('keydown',this.caputeKeyboard.bind(this),false);
}

Input.prototype.decorate = function(e){
    e.x = e.pageX;
    e.y = e.pageY;
    e.diffX = e.pageX - this.last.x;
    e.diffY = e.pageY - this.last.y;
    return e;
}

Input.prototype.captureDown = function(e){
    e.stopPropagation();
    e.preventDefault();
    this.isMove = true;
    this.isFalseMove = true;
    this.last = {x:e.pageX,  y:e.pageY};
    $game.emitDown(this.decorate(e));
}

Input.prototype.captureMove = function(e){
    e.stopPropagation();
    e.preventDefault();
    if( !this.isMove ){
        return false;
    } 
    var diff = {x: e.pageX - this.last.x, y: e.pageY - this.last.y };
    if( !this.isFalseMove || Math.sqrt(diff.x*diff.x + diff.y*diff.y) > this.falseMoveRange ){
        this.isFalseMove = false;
    }
    if( !this.isFalseMove ){
        $game.emitMove(this.decorate(e));
        this.last = {x:e.pageX,  y:e.pageY};
    }
}

Input.prototype.captureHover = function(e)
{
	$game.emitHover(e);
}

Input.prototype.captureUp = function(e){
    e.stopPropagation();
    e.preventDefault();
    this.isMove = false;
    this.isFalseMove = true;
    $game.emitUp(this.decorate(e));
}

Input.prototype.captureLost = function(e){
    this.isMove = false;
}

Input.prototype.caputeKeyboard = function(e){
    $game.emitKeyboard(e);
}