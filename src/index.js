let map = L.map("map").setView([65.05, 28.1], 50)
const minmiglist = {}
const posmiglist = {}

const fetchBorderData = async () => {
  const url =
    "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326"
  const res = await fetch(url)
  const data_borders = await res.json()
  initMap(data_borders)
}

const fetchMinMigData = async () => {
  const url =
    "https://statfin.stat.fi/PxWeb/sq/4bb2c735-1dc3-4c5e-bde7-2165df85e65f"
  const res = await fetch(url)
  const data_minmig = await res.json()
  const migvalues = data_minmig.dataset.value

  const citycodes = data_minmig.dataset.dimension.Tuloalue.category
  for (var i = 0; i < migvalues.length; i++) {
    var citycode = Object.keys(citycodes.label)[i]
    minmiglist[citycode.slice(2)] = migvalues[i]
  }
}

const fetchPosMigData = async () => {
  const url =
    "https://statfin.stat.fi/PxWeb/sq/944493ca-ea4d-4fd9-a75c-4975192f7b6e"
  const res = await fetch(url)
  const data_posmig = await res.json()
  const values = data_posmig.dataset.value

  const citycodes = data_posmig.dataset.dimension.Lähtöalue.category
  for (var i = 0; i < values.length; i++) {
    const citycode = Object.keys(citycodes.label)[i]
    posmiglist[citycode.slice(2)] = values[i]
  }
}

const initMap = (data) => {
  let geoJson = L.geoJSON(data, {
    onEachFeature: getFeature,
    style: styling
  }).addTo(map)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map)
  map.options.minZoom = -30
  map.options.maxZoom = 300
  map.fitBounds(geoJson.getBounds())
}

const getFeature = (feature, layer) => {
  if (!feature.properties.nimi) return
  const name = feature.properties.kunta
  const kuntanimi features.properties.[joku];
  const posmig = posmiglist[name]
  const minmig = minmiglist[name]
  layer.bindPopup(
    `<ul>
          <li>Name: ${name}</li>
          <li>Positive migration: ${posmig}</li>
          <li>Negative migration: ${minmig}<li>
      </ul>`
  )
  layer.bindTooltip(name)
}
var styling = {
  weight: 2
}

fetchMinMigData()
fetchPosMigData()
fetchBorderData()
