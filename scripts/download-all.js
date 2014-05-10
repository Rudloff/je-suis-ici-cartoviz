var _ = require('underscore');
var MosaicDistil = require('mosaic-distil');
var Utils = require('mosaic-distil/transform-utils');
var Q = require('q');
var Geocoder = require('geocoder');
var dataFolder = '../data';

var listener = new MosaicDistil.WriteListener({
    dataFolder : dataFolder
});
listener = new MosaicDistil.LogListener({
    listener : listener,
});

var dataSets = [];

dataSets.push(SpectacleConfig())
dataSets.push(VelhopConfig())
dataSets.push(ParkingConfig())

var dataProvider = new MosaicDistil.CsvDataProvider({
    dataSets : dataSets,
    dataFolder : dataFolder,
    forceDownload : true
})
return dataProvider.handleAll(listener).fail(function(err) {
    console.log(' * >>> ', err.stack);
}).done();

// Common properties:
// - type
// - label
// - url
// - tel
// - fax


function SpectacleConfig() {
    return Utils
            .newDataSet({
                "path" : "strasbourg-spectacles.csv",
                "url" : "http://media.strasbourg.eu/alfresco/d/d/workspace/SpacesStore/dad0d62e-83d8-4d1e-b212-23ddafac97b1/20120123-StrasPlus-Acces_salles_spectacle.csv",
                transform : function(obj) {
                    return {
                        type : 'Feature',
                        properties : _.extend({
                            type : 'Spectacle'
                        }, this._toProperties(obj, {
                            exclude : [ 'Coordonnees_WGS84', 'URL_NFC' ],
                            convert : {
                                'Intitule_Point_Acces' : 'label',
                                'URL_QRCode': 'url'
                            },
                            dataTypes : {}
                        })),
                        geometry : this._toGeometryPoint(obj.Coordonnees_WGS84)
                    }
                }
            });
}

function VelhopConfig() {
    return Utils
            .newDataSet({
                "path" : "localisation-stations-velos-libre-service-velhop.csv",
                "url" : "https://raw.githubusercontent.com/Rudloff/open-data-strasbourg/master/localisation-stations-velos-libre-service-velhop.csv",
                transform : function(obj) {
                    return {
                        type : 'Feature',
                        properties : _.extend({
                            type : 'Velhop'
                        }, this._toProperties(obj, {
                            exclude : [ 'go/x', 'go/y', 'id', 'ic' ],
                            convert : {
                                'ln' : 'label',
                                'ty': 'mode',
                                'ad': 'info'
                            },
                            dataTypes : {}
                        })),
                        geometry : this._toGeometryPointFromCoords(obj, 'go/y',
                                'go/x')
                    }
                }
            });
}

function ParkingConfig() {
    return Utils
            .newDataSet({
                "path" : "localisation-parkings-publics.csv",
                "url" : "https://raw.githubusercontent.com/Rudloff/open-data-strasbourg/master/localisation-parkings-publics.csv",
                transform : function(obj) {
                    return {
                        type : 'Feature',
                        properties : _.extend({
                            type : 'Parking'
                        }, this._toProperties(obj, {
                            exclude : [ 'go/x', 'go/y', 'price_en', 'price_fr', 'price_de', 'id', 'ic', 'ln', 'ln2' ],
                            convert : {
                                'pr' : 'label'
                            },
                            dataTypes : {}
                        })),
                        geometry : this._toGeometryPointFromCoords(obj, 'go/y',
                                'go/x')
                    }
                }
            });
}
