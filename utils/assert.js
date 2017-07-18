function assert(condition, message) {
    if( condition ){
        return;
    } 
    console.log('--- ASSERATION FAIL ---');
    message && console.log(message);
    debugger;
}