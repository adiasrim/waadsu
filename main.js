import geo from "./assets/russia.geo.json";

// setup map.
const map = L.map('map').setView([ 55.7558, 37.6173 ], 5);

// add layers to map.
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

// initialize geoJson.
const geoJson = L.geoJSON(geo).addTo(map);

// iterate between layers.
geoJson.eachLayer(layer => {
    layer.getLatLngs().forEach(coordinates => {
        // Calculate polygon length.
        let distance = (L.GeometryUtil.length(coordinates[0]) / 1000).toFixed(2);

        // get first coordinate langtiude and longitude for drawing marker
        const { lat, lng } = coordinates[0][0];

        // add marker to map, showing the length of the polygon.
        const marker = new L.marker([lat, lng], { opacity: 0.01 });
        marker.bindTooltip(distance + " km", {permanent: true, offset: [0, 0] });
        marker.addTo(map);
    });
});
