import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";

export function renderMap() {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoiam9yai1rYXJlIiwiYSI6ImNrcXNiOG10bDFvMGwydXN0cHh1ZHRzdGMifQ.bu0r3TdOtm7oMEYfK1JzhQ";
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/jorj-kare/ckwcmd6j52li015qo50pcvr9u",
    zoom: 1,
    center: [0, 0],
    renderWorldCopies: false,
  });
  return map;
}

export function renderPolygons(map, polygons) {
  polygons.forEach((country) => {
    if (Object.keys(map.getStyle().sources).includes(country.properties.ISO_A3))
      return;

    map.addSource(country.properties.ISO_A3, {
      type: "geojson",
      data: country,
    });
    map.addLayer({
      id: country.properties.ISO_A3,
      type: "fill",
      source: country.properties.ISO_A3,
      paint: {
        "fill-color": "rgb(250, 250 ,250)",
        "fill-outline-color": "rgb(3, 55, 95)",
      },
    });
  });
}
