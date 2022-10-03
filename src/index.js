const fetchData = async () => {
    const url =
      "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";
    const res = await fetch(url);
    const data = await res.json();
    initMap(data);
    console.log(data);
  };
  
  const initMap = (data) => {
    let map = L.map("map").setView([65.05, 28.1], 5);
    let geoJson = L.geoJson(data, {
      onEachFeature: getFeature,
      style: styling
    }).addTo(map);
  
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      minZoom: 10
    }).addTo(map);
    map.fitBounds(geoJson.getBounds());
  };
  
  var styling = {
    minZoom: -3,
    weight: 2
  };
  
  const getFeature = (feature, layer) => {
    if (!feature.properties.nimi) return;
    const name = feature.properties.nimi;
    const year = feature.properties.vuosi;
    layer.bindPopup(
      `<ul>
            <li>Name: ${name}</li>
            <li>Year: ${year}</li>
        </ul>`
    );
  };
  
  fetchData();
  
