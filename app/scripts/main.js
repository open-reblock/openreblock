
var map = L.map('map', { zoomControl: false });

var tiles = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'joeahand.jc5epc4l',
    accessToken: 'pk.eyJ1Ijoiam9lYWhhbmQiLCJhIjoiaDd1MEJZQSJ9.fl3WTCt8MGNOSCGR_qqz7A'
});

var topoLayer = new L.TopoJSON(null, {
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

var loadTopoLayer = function(layer, file, replace) {
    'use strict';
    $.getJSON(file)
      .done(
        function(topoData) {
            if (replace === true) {
                topoLayer.clearLayers(); // inherited from LayerGroup
                layer.addData(topoData);
            } else {
                layer.addData(topoData);
                layer.addTo(map);
                map.fitBounds(layer.getBounds());
            }
    });
};

var setStats = function(data) {
    'use strict';
    $('#stat-paths').text(data.pathArea);
    $('#stat-parcels').text(data.parcelArea);
    $('#stat-area').text(data.pathPercent);
    $('#stat-isolated').text(data.isolatedParcels);
};

var autoSlide = function () {
  'use strict';
  var curVal = $('.step-slider').slider('value');

  if(curVal === (projectData.totalSteps - 1)) {
    console.log('done sliding');
    //$('.step-slider').slider('value', 0);
    clearInterval( autoSlideInt );
  } else {
    $('.step-slider').slider('value', (curVal + 1));
  }
};

var autoSlideInt = setInterval(autoSlide, projectData.intTime);

var initSlider = function(steps) {
    'use strict';
    $('.step-slider').slider({
        max: steps,
        change: function(event, ui) {
            if (event.originalEvent) {
              clearInterval( autoSlideInt );
            }
            var step = ui.value,
                stepData = projectData.steps[step];
            if (typeof x !== 'undefined') {
                setStats(stepData);
            }
            var newFilePath = projectData.filePath + step + '.topo.json';
            loadTopoLayer(topoLayer, newFilePath, true);
        }
    });
};

var filePath = projectData.filePath + '0.topo.json';

tiles.addTo(map);
loadTopoLayer(topoLayer, filePath, false);

initSlider(projectData.totalSteps - 1);
setStats(projectData.steps[0]);
