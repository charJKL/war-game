function Main(lose){
    State.call(this);
    this.lose = lose ;
    this.levels = [];
}
Main.prototype = Object.create(State.prototype);

Main.prototype.load = function(){
    return Promise.all([
        $assets.loadTexture('assets/main')
    ]);
}

Main.prototype.init =  function(){
    var level1 = new Region(ALIGNMENT.CENTER+95,440,65,40);
        level1.handleClick = function(){ $game.changeState(new Gameplay('north')); }

    var level2 = new Region(ALIGNMENT.CENTER-250,525,40,40);
        level2.handleClick = function(){ $game.changeState(new Gameplay('west')); }

    var level3 = new Region(ALIGNMENT.CENTER-120,535,55,35);
        level3.handleClick = function(){ $game.changeState(new Gameplay('south')); }

    this.levels.push(level1);
    this.levels.push(level2);
    this.levels.push(level3);
}

Main.prototype.draw = function(){
    $render.clear();
    $render.vertical(ALIGNMENT.TOP+20).horizontal(ALIGNMENT.CENTER).drawStatic($assets.get('logo'));
    $render.vertical(ALIGNMENT.TOP+320).horizontal(ALIGNMENT.CENTER).drawStatic($assets.get('map'));
    $render.vertical(ALIGNMENT.TOP+280).horizontal(ALIGNMENT.CENTER).color('#eee').size(30).text('Select        region to defend');
    $render.vertical(ALIGNMENT.TOP+280).horizontal(ALIGNMENT.CENTER-71).color('#f00').size(30).text('red');
    for(let i=0; i < this.levels.length; i++){
            this.levels[i].draw();
    }
    if( this.lose === 'lose' ){
        $render.vertical(ALIGNMENT.TOP+50).horizontal(ALIGNMENT.CENTER).color('#f00').size(30).text('Straciłeś wszystkich osadników. Przegrałeś.');
    }
    if( this.lose === 'win'){
        $render.vertical(ALIGNMENT.TOP+50).horizontal(ALIGNMENT.CENTER).color('#0a0').size(30).text('Wygrałeś. Pokonałeś wszystkich przeciwników.');
    }

}

Main.prototype.handleDown = function(e){
    for(let i=this.levels.length-1 ; i >= 0; i--){
        if ( this.levels[i].wasClicked(e.x,e.y) ){
            this.levels[i].handleClick();
            return;
        }
    }
}
