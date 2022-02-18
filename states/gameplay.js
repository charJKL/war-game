function Gameplay(level){
    State.call(this);
    this.level = level;
    this.layers = [];
    this.moveMap = true;
    this.diselect = false;
    this.time = 0;

    $map = new Map();
    $objects = new Objects();
    $ui = new Ui();

    this.layers.push($map);
    this.layers.push($objects);
    this.layers.push($ui);

    $render.attach('resize',this.updateCamera.bind(this));
    this.updateCamera({width:ALIGNMENT.RIGHT,height:ALIGNMENT.BOTTOM});
}
Gameplay.prototype = Object.create(State.prototype);

Gameplay.prototype.init = function(){
    var level = $assets.get(this.level);
    $map.init(level);
    $objects.init();
    $ui.init(level.timeout);

    for(var i = 0; i < level.objects.length; i++){
        var object = level.objects[i];
        var entity = new window[object.name](object.x,object.y);
        $objects.add(entity);
    }

    $commander = new Commander();
        $map.attach('mapClicked',$commander.mapClicked.bind($commander));
        $objects.attach('entityClicked',$commander.entityClicked.bind($commander));
        $ui.attach('uiClicked',$commander.uiClicked.bind($commander));
    
    $ai = new AI(level.timeout,level.enemies);
    $hud = new Hud();
    $player = new Player(level.resource);
    $collisions = new Collision();
    $raytrace = new Raytrace();
    $pathfind = new Pathfind();

    this.initCamera(level.start);
}


Gameplay.prototype.load = function(){
    var resource = [$assets.loadLevel(this.level)];
    for(let i=0 ; i < this.layers.length ; i++){
        resource = resource.concat(this.layers[i].load());
    }
    return Promise.all(resource);
}

Gameplay.prototype.update = function(delta){
    for(let i=0 ; i < this.layers.length ; i++){
        this.layers[i].update(delta);
    }
    $collisions.check();
    $ai.check();
    this.checkWin();
}

Gameplay.prototype.draw = function(){
    for(let i=0 ; i < this.layers.length ; i++){
        this.layers[i].draw();
    }
}

Gameplay.prototype.checkWin = function(e){
    if( $game.time < $ai.timeout ){
        return false;
    }
    var battle = 0;
    var units = $objects.entities;
    for(var i=0; i < units.length ; i++){
        if( units[i] instanceof Enemy ){
            battle++;
        }
    }
    if( battle == 0 ){
        $game.changeState(new Main('win'));
    }
}

Gameplay.prototype.initCamera = function(position){
    var diff = {
        x: position.x - (ALIGNMENT.RIGHT / 2),
        y: position.y - (ALIGNMENT.BOTTOM / 2)
    };
    this.moveMap = true;
    this.handleMove({diffX: -diff.x, diffY: -diff.y});
    this.moveMap = false;
}

Gameplay.prototype.updateCamera = function(e){
    for(let i=0 ; i < this.layers.length ; i++){
        this.layers[i].updateCamera(e.width,e.height);
    }
}

Gameplay.prototype.handleDown = function(e){
    if( e.buttons === 2 ){// LMB - move map
        this.moveMap = true;
        this.diselect = true;
        return;
    }
    for(let i=this.layers.length-1; i>=0 ; i-- ){
        if( e.handled ){
            return;
        }
        this.layers[i].handleDown(e);
    }
}

Gameplay.prototype.handleUp = function(e){
    if( this.diselect ){
        $commander.select(null);
    }
    this.moveMap = false;
    this.diselect = false;
}

Gameplay.prototype.handleMove = function(e){
    if( !this.moveMap ){
        return;
    }
    this.diselect = false;
    for(let i=0 ; i < this.layers.length ; i++){
        this.layers[i].handleMove(e);
    }
}

Gameplay.prototype.handleHover = function(e){
    for(let i=this.layers.length-1; i>=0 ; i-- ){
		 if(e.handled) return;
      this.layers[i].handleHover(e);
    }
	this.cursor("default");
}

Gameplay.prototype.handleKeyboard = function(e){
    switch (e.key) {
        case "Escape":
            $game.changeState(new Main(''));
        break;

        case "Esc":
            $game.changeState(new Main(''));
        break;
    }
}
