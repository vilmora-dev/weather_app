# Weather App

A weather application providing **real-time** and **forecasted weather information**, including **current conditions**, **hourly forecasts**, **3-day forecasts**, and **radar maps**.

The app uses a **React + TypeScript frontend** with **Vite**, styled with CSS-in-JS, and a **Python (FastAPI) backend** that securely proxies OpenWeatherMap tile requests to hide and protect the API key.

---

## Features

- **Current Weather**: Temperature, humidity, UV index, air quality, and precipitation.
- **Hourly Forecasts**: Displays hourly temperature, precipitation, humidity, and UV index for today.
- **3-Day Forecast**: Shows min/max temperatures, weather conditions, min/max UV index and precipitation chances.
- **Radar Maps**: Interactive map layers including precipitation, wind, temperature, and cloud coverage.
- **Responsive Design**: Works on desktop and mobile devices.

---

## Tech Stack

- **Frontend:**
  - React
  - TypeScript
  - Vite
  - CSS-in-JS
  - Leaflet (interactive maps)
  - Chart.js (graphs for hourly forecasts)
  - OpenWeatherMap API (weather data & tiles)
  
- **Backend:**
  - Python
  - FastAPI (REST API)
  - httpx (proxy tile requests)
  - dotenv (environment variables)

---

## Installation

Want to try it out?

1. **Clone the repository**

```bash
git clone https://github.com/<username>/<repo>.git
cd <repo>
```

The backend is optional — you can simply drop your OpenWeatherMap API key into the frontend and run the app. I added the Python FastAPI backend mostly for fun.
