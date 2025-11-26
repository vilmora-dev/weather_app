import type { WeatherResponse } from "../../services/weatherApi";
import DevCard from "../DevCard";
import WeatherStatusCard from "../WeatherStatusCard";

const techStack = [
  { name: "React" },
  { name: "TypeScript" },
  { name: "Vite" },
  { name: "OpenWeatherMap API" },
  { name: "CSS-in-JS" },
  { name: "Python (FastAPI)"}
];

type HomeProps={
    weather: WeatherResponse;
    unit: string;
}

export default function Home({weather, unit}: HomeProps) {
  return (
    <>
    <WeatherStatusCard
        title={""}
        weather={weather.current}
        location={weather.location}
        unit={unit}
        isHome={true}
        background={weather.current.background}
    />
    <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
      <DevCard
        projectName="Weather Dashboard App"
        description="This is a weather application that provides real-time and forecasted weather information showing current conditions, hourly forecasts, 3-day forecasts, and radar maps."
        techStack={techStack}
      />
    </div>
    </>
  );
}
