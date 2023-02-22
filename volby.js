mapboxgl.accessToken = 'pk.eyJ1IjoibGlib3NsYXZhIiwiYSI6ImNreWEzOG56MjAxbWIyb3A4Y3B6cDYzb2QifQ.z6aVlnDauVUZTt09bF8yfw';

params = new URLSearchParams(location.search);
lng = params.get('lng');
lat = params.get('lat');

const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/liboslava/ckyhe3c4x32ws14rx5lq9yzp3',
center: [lng, lat], // longitude, latitude 50.6659011N, 14.0247003E
zoom: 15
});

map.on('load', function () {
	map.resize();
	map.doubleClickZoom.disable();
	map.keyboard.disableRotation();
	map.touchZoomRotate.disableRotation();
	map.dragRotate.disable();
});

function submit(){
	const dist = parseInt(document.getElementById("distanceSlider").value) + 1;
	const ret = 1 - document.getElementById("returnSwitch").checked;
	const seed = Math.floor(Math.random() * 1181 * 1187);
	window.location.href = "trasa.html?" + "lng=" + lng + "&lat=" + lat + "&dist=" + dist + "&ret=" + ret + "&seed=" + seed;
};
