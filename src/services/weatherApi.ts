const API_BASE = import.meta.env.VITE_API_BASE as string;

if (!API_BASE) {
  throw new Error("VITE_API_BASE is not defined in your .env file");
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface Current {
  temp_c: number;
  temp_f: number;
  condition: Condition;
  wind_kph: number;
  wind_mph: number;
  humidity: number;
  precip_mm: number;
  uv: number;
  air_quality: any;
  last_updated: string;
  background?: string; 
}

export type HourlyWeather = {
  time: string;
  temp_c: number;
  temp_f: number;
  condition: { text: string; icon: string };
  humidity: number;
  uv: number;
  precip_mm: number;
  chance_of_rain: number;
};

export interface DayForecast {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxtemp_f: number;
    mintemp_f: number;
    avgtemp_f: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    avghumidity: number;
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
    condition: Condition;
    uv: number;
    background?: string; 
  };
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
  };
  hour: HourlyWeather[]; 
}

export interface Forecast {
  forecastday: DayForecast[];
}

export interface Alerts {
  alert?: any[];
}

export interface WeatherResponse {
  location: Location;
  current: Current;
  forecast: Forecast;
  alerts?: Alerts;
  isOffline?: boolean;
}

export async function fetchWeather(city: string, days = 3): Promise<WeatherResponse> {
  try {
    const res = await fetch(`${API_BASE}/weather?city=${city}&days=${days}`);
    if (!res.ok) {
      let errMsg = `HTTP ${res.status}`;
      try {
        const data = await res.json();
        errMsg = data?.detail?.error?.message || data?.detail || JSON.stringify(data);
      } catch (e) {}
      console.warn(`Failed to fetch weather: ${errMsg}`);
      throw new Error(errMsg);
    }
    const data: WeatherResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Weather API fetch failed:", error);

    // Return fallback data so UI can still render
    const fallback: WeatherResponse = {
      isOffline: true,
      location: {
        name: city,
        region: "",
        country: "",
        lat: 0,
        lon: 0,
        tz_id: "",
      },
      current: {
        temp_c: 0,
        temp_f: 0,
        condition: {
          text: "Unavailable", icon: "",
          code: 0
        },
        wind_kph: 0,
        wind_mph: 0,
        humidity: 0,
        precip_mm: 0,
        air_quality: 0,
        uv: 0,
        last_updated: new Date().toISOString(),
      },
      forecast: {
        forecastday: Array(days).fill(null).map((_, i) => ({
          date: new Date(Date.now() + i * 86400000).toISOString().split("T")[0],
          day: {
            maxtemp_c: 0,
            mintemp_c: 0,
            avgtemp_c: 0,
            maxtemp_f: 0,
            mintemp_f: 0,
            avgtemp_f: 0,
            maxwind_kph: 0,
            totalprecip_mm: 0,
            avghumidity: 0,
            daily_chance_of_rain: 0,
            daily_chance_of_snow: 0,
            condition: { text: "Unavailable", icon: "", code: 0 }, // <-- code added
            uv: 0,
          },
          astro: {
            sunrise: "",
            sunset: "",
            moonrise: "",
            moonset: "",
            moon_phase: "",
          },
          hour: Array(24).fill(null).map((_, h) => ({
            time: `${h.toString().padStart(2, "0")}:00`,
            temp_c: 0,
            temp_f: 0,
            condition: { text: "Unavailable", icon: "", code: 0 }, // <-- code added
            humidity: 0,
            uv: 0,
            precip_mm: 0,
            chance_of_rain: 0,
          })),
        })),
      },
      alerts: { alert: [] },
    };

    return fallback;
  }
}
