function Loading(){
    State.call(this);
    this.list = [];
    this.error = false;
}
Loading.prototype = Object.create(State.prototype);

Loading.prototype.update = function(delta){
    this.list = $assets.list();
}

Loading.prototype.draw = function(){
    $render.clear();
    if( Loading.error ){
        $render.vertical(ALIGNMENT.TOP+260).horizontal(ALIGNMENT.CENTER).color('#f00').size(32).text('Error occurs.');
        $render.vertical(ALIGNMENT.TOP+287).horizontal(ALIGNMENT.CENTER).color('#f00').size(16).text('Can\'t load assets. Try refresh page.');

        $render.vertical(ALIGNMENT.TOP+350).horizontal(ALIGNMENT.CENTER).color('#f00').size(16).text('If you try load game directly from folder');
        $render.vertical(ALIGNMENT.TOP+377).horizontal(ALIGNMENT.CENTER).color('#f00').size(16).text('problem caused by CORS request.');
    }else{
        $render.vertical(ALIGNMENT.TOP+280).horizontal(ALIGNMENT.CENTER).color('#eee').size(40).text('Loading assets...');
    }
    $render.color('#eee').rect(ALIGNMENT.CENTER-180,ALIGNMENT.TOP+305,360,2);
    /*
    for(var i=0; i < this.list.length ; i++){
        var file = this.list[i];
        var position = 330 + i * 27;
        var status = ( file.status != STATUS.LOADING ) ? ( file.status != STATUS.CACHED ) ? '#007f00' : '#ffa500 ' : '#ff0000' ;
        $render.vertical(ALIGNMENT.TOP+position).horizontal(ALIGNMENT.CENTER-170).align('left').color(status).size(20).text(file.name);
    }
    */
}