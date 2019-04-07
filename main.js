window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.getElementById(
    "temperature-description"
  );
  let temperatureDegree = document.getElementById("temperature-degree");
  const loactionTimezone = document.getElementById("location-timezone");
  const temperatureSection = document.getElementById("temperature-section");
  const temperatureSpan = document.getElementById("temperature-span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/8bdc7e84c40f78808376a6da8c5757d3/${lat},${long}`;
      fetch(api)
        .then(response => response.json())
        .then(data => {
          const { temperature, summary, icon } = data.currently;
          temperatureDescription.textContent = summary;
          loactionTimezone.textContent = `Timezone: ${data.timezone}`;
          temperatureDegree.textContent = Math.round(
            ((+temperature - 32) * 5) / 9
          );
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "°C") {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            } else {
              temperatureSpan.textContent = "°C";
              temperatureDegree.textContent = Math.round(
                ((+temperature - 32) * 5) / 9
              );
            }
          });
        });
    });
  }
});
