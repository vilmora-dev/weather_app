import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import getRadarStyles from "./RadarStyles";

type RadarProps = {
  lat?: number;
  lon?: number;
};

export default function Radar({ lat = 47.6062, lon = -122.3321 }: RadarProps) {
    const [open, setOpen] = useState(false);
    const styles = getRadarStyles({ isOpen: open, isMobile: false });
    const [showPrecipitation, setShowPrecipitation] = useState(true);
    const [showWind, setShowWind] = useState(true);
    const [showTemp, setShowTemp] = useState(false);
    const [showClouds, setShowClouds] = useState(false);
    const center: L.LatLngExpression = [lat, lon];
    
    return (
        <div style={styles.mapWrapper}>
        {/* Layer Toggles */}
        <div style={styles.dropdown}>
            <button 
                style={styles.dropdownButton} 
                onClick={() => setOpen(!open)}
            >
                Layers ▾
            </button>

            {open && (
                <div style={styles.dropdownMenu}>
                <label>
                    <input 
                    type="checkbox" 
                    checked={showPrecipitation} 
                    onChange={() => setShowPrecipitation(!showPrecipitation)}
                    />
                    Precipitation
                </label>

                <label>
                    <input 
                    type="checkbox" 
                    checked={showWind} 
                    onChange={() => setShowWind(!showWind)}
                    />
                    Wind
                </label>

                <label>
                    <input 
                    type="checkbox" 
                    checked={showTemp} 
                    onChange={() => setShowTemp(!showTemp)}
                    />
                    Temperature
                </label>

                <label>
                    <input 
                    type="checkbox" 
                    checked={showClouds} 
                    onChange={() => setShowClouds(!showClouds)}
                    />
                    Clouds
                </label>
                </div>
            )}
        </div>


        <MapContainer
            center={center}
            zoom={8}
            scrollWheelZoom={true}
            style={{ height: "75vh", width: "100%", borderRadius: "12px" }}
        >
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {showPrecipitation && (
            <TileLayer
                url={`https://tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_WEATHER_API_KEY}`}
                attribution="&copy; OpenWeatherMap"
                opacity={0.75}
            />
            )}

            {showWind && (
            <TileLayer
                url={`https://tile.openweathermap.org/map/wind/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_WEATHER_API_KEY}`}
                attribution="&copy; OpenWeatherMap"
                opacity={0.75}
            />
            )}

            {showTemp && (
            <TileLayer
                url={`https://tile.openweathermap.org/map/temp/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_WEATHER_API_KEY}`}
                attribution="&copy; OpenWeatherMap"
                opacity={0.65}
            />
            )}

            {showClouds && (
            <TileLayer
                url={`https://tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_WEATHER_API_KEY}`}
                attribution="&copy; OpenWeatherMap"
                opacity={0.85}
            />
            )}
        </MapContainer>
        </div>
    );
}


