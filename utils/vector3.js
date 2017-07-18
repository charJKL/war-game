function Vector3(x,y,z){
    Vector2.call(this,x,y);
    this.z = z;
}
Vector3.prototype = Object.create(Vector2.prototype);