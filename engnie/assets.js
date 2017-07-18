function Assets(){
    this.resource = {};
    this._cached = [];
    this._list = [];
}
STATUS = {
    LOADING: 0,
    DONE: 1,
    CACHED: 2 
}

Assets.prototype.get = function(name){
    if( !this.exist(name) ){
        console.log('Can find asset: '+name);
        debugger;
    }
    return this.resource[name];
}

Assets.prototype.exist = function(name){
    return !(typeof this.resource[name] === 'undefined');
}

Assets.prototype.alreadyCached = function(name){
    return this._cached.includes(name);
}

Assets.prototype.loadTexture = function(name){
    this.setStatusLoading(name+'.png');
    this.setStatusLoading(name+'.txt');
    if( this.alreadyCached(name) ){
        this.setStatusCached(name+'.png');
        this.setStatusCached(name+'.txt');
        return true;
    }
    this.cached(name);
    return Promise
        .all([this.loadImage(name+'.png'), this.loadText(name+'.txt').catch(this.tryCORS.bind(this,name+'.txt'))])
        .then(this.initTexture.bind(this));
}

Assets.prototype.loadLevel = function(name){
    name = 'levels/'+name;
    this.setStatusLoading(name+'.txt');
    if( this.alreadyCached(name) ){
        this.setStatusCached(name+'.txt');
        return true;
    }
    this.cached(name);
    return this.loadText(name+'.txt').catch(this.tryCORS.bind(this,name+'.txt')).then(this.initLevel.bind(this));
}

Assets.prototype.initTexture = function(resource){
    for(var i=0 ; i < resource[1].length ; i++){
        var sprite = resource[1][i];
        this.resource[sprite.name] = new Sprite(resource[0],sprite.frames);
    }
}

Assets.prototype.initLevel = function(resource){
    this.resource[resource.name] = resource;
}

Assets.prototype.loadText = function(path){
    var that = this;
    return new Promise(function(resolve, reject){
        var xhttp = new XMLHttpRequest();
        xhttp.responseType = 'text';
        xhttp.onload = function() {
            that.setStatusDone(path);
            var response = xhttp.response.substring(xhttp.response.indexOf('=')+1);
            resolve(JSON.parse(response));
        }
        xhttp.onerror = function(e){
            reject(path);
        }
        xhttp.open('GET', path);
        try{
            xhttp.send();
        }catch(e){
            reject(path);
        }
    });
}

Assets.prototype.tryCORS = function(path){
    var that = this;
    return new Promise(function(resolve, reject){
        var js = document.createElement('script');
            js.addEventListener('load',function(){
                name = '_'+path.substring(path.indexOf('/')+1,path.indexOf('.'));
                resolve(window[name]);
            });
            js.addEventListener('error',function(){
                reject(path);
            });
            js.src = path;
        document.body.appendChild(js);
    });
}

Assets.prototype.loadImage = function(path){
    var that = this;
    return new Promise(function(resolve, reject){
        var asset = new Image();
        asset.onload = function(){
            that.setStatusDone(path);
            resolve(this);
        },
        asset.onerror = function(){
            reject(path);
        }
        asset.src = path;
    });
}

Assets.prototype.cached = function(name){
    this._cached.push(name);
}

Assets.prototype.setStatusLoading = function(name){
    this._list.push({
        name: name,
        status: STATUS.LOADING
    })
}

Assets.prototype.setStatusDone = function(name){
    for(var i=0; i < this._list.length ; i++){
        if( this._list[i].name == name ){
            this._list[i].status = STATUS.DONE;
        }
    }
}

Assets.prototype.setStatusCached = function(name){
     for(var i=0; i < this._list.length ; i++){
        if( this._list[i].name == name ){
            this._list[i].status = STATUS.CACHED;
        }
    }
}

Assets.prototype.list = function(){
    return this._list;
}

Assets.prototype.clear = function(){
    this._list = [];
}