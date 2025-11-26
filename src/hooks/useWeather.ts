import { useState } from "react";
import { fetchWeather, type WeatherResponse } from "../services/weatherApi";
const weatherBackgrounds: Record<string, string> = {
  // CLEAR / SUNNY
  "clear": "https://images.pexels.com/photos/96622/pexels-photo-96622.jpeg",
  "sunny": "https://images.pexels.com/photos/2043035/pexels-photo-2043035.jpeg",

  // PARTLY CLOUDY
  "partly cloudy": "https://images.pexels.com/photos/19154647/pexels-photo-19154647/free-photo-of-sunlight-shining-through-clouds.jpeg",

  // CLOUDY / OVERCAST
  "cloudy": "https://images.pexels.com/photos/414659/pexels-photo-414659.jpeg",
  "overcast": "https://images.pexels.com/photos/1384901/pexels-photo-1384901.jpeg",

  // LIGHT RAIN
  "light rain": "https://images.pexels.com/photos/1425299/pexels-photo-1425299.jpeg",
  "rain shower": "https://images.pexels.com/photos/804474/pexels-photo-804474.jpeg",

  // HEAVY RAIN
  "heavy rain": "https://images.pexels.com/photos/29957497/pexels-photo-29957497/free-photo-of-dramatic-ocean-storm-at-sunset.jpeg",

  // THUNDERSTORM
  "thunderstorm": "https://images.pexels.com/photos/2418664/pexels-photo-2418664.jpeg",

  // SNOW
  "snow": "https://images.pexels.com/photos/5088378/pexels-photo-5088378.jpeg",
  "light snow": "https://images.pexels.com/photos/13693479/pexels-photo-13693479.jpeg",

  // HEAVY SNOW
  "heavy snow": "https://images.pexels.com/photos/19408333/pexels-photo-19408333/free-photo-of-snowy-mercedes-in-the-drizzling-snow-christmas-phone-pc.jpeg",

  // FOG / MIST / HAZE
  "fog": "https://images.pexels.com/photos/4275884/pexels-photo-4275884.jpeg",
  "mist": "https://images.pexels.com/photos/33018533/pexels-photo-33018533/free-photo-of-misty-autumn-pathway-lined-with-birch-trees.jpeg",
  "haze": "https://images.pexels.com/photos/10488524/pexels-photo-10488524.jpeg",

  // WINDY
  "windy": "https://images.pexels.com/photos/34860980/pexels-photo-34860980/free-photo-of-colorful-kite-flying-in-clear-blue-sky.jpeg",

  // SLEET / FREEZING RAIN
  "sleet": "https://images.pexels.com/photos/31995373/pexels-photo-31995373/free-photo-of-cozy-winter-bedroom-with-snowy-view.jpeg",
  "freezing rain": "https://images.pexels.com/photos/34851748/pexels-photo-34851748/free-photo-of-dramatic-night-waves-crashing-in-mudanya.jpeg",
};
export function useWeather() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getBackground = (condition: string) => {
    const key = condition.toLowerCase().trim();
    return weatherBackgrounds[key] ?? weatherBackgrounds["clear"];
  };
  const getWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(city);
      // Add background for current weather
      const currentWithBg = {
        ...data.current,
        background: getBackground(data.current.condition.text),
      };

      // Add background for forecast days
      const forecastWithBg = data.forecast.forecastday.map((day) => ({
        ...day,
        day: {
          ...day.day,
          background: getBackground(day.day.condition.text),
        },
      }));

      setWeather({
        ...data,
        current: currentWithBg,
        forecast: {
          ...data.forecast,
          forecastday: forecastWithBg,
        },
      });
    } catch (err: any) {
      setError(err.message || "Error fetching weather");
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, getWeather };
}
