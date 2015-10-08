var DEFAULT_STYLES={weight:2,color:"#FFA500",opacity:.8,fillColor:"#B0DE5C",fillOpacity:.8,dashArray:"4"},INNER_STYLES={weight:2.5,color:"#FFA500",opacity:.8,fillColor:"#blue",fillOpacity:.8},ORIGINAL_ROAD_STYLES={weight:2.5,color:"#2F4F4F",opacity:.7,fillColor:"#B0DE5C",fillOpacity:.7},NEW_ROAD_STYLES={weight:2.5,color:"#2F4F4F",opacity:.8,fillColor:"#B0DE5C",fillOpacity:.8};L.TopoJSON=L.GeoJSON.extend({addData:function(t){"use strict";if("Topology"===t.type)for(key in t.objects)geojson=topojson.feature(t,t.objects[key]),L.GeoJSON.prototype.addData.call(this,geojson);else L.GeoJSON.prototype.addData.call(this,t)}});var map=L.map("map",{zoomControl:!1}),tiles=L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",{attribution:'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',maxZoom:18,id:"joeahand.jc5epc4l",accessToken:"pk.eyJ1Ijoiam9lYWhhbmQiLCJhIjoiaDd1MEJZQSJ9.fl3WTCt8MGNOSCGR_qqz7A"}),topoLayer=new L.TopoJSON(null,{style:function(t){"use strict";return"true"===t.properties.road?NEW_ROAD_STYLES:"true"===t.properties.original_road?ORIGINAL_ROAD_STYLES:"true"===t.properties.interior?INNER_STYLES:DEFAULT_STYLES}}),loadTopoLayer=function(t,e,a){"use strict";$.getJSON(e).done(function(e){a===!0?(topoLayer.clearLayers(),t.addData(e)):(t.addData(e),t.addTo(map),map.fitBounds(t.getBounds()))})},setStats=function(t){"use strict";$("#stat-paths").text(t.pathArea),$("#stat-parcels").text(t.parcelArea),$("#stat-area").text(t.pathPercent),$("#stat-isolated").text(t.isolatedParcels)},autoSlide=function(){"use strict";var t=$(".step-slider").slider("value");t===projectData.totalSteps-1?(console.log("done sliding"),clearInterval(autoSlide)):$(".step-slider").slider("value",t+1)},autoSlideInt=setInterval(autoSlide,projectData.intTime),initSlider=function(t){"use strict";$(".step-slider").slider({max:t,change:function(t,e){t.originalEvent&&clearInterval(autoSlideInt);var a=e.value,o=projectData.steps[a];"undefined"!=typeof x&&setStats(o);var r=projectData.filePath+a+".topo.json";loadTopoLayer(topoLayer,r,!0)}})},filePath=projectData.filePath+"0.topo.json";tiles.addTo(map),loadTopoLayer(topoLayer,filePath,!1),initSlider(projectData.totalSteps-1),setStats(projectData.steps[0]);