var $debug = {
    region: false,
    tileInformation: false,
    entityInformation: false,
    entityCoords: false,
    entityRegions: false,
    entityId: false,
    entityZ: false,
    unitAngle: false,
    unitPath: false,
    raytrace: false,
    natureLimit: false,
    buildingRegion: false,
    camera: false,
    enable: function(){
        $debug.region = true;
        $debug.tileInformation = true,
        $debug.entityInformation = true,
        $debug.entityCoords = true,
        $debug.entityRegions = true,
        $debug.entityId = true,
        $debug.entityZ = true,
        $debug.unitAngle = true,
        $debug.unitPath = true,
        $debug.raytrace = true,
        $debug.natureLimit = true,
        $debug.buildingRegion = true,
        $debug.camera = true
    },
    disable: function(){
        $debug.region = false;
        $debug.tileInformation = false,
        $debug.entityInformation = false,
        $debug.entityCoords = false,
        $debug.entityRegions = false,
        $debug.entityId = false,
        $debug.entityZ = false,
        $debug.unitAngle = false,
        $debug.unitPath = false,
        $debug.raytrace = false,
        $debug.natureLimit = false,
        $debug.buildingRegion = false,
        $debug.camera = false
    }
};
