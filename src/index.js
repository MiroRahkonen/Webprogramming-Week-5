const fetchData = async () => {
  const url =
    "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";
  const res = await fetch(url);
  const data = await res.json();

  initMap(data);
};

const initMap = (data) => {
  let map = L.map("map").setView([65.05, 28.1], 5);
  let geoJson = L.geoJson(data, {
    onEachFeature: getFeature,
    style: styling
  }).addTo(map);

  let osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 10,
    minZoom: -3
  }).addTo(map);
  map.fitBounds(geoJson.getBounds());
};

var styling = {
  weight: 2
};

const getFeature = (feature, layer) => {
  if (!feature.properties.nimi) return;
  const name = feature.properties.nimi;
  console.log(name);
  layer.bindPopup(
    `<ul>
          <li>Name: Test</li>
          <li>Year: 2000</li>
      </ul>`
  );
};

fetchData();
