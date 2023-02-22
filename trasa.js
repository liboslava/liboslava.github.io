mapboxgl.accessToken = 'pk.eyJ1IjoibGlib3NsYXZhIiwiYSI6ImNreWEzOG56MjAxbWIyb3A4Y3B6cDYzb2QifQ.z6aVlnDauVUZTt09bF8yfw';

const params = new URLSearchParams(location.search);
const lng = parseFloat(params.get('lng'));
const lat = parseFloat(params.get('lat'));
const dist = parseFloat(params.get('dist'));
const ret = parseInt(params.get('ret'));
const seed = parseInt(params.get('seed'));

const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/liboslava/ckyhe3c4x32ws14rx5lq9yzp3',
center: [lng, lat], // longitude, latitude 50.6659011N, 14.0247003E
zoom: 15
});

/*const scale = new mapboxgl.ScaleControl({
maxWidth: 80,
unit: 'imperial'
});
map.addControl(scale);
scale.setUnit('metric');*/

map.on('load', function () {
	map.resize();

	const velikost_trasy = 0.01 * dist;
	const pocet_ridicich_bodu = 5;
	const rozliseni = 1000;
	const trasa = dej_trasu([lng, lat], ret, seed, pocet_ridicich_bodu, rozliseni, velikost_trasy);

	map.addSource('route', {'type': 'geojson', 'data': {'type': 'Feature', 'geometry': {'type': 'LineString', 'coordinates': trasa}}});
	map.addLayer({'id': 'route', 'type': 'line', 'source': 'route', 'layout': {'line-join': 'round', 'line-cap': 'round'}, 'paint': {'line-color': '#c7eb3b', 'line-width': 10}});

	map.addImage('start_image', {width: 69, height: 68, data: start_image});
	map.addSource('point',{'type':'geojson','data':{'type':'FeatureCollection','features':[{'type':'Feature','geometry':{'type':'Point','coordinates':[lng,lat]}}]}});
	map.addLayer({'id':'points','type':'symbol','source':'point','layout':{'icon-image':'start_image','icon-size':0.3}});

	if(ret == 0){
		map.addImage('cil_image', {width: 59, height: 64, data: cil_image});
		map.addSource('cil_image_source',{'type':'geojson','data':{'type':'FeatureCollection','features':[{'type':'Feature','geometry':{'type':'Point','coordinates':trasa[trasa.length - 1]}}]}});
		map.addLayer({'id':'cil_image_layer','type':'symbol','source':'cil_image_source','layout':{'icon-image':'cil_image','icon-size':0.5}});
	}

	map.doubleClickZoom.disable();
	map.keyboard.disableRotation();
	map.touchZoomRotate.disableRotation();
	map.dragRotate.disable();

	document.getElementById('stahujjson').onclick = function(e) {
		let data = map.getSource('route').serialize().data;
		let convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
		document.getElementById('export_link').setAttribute('href', 'data:' + convertedData);
		document.getElementById('export_link').setAttribute('download','trasa.geojson');
		document.getElementById('export_link').click();
	};

});

function onas(){
	window.location.href = "onas.html?" + "lng=" + lng + "&lat=" + lat + "&dist=" + dist + "&ret=" + ret + "&seed=" + seed;
};
