async function fetchWeather() {
    const city = document.getElementById('searchBar').value;
    const geocodeResponse = await fetch(`https://geocode.xyz/${city}?json=1`);
    const geocodeData = await geocodeResponse.json();

    const latitude = geocodeData.latt;
    const longitude = geocodeData.longt;

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`);
    const data = await response.json();
    
    displayWeather(data, city);
}

function displayWeather(data, city) {
    document.getElementById('cityName').textContent = city;

    const days = data.daily.time;
    const tempsMax = data.daily.temperature_2m_max;
    const tempsMin = data.daily.temperature_2m_min;

    document.getElementById('currentWeather').innerHTML = `
        <p>Max Temperature: ${tempsMax[0]} °C</p>
        <p>Min Temperature: ${tempsMin[0]} °C</p>
    `;
    
    const ctx = document.getElementById('weatherChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [
                {
                    label: 'Max Temperature (°C)',
                    data: tempsMax,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: 'Min Temperature (°C)',
                    data: tempsMin,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
