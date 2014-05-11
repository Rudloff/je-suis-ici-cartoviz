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

dataSets.push(SpectacleConfig());
dataSets.push(VelhopConfig());
dataSets.push(ParkingConfig());
dataSets.push(UnistraConfig());
dataSets.push(ArchiConfig());
dataSets.push(CitizConfig());
dataSets.push(TourismeConfig());
dataSets.push(BiblioConfig());
dataSets.push(CTSConfig());

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
                "path" : "localisation-salles-spectacles.csv",
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

function UnistraConfig() {
    return Utils
            .newDataSet({
                "path" : "unistra.csv",
                "url" : "https://raw.githubusercontent.com/Rudloff/open-data-strasbourg/master/unistra.csv",
                transform : function(obj) {
                    return {
                        type : 'Feature',
                        properties : _.extend({
                            type : 'Unistra'
                        }, this._toProperties(obj, {
                            exclude : [ 'id', 'related_to_poi', 'tags', 'time_created', 'time_modified' ],
                            convert : {
                                'name' : 'label',
                                'type': 'category'
                            },
                            dataTypes : {}
                        })),
                        geometry : this._toGeometryPointFromCoords(obj, 'latitude',
                                'longitude')
                    }
                }
            });
}

function ArchiConfig() {
    return Utils
            .newDataSet({
                "path" : "archi-strasbourg.csv",
                "url" : "https://raw.githubusercontent.com/Rudloff/open-data-strasbourg/master/archi-strasbourg.csv",
                transform : function(obj) {
                    return {
                        type : 'Feature',
                        properties : _.extend({
                            type : 'ArchiStrasbourg'
                        }, this._toProperties(obj, {
                            exclude : [ 'latitude', 'longitude' ],
                            convert : {
                                'nom' : 'label'
                            },
                            dataTypes : {}
                        })),
                        geometry : this._toGeometryPointFromCoords(obj, 'latitude',
                                'longitude')
                    }
                }
            });
}

function CitizConfig() {
    return Utils
            .newDataSet({
                "path" : "localisation-stations-voiture-libre-service-autotrement.csv",
                "url" : "https://raw.githubusercontent.com/Rudloff/open-data-strasbourg/master/localisation-stations-voiture-libre-service-autotrement.csv",
                transform : function(obj) {
                    return {
                        type : 'Feature',
                        properties : _.extend({
                            type : 'Citiz'
                        }, this._toProperties(obj, {
                            exclude : [ 'go/x', 'go/y', 'id', 'ic' ],
                            convert : {
                                'ln' : 'label'
                            },
                            dataTypes : {}
                        })),
                        geometry : this._toGeometryPointFromCoords(obj, 'go/y',
                                'go/x')
                    }
                }
            });
}

function TourismeConfig() {
    return Utils
            .newDataSet({
                "path" : "localisation-offices-tourisme-cus.csv",
                "url" : "http://media.strasbourg.eu/alfresco/d/a/workspace/SpacesStore/5ee63fcf-e1a9-470e-b530-2488cd972206/CUS_CUS_DCOM_OFTOU.csv",
                transform : function(obj) {
                    return {
                        type : 'Feature',
                        properties : _.extend({
                            type : 'Tourisme'
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

function BiblioConfig() {
    return Utils
            .newDataSet({
                "path" : "localisation-mediatheques-bibliotheques-cus.csv",
                "url" : "http://media.strasbourg.eu/alfresco/d/a/workspace/SpacesStore/b756d34e-d394-4a93-b3be-f7d636909b44/CUS_CUS_DCOM_BIBLI.csv",
                transform : function(obj) {
                    return {
                        type : 'Feature',
                        properties : _.extend({
                            type : 'Bibliotheque'
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

function CTSConfig() {
    return Utils
            .newDataSet({
                "path" : "cts-stops.csv",
                "url" : "https://raw.githubusercontent.com/Rudloff/open-data-strasbourg/master/cts-stops.csv",
                transform : function(obj) {
                    return {
                        type : 'Feature',
                        properties : _.extend({
                            type : 'CTS'
                        }, this._toProperties(obj, {
                            exclude : [ 'stop_id', 'stop_lat', 'stop_lon' ],
                            convert : {
                                'stop_name' : 'label',
                                'stop_url': 'url'
                            },
                            dataTypes : {}
                        })),
                        geometry : this._toGeometryPointFromCoords(obj, 'stop_lat',
                                'stop_lon')
                    }
                }
            });
}
