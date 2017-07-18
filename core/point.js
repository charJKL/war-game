function Point(x,y){
    this.position = new Vector2(x,y);
}

Point.prototype.use = function(invoker){
    switch( true ){
        case invoker instanceof Unit:
            invoker.command(new Move(invoker,this));
            return true;
            
        case invoker instanceof Building:
            invoker.command(new GetOut(invoker,this));
            return true;

        case invoker instanceof Construct:
            new Build(invoker, this);
            return true;
    }
    return false;
}