document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ Script loaded and DOM ready");

    // ----------------------
    // Mobile menu toggle
    // ----------------------
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // ----------------------
    // Dark mode toggle
    // ----------------------
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');

        // Change icon/text
        themeToggle.innerHTML = body.classList.contains('dark-theme')
            ? '<i class="fas fa-sun"></i> Light Mode'
            : '<i class="fas fa-moon"></i> Dark Mode';

        // Save preference
        localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    }

    // ----------------------
    // Weather API
    // ----------------------
    const API_KEY = "83f856e219ac0fc3ab1946b31c511002"; // your key
    const input = document.getElementById('cityInput');
    const button = document.getElementById('getWeatherBtn');
    const output = document.getElementById('weatherResult');

    console.log("🔍 Elements found:", { input, button, output });

    if (!input || !button || !output) {
        console.error("❌ Missing one or more required elements (check HTML IDs)");
        return;
    }

    button.addEventListener('click', () => {
        const city = input.value.trim();
        console.log("📥 City entered:", city);

        if (!city) {
            output.innerHTML = "<p>Please enter a city</p>";
            return;
        }

        // Use a free CORS proxy so it works on GitHub Pages
        const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)}`;
        console.log("🌍 Fetching URL:", url);

        output.innerHTML = "<p>Loading…</p>";

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log("📦 Parsed data:", data);

                const cod = String(data.cod);
                if (cod !== "200") {
                    console.warn("⚠️ API error:", data.message);
                    output.innerHTML = `<p style="color:red;">${data.message}</p>`;
                    return;
                }

                const cityName = data.name;
                const temp = data.main.temp;
                const description = data.weather[0].description;

                output.innerHTML = `
                    <h2>${cityName}</h2>
                    <p>Temperature: ${Math.round(temp)} °C</p>
                    <p>Condition: ${description}</p>
                `;
            })
            .catch(err => {
                console.error("💥 Fetch failed:", err);
                output.innerHTML = "<p style='color:red;'>Network or script error</p>";
            });
    });
});
