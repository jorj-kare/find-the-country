export async function getContinentPolygons(continentName) {
  try {
    // const url = `http://localhost:3000/api/v1/continent/${continentName}`;
    const url = `https://find-the-country-api.onrender.com/api/v1/continent/${continentName}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message, data.status);
    return data;
  } catch (err) {
    throw err;
  }
}
