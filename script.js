const API_KEY = 'TECE7LXPRDZUARYJUS5PARWAC'; // Reemplaza con tu clave de Visual Crossing

async function fetchWeather(location) {
    try {
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${API_KEY}`
        );
        if (!response.ok) {
            throw new Error('No se pudo obtener los datos del clima');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al obtener los datos del clima:', error);
        return null;
    }
}
function displayWeather(data) {
    const weatherDetails = document.getElementById('weatherDetails');
    weatherDetails.innerHTML = ''; // Limpiar contenido anterior

    if (!data) {
        weatherDetails.innerHTML = '<p>No se encontraron datos para esta ubicación.</p>';
        return;
    }

    const currentWeather = data.currentConditions;
    const { temp, windspeed, precip, conditions } = currentWeather;

    const weatherHTML = `
        <h2>Clima actual en ${data.resolvedAddress}</h2>
        <p><strong>Temperatura:</strong> ${temp}°C</p>
        <p><strong>Velocidad del viento:</strong> ${windspeed} km/h</p>
        <p><strong>Probabilidad de lluvia:</strong> ${precip}%</p>
        <p><strong>Condiciones:</strong> ${conditions}</p>
    `;
    weatherDetails.innerHTML = weatherHTML;
}
document.getElementById('refreshButton').addEventListener('click', () => {
    const location = document.getElementById('locationInput').value.trim();
    if (location) {
        fetchWeather(location).then(data => displayWeather(data));
    } else {
        alert('Por favor, selecciona una ubicación antes de actualizar.');
    }
});
function displayWeather(data) {
    const weatherDetails = document.getElementById('weatherDetails');
    weatherDetails.innerHTML = ''; // Limpiar contenido anterior

    if (!data) {
        weatherDetails.innerHTML = '<p>No se encontraron datos para esta ubicación.</p>';
        return;
    }

    const currentWeather = data.currentConditions;
    const { temp, windspeed, precip, conditions } = currentWeather;

    const weatherHTML = `
        <h2>Clima actual en ${data.resolvedAddress}</h2>
        <p><strong>Temperatura:</strong> ${temp}°C</p>
        <p><strong>Velocidad del viento:</strong> ${windspeed} km/h</p>
        <p><strong>Probabilidad de lluvia:</strong> ${precip}%</p>
        <p><strong>Condiciones:</strong> ${conditions}</p>
        <h3>Próximas 24 horas:</h3>
        <ul>
            ${data.days[0].hours.slice(1, 25).map(hour => `
                <li>Hora: ${hour.datetime}, Temperatura: ${hour.temp}°C, Condiciones: ${hour.conditions}</li>
            `).join('')}
        </ul>
        <h3>Anteriores 24 horas:</h3>
        <ul>
            ${data.days[0].hours.slice(-24).map(hour => `
                <li>Hora: ${hour.datetime}, Temperatura: ${hour.temp}°C, Condiciones: ${hour.conditions}</li>
            `).join('')}
        </ul>
    `;
    weatherDetails.innerHTML = weatherHTML;
}