
var DEFAULT_STYLES = {
                weight: 2,
                color: '#FFA500',
                opacity: 0.8,
                fillColor: '#B0DE5C',
                fillOpacity: 0.8,
                dashArray: '4'
            };

var INNER_STYLES = {
                weight: 2.5,
                color: '#FFA500',
                opacity: 0.8,
                fillColor: '#blue',
                fillOpacity: 0.8
             };

var ROAD_STYLES = {
                weight: 2.5,
                color: '#2F4F4F',
                opacity: 0.8,
                fillColor: '#B0DE5C',
                fillOpacity: 0.8
            };

var map = L.map('map', { zoomControl: false });

var tiles = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'joeahand.jc5epc4l',
    accessToken: 'pk.eyJ1Ijoiam9lYWhhbmQiLCJhIjoiaDd1MEJZQSJ9.fl3WTCt8MGNOSCGR_qqz7A'
});
tiles.addTo(map);

var geojsonLayer = new L.GeoJSON.AJAX('data/data.json', {
    style: function(feature) {
        'use strict';
        switch (feature.properties.segment_type) {
            case 'road': return ROAD_STYLES;
            case 'inner': return INNER_STYLES;
            default: return DEFAULT_STYLES;
        }
    }
});

geojsonLayer.addTo(map);
geojsonLayer.on('data:loaded', function() {
  'use strict';
  map.fitBounds(geojsonLayer.getBounds());
});

