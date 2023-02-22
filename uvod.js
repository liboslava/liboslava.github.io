mapboxgl.accessToken = 'pk.eyJ1IjoibGlib3NsYXZhIiwiYSI6ImNreWEzOG56MjAxbWIyb3A4Y3B6cDYzb2QifQ.z6aVlnDauVUZTt09bF8yfw';

params = new URLSearchParams(location.search);
lng = parseFloat(params.get('lng'));
lat = parseFloat(params.get('lat'));
dist = parseFloat(params.get('dist'));
ret = parseInt(params.get('ret'));
const seed = parseInt(params.get('seed'));

const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/liboslava/ckyhe3c4x32ws14rx5lq9yzp3',
center: [14.0247003, 50.6659011], // longitude, latitude 50.6659011N, 14.0247003E
zoom: 15
});

map.on('load', function () {
    map.resize();
    map.doubleClickZoom.disable();
    map.keyboard.disableRotation();
    map.touchZoomRotate.disableRotation();
    map.dragRotate.disable();
});

function zpet(){
    window.location.href = "trasa.html?" + "lng=" + lng + "&lat=" + lat + "&dist=" + dist + "&ret=" + ret + "&seed=" + seed;
};
