function Commander(){
    this.selected = null;
}

Commander.prototype.mapClicked = function(point,e){
    if( !this.selected ){
        return;
    }
    point.use(this.selected,e);
}

Commander.prototype.entityClicked = function(entity,e){
    if( !this.selected ){
        if( entity instanceof Enemy ){
            return;
        }
        this.select(entity);
        return;
    }
    var status = entity.use(this.selected);
    if( status === false ){
        this.select(entity);
    }
}

Commander.prototype.uiClicked = function(button,e){
    this.select(button);
}

Commander.prototype.select = function(object){
    if( this.selected ){
        this.selected._select = false;
    }
    this.selected = object;
    if( this.selected ){
        this.selected._select = true;
    }
}



