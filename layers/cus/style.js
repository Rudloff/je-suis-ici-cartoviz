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
        '[type="Velhop"]' : {
            'marker-fill' : '#93C01C'
        },
        '[type="Parking"]' : {
            'marker-fill' : '#2E318C'
        }
    },
    '[zoom>=16]' : {
        'marker-allow-overlap' : true,
        'marker-file' : 'url(../svg/awsome/dot-circle-o.svg)',
        '[type="Velhop"]' : {
            'marker-file' : 'url(svg/velhop.svg)',
        },
        '[type="Parking"]' : {
            'marker-file' : 'url(svg/parking.svg)',
        }
    }
});

module.exports = {
    '#objects' : style,
}
