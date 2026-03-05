const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const card = document.querySelector('.card');
const cityName = document.querySelector('.cityName');
const temp = document.querySelector('.temp');
const condition = document.querySelector('.condition');
const icon = document.querySelector('.weather-icon');




form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const city = cityInput.value.trim();
    if (!city) return;

    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '7de92d465bmshffad67403e28764p1fe7e0jsn721a2d4c3c12',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    fetch(url, options)
        .then(res => {
            if (!res.ok) throw new Error('Город не найден');
            return res.json();
        })
        .then(data => {
            cityName.textContent = data.location.name;
            temp.textContent = Math.round(data.current.temp_c) + '°C';
            condition.textContent = data.current.condition.text;
            icon.src = 'https:' + data.current.condition.icon;  // добавляем https:
            icon.alt = data.current.condition.text;

            // Показываем карточку с анимацией
            card.classList.remove('hidden');
            setTimeout(() => card.classList.add('visible'), 50);
        })
        .catch(err => {
            alert('Ошибка: ' + err.message);
        });
});

// Регистрация Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('Service Worker зарегистрирован:', registration);
      })
      .catch(error => {
        console.log('Ошибка регистрации SW:', error);
      });
  });
}