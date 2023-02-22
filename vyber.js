mapboxgl.accessToken = 'pk.eyJ1IjoibGlib3NsYXZhIiwiYSI6ImNreWEzOG56MjAxbWIyb3A4Y3B6cDYzb2QifQ.z6aVlnDauVUZTt09bF8yfw';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/liboslava/ckyhe3c4x32ws14rx5lq9yzp3',
center: [14.0247003, 50.6659011], // longitude, latitude 50.6659011N, 14.0247003E
zoom: 15,
});

map.on('load', function () {
	map.resize();
	map.doubleClickZoom.disable();
	map.keyboard.disableRotation();
	map.touchZoomRotate.disableRotation();
	map.dragRotate.disable();
});

map.getCanvas().style.cursor = 'url(sources/cursor.svg) 10 32, auto';

const marker = new mapboxgl.Marker({color: "#c7eb3b", scale: "1.4"});

function add_marker (event) {
  var coordinates = event.lngLat;
  marker.setLngLat(coordinates).addTo(map);
}
map.on('click', add_marker);

function center_map (event) {
  var coordinates = event.lngLat;
  map.flyTo({center: coordinates, essential: true});
}
map.on('click', center_map);

function vyber(){
	if(typeof(marker) === 'undefined' || typeof(marker._lngLat) === 'undefined'){
		alert("Nevybrali jste počáteční bod trasy.");
	}
	else{
		const lng = marker._lngLat["lng"];
		const lat = marker._lngLat["lat"];
		window.location.href = "volby.html?" + "lng=" + lng + "&lat=" + lat;
	}
}

//geolokace
class ToggleControl extends mapboxgl.GeolocateControl {
            _onSuccess(position) {
                this.map.flyTo({
                    center: [position.coords.longitude, position.coords.latitude],
                    zoom: 15,
                    bearing: 0,
                    pitch: 0
                });
                marker.setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map);
            }

            onAdd(map, cs) {
                this.map = map;
                const button = document.getElementById('najdime');
                const parent = button.parentElement;
                button.onclick = () => {this.trigger();};

                const temp_div = document.createElement("div")
                this._setup = true;
                return temp_div;
            }
        };

const toggleControl = new ToggleControl({
  positionOptions: {
    enableHighAccuracy: true
  },
});

map.addControl(toggleControl, "bottom-left");
