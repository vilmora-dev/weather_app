import { useEffect, useState } from "react";
import type { WeatherResponse } from "../../services/weatherApi";
import { CloudRain, Droplets, Sun, Cloud } from "lucide-react";
import WeatherStatusCard from "../WeatherStatusCard";
import WeatherCharts from "../WeatherCharts";
import getThreeDayStyles from "./ThreeDayForecastStyles";

type ThreeDayProps = {
  weather: WeatherResponse;
  unit: string;
};

export default function ThreeDayForecast({ weather, unit }: ThreeDayProps) {
  if (!weather) return null;

  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const styles = getThreeDayStyles({ selectedRow });

  useEffect(() => {
    if (selectedRow == null) 
      setSelectedRow(0);
  }, [selectedRow, setSelectedRow]);

  return (
    <>
      {/* Forecast Table */}
      <div style={{ marginTop: "20px" }}>
        <table style={styles.table}>
          <tbody>
            {weather.forecast.forecastday.map((day, index) => {
              const minTemp = Math.round(day.day.mintemp_c);
              const maxTemp = Math.round(day.day.maxtemp_c);
              const type = day.day.condition.text;
              const precip = day.day.daily_chance_of_rain;

              const getMainIcon = (t: string) => {
                const lower = t.toLowerCase();
                if (lower.includes("rain")) return <CloudRain style={styles.icon} />;
                if (lower.includes("sun") || lower.includes("clear")) return <Sun style={styles.icon} />;
                if (lower.includes("cloud")) return <Cloud style={styles.icon} />;
                return <Cloud style={styles.icon} />;
              };

              return (
                <tr
                  key={index}
                  onClick={() => setSelectedRow(index)}
                  style={styles.row(selectedRow === index)}
                >
                  <td style={styles.cell}>
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td style={styles.cell}>
                    {minTemp}° / {maxTemp}°
                  </td>
                  <td style={styles.cell}>
                    {getMainIcon(type)} {type}
                  </td>
                  <td style={styles.cell}>
                    <Droplets style={{ width: 16, height: 16, marginRight: 6 }} />
                    {precip}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Day Forecast Data */}
      {selectedRow !== null && (
        <div style={styles.container}>
          {(() => {
            const day = weather.forecast.forecastday[selectedRow];
            return (
              <>
                <WeatherStatusCard
                  title={new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                  })}
                  weather={day.day}
                  location={weather.location}
                  unit={unit}
                  isHome={false}
                  background={day.day.background}
                  date={day.date}
                />
                <WeatherCharts hours={day.hour} unit={unit} />
              </>
            );
          })()}
        </div>
      )}
    </>
  );
}
