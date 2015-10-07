
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

var ORIGINAL_ROAD_STYLES = {
                weight: 2.5,
                color: '#2F4F4F',
                opacity: 0.7,
                fillColor: '#B0DE5C',
                fillOpacity: 0.7
            };

var NEW_ROAD_STYLES = {
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

var geojsonLayer = new L.GeoJSON.AJAX('data/epworth/epworth_0.json', {
    style: function(feature) {
        'use strict';
        if (feature.properties.road === 'true') {
            return NEW_ROAD_STYLES;
        } else if (feature.properties.original_road === 'true') {
            return ORIGINAL_ROAD_STYLES;
        } else if (feature.properties.interior === 'true') {
            return INNER_STYLES;
        } else {
            return DEFAULT_STYLES;
        }
    }
});

geojsonLayer.addTo(map);
geojsonLayer.on('data:loaded', function() {
  'use strict';
  map.fitBounds(geojsonLayer.getBounds());
});


var statData = {};
$.getJSON( 'data/epworth/stats.json', function( data ) {
    'use strict';
    var steps = data.total_steps - 1;
    $('.step-slider').slider({
        max: steps
    }).slider('pips', {
        first: 'pip',
        last: 'pip'
    }).slider('float');

    statData = data;
});

$('.step-slider').slider({
    change: function(event, ui) {
        'use strict';
        var step = ui.value,
            path = 'data/epworth/',
            stepData = statData.steps[step];

        $('#stat-paths').text(stepData.path_area);
        $('#stat-parcels').text(stepData.parcel_area);
        $('#stat-area').text(stepData.path_percent);
        $('#stat-isolated').text(stepData.isolated_parcels);
        geojsonLayer.refresh(path + stepData.file);
    }
});
