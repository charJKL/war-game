function Hud(){
    this.MAX = 5;
    this.lineHeight = 20;
    this.showTime = 2000;
    this.time = 1000;
    this.dialog = [];
}

Hud.prototype.say = function(text){
    this.line(text,'#fff');
}

Hud.prototype.shout = function(text){
    this.line(text,'#f00');
}

Hud.prototype.line = function(text,color){
    this.dialog.push({text:text,time: new Date().getTime(),color: color});
    if( this.dialog.length > this.MAX ){
        this.dialog.shift();
    }
}

Hud.prototype.getDialog = function(name){
    var name = (typeof name === "undefined") ? '' : name;
    assert( $dialogs[name] );
    var count = $dialogs[name].length;
    return $dialogs[name][Math.floor(Math.random() * count)];
}

Hud.prototype.display = function(scene){
    var offset = 150;
    for(var i=this.dialog.length-1 ; i >= 0 ; i--){
        var diff = new Date().getTime() - this.dialog[i].time;
        var alpha = ( diff > this.showTime ) ? 1-((diff-this.showTime)/this.time) : 1 ;
        if( alpha <= 0){
            this.dialog.splice(i,1);
            continue;
        }
        offset -= this.lineHeight;
        scene.alpha(alpha).vertical(ALIGNMENT.TOP+offset).horizontal(ALIGNMENT.CENTER).align('center').color(this.dialog[i].color).size(18).text(this.dialog[i].text);
    }
}
