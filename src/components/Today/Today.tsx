import type { WeatherResponse } from "../../services/weatherApi";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import WeatherStatusCard from "../WeatherStatusCard";
import WeatherCharts from "../WeatherCharts";
import { getTodayStyles } from "./TodayStyles";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// Props for Today component
type TodayProps = {
  weather: WeatherResponse;
  unit: string;
};

// Today Component
export default function Today({ weather, unit }: TodayProps) {
  const styles = getTodayStyles({});

  return (
    <>
      <h2 style={styles.locationTitle}>
        {weather.location.name}, {weather.location.country}
      </h2>
      <div style={styles.container}>
        {/* Current Conditions */}
        <WeatherStatusCard
          title={"Current conditions"}
          weather={weather.current}
          location={weather.location}
          unit={unit}
          isHome={false}
          background={weather.current.background}
        />

        {/* Hourly Graphs */}
        <WeatherCharts
          hours={weather.forecast.forecastday[0].hour}
          unit={unit}
        />
      </div>
    </>
  );
}
