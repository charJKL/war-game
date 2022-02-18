function Ui(){
    Layer.call(this);
    this.buttons = [];
    this.timeout = 0;
    this.ALIGNMENT_BOTTOM = -100;
}
Ui.prototype = Object.create(Layer.prototype);

Ui.prototype.load = function(){
    return [
        $assets.loadTexture('assets/ui')
    ];
}

Ui.prototype.init = function(timeout){
    this.timeout = timeout;
    var house = new Construct(ALIGNMENT.CENTER-238,ALIGNMENT.BOTTOM+this.ALIGNMENT_BOTTOM,96,96);
        house.construct = House;
        this.buttons.push(house);

    var bakery = new Construct(ALIGNMENT.CENTER-113,ALIGNMENT.BOTTOM+this.ALIGNMENT_BOTTOM,96,96);
        bakery.construct = Bakery;
        this.buttons.push(bakery);

    var mine = new Construct(ALIGNMENT.CENTER+14,ALIGNMENT.BOTTOM+this.ALIGNMENT_BOTTOM,96,96);
        mine.construct = Mine;
        this.buttons.push(mine);

    var fortress = new Construct(ALIGNMENT.CENTER+139,ALIGNMENT.BOTTOM+this.ALIGNMENT_BOTTOM,96,96);
        fortress.construct = Fortress;
        this.buttons.push(fortress);
}

Ui.prototype.draw = function(){
    var percentage = ($game.time / this.timeout) * ALIGNMENT.RIGHT;
    $render.color('#f00').rect(0,0,percentage,5);

    $hud.display($render);
    $render.alpha(0.5).color('#000').rect(ALIGNMENT.CENTER-300,ALIGNMENT.TOP,600,40);
    $render.vertical(ALIGNMENT.TOP).horizontal(ALIGNMENT.CENTER-300).drawStatic($assets.get('resources'));
    $render.vertical(ALIGNMENT.TOP+22).horizontal(ALIGNMENT.CENTER-260).align('left').color('#eee').size(18).text($player.settlers);
    $render.vertical(ALIGNMENT.TOP+22).horizontal(ALIGNMENT.CENTER-140).align('left').color('#eee').size(18).text($player.food);
    $render.vertical(ALIGNMENT.TOP+22).horizontal(ALIGNMENT.CENTER-20).align('left').color('#eee').size(18).text($player.wood);
    $render.vertical(ALIGNMENT.TOP+22).horizontal(ALIGNMENT.CENTER+100).align('left').color('#eee').size(18).text($player.stone);
    $render.vertical(ALIGNMENT.TOP+22).horizontal(ALIGNMENT.CENTER+220).align('left').color('#eee').size(18).text($player.gold);
    
    $render.alpha(0.5).color('#000').rect(ALIGNMENT.CENTER-250,ALIGNMENT.BOTTOM-50,500,50);
    $render.vertical(ALIGNMENT.BOTTOM+this.ALIGNMENT_BOTTOM).horizontal(ALIGNMENT.CENTER-250).drawStatic($assets.get('bottom'));
    for(var i=0; i < this.buttons.length ; i++){
        this.buttons[i].draw();
    }
}


Ui.prototype.handleDown = function(e){
    for(var i=0; i < this.buttons.length; i++){
        if( this.buttons[i].wasClicked(e.x,e.y) ){
            this.raise('uiClicked',this.buttons[i],e);
            e.handled = true;
        }
    }
}

Ui.prototype.handleHover = function(e){
    for(var i=0; i < this.buttons.length; i++){
        if( this.buttons[i].wasClicked(e.x,e.y) ){
            this.cursor("pointer");
            e.handled = true;
        }
    }
}