export async function getSearchCity(city) {
  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/geocoding?city=${city}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": "cAwRbviX7FAYH4FuLHEjiA==SnucCOZpmlKzd7Aa",
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}
