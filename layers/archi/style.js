var Utils = require('../common-styles');
var _ = require('underscore');

var maxZoom = 18;
var size = 24;
var zoomLevels = Utils.getMarkerZoomLevels({
    'marker-width' : size,
    'marker-opacity' : 1,
    'marker-line-width' : 4,
    'marker-line-opacity' : 1,
}, {
    maxZoom : maxZoom
});

var style = Utils.extendStyle({
    'marker-line-color' : 'white',
    'marker-placement' : 'point',
    'marker-type' : 'ellipse',
    'marker-allow-overlap' : true,
}, zoomLevels, {
    '[zoom<16]' : {
        '[type="ArchiStrasbourg"]' : {
            'marker-fill' : '#CC66CC'
        }
    },
    '[zoom>=16]' : {
        'marker-allow-overlap' : true,
        'marker-file' : 'url(../svg/icones-pastille/musee-monuments.svg)'
    }
});

module.exports = {
    '#objects' : style,
}
