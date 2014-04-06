var Utils = require('../common-styles');
var _ = require('underscore');

var visiter = [ 'Monument', 'Museum', 'Hotels' ];

var zoomLevels = Utils.getMarkerZoomLevels({
    'marker-width' : 24,
    'marker-opacity' : 1,
    'marker-line-width' : 4,
    'marker-line-opacity' : 1,
}, {
    maxZoom : 18
});

var style = Utils.extendStyle({
    'marker-line-color' : 'white',
    'marker-placement' : 'point',
    'marker-type' : 'ellipse',
    'marker-allow-overlap' : true,
}, zoomLevels, {
    '[zoom<16]': {
        'marker-fill' : 'red'
    },
    '[zoom>=16]' : {
        '[type="monument"]' : {
            'marker-file' : 'url(../svg/icones-pastille/musee-monuments.svg)'
        },
        '[type="museum"]' : {
            'marker-fill' : 'red',
            'marker-file' : 'url(../svg/maki/building-18.svg)'
        }
    }
});

module.exports = {
    '#objects' : style
}