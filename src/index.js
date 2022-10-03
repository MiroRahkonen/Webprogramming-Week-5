let map = L.map("map").setView([65.05, 28.1], 50);

const fetchBorderData = async () => {
  const url =
    "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";
  const res = await fetch(url);
  const data_borders = await res.json();
  initMap(data_borders);
  console.log(data_borders);
};

const fetchMinMigData = async () => {
  const url =
    "https://statfin.stat.fi/PxWeb/sq/4bb2c735-1dc3-4c5e-bde7-2165df85e65f";
  const res = await fetch(url);
  const data_minmig = await res.json();
  console.log(data_minmig);
  addMinMig(data_minmig);
};

const fetchPosMigData = async () => {
  const url =
    "https://statfin.stat.fi/PxWeb/sq/944493ca-ea4d-4fd9-a75c-4975192f7b6e";
  const res = await fetch(url);
  const data_posmig = await res.json();
  console.log(data_posmig);
  addPosMig(data_posmig);
};

const initMap = (data) => {
  let geoJson = L.geoJSON(data, {
    onEachFeature: getFeature,
    style: styling
  }).addTo(map);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);
  map.options.minZoom = -30;
  map.options.maxZoom = 300;
  map.fitBounds(geoJson.getBounds());
};

const getFeature = (feature, layer) => {
  if (!feature.properties.nimi) return;
  const name = feature.properties.nimi;
  layer.bindPopup(
    `<ul>
          <li>Name: ${name}</li>
      </ul>`
  );
  layer.bindTooltip(name);
};

const addMinMig = (data) => {
  let geoJson = L.geoJSON(data, {
    onEachFeature: getMinMig
  });
};

const getMinMig = (feature, layer) => {
  if (!feature.properties.nimi) return;
  const name = feature.properties.nimi;
  layer.bindPopup(
    `<ul>
          <li>Name: ${name}</li>
      </ul>`
  );
  layer.bindTooltip(name);
};

const addPosMig = (data) => {};

var styling = {
  weight: 2
};

fetchBorderData();
fetchMinMigData();
fetchPosMigData();
