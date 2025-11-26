import { useWeather } from "./hooks/useWeather";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Today from "./components/Today/Today";
import ThreeDayForecast from "./components/ThreeDayForecast/ThreeDayForecast";
import Radar from "./components/Radar/Radar";
import Home from "./components/Home/Home";

function App() {
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('fahrenheit');
  const { weather, loading, error, getWeather } = useWeather();

  // Get user's IP
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        if (data.city) {
          setCity(data.city);
          getWeather(data.city);
        }
      } catch (err) {
        console.error("Failed to get location", err);
      }
    };

    fetchLocation();
  }, []);


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    getWeather(city);
  };

  return (
  <div style={styles.app}>
    <div style={styles.layout}>

      <style>{`
        @media (max-width: 768px) {
          .main-wrapper {
            padding-left: 78px !important;
          }
        }
      `}</style>

      {/* Sidebar */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div style={styles.mainWrapper} className="main-wrapper">
        <Navbar 
          city={{city, setCity}} 
          unit={{unit, setUnit}} 
          handleSearch={handleSearch}
        />

        <main style={styles.main}>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {weather?.isOffline &&(
            <p style={{ color: "red", textAlign: "center", marginTop: "12px" }}>
              Unable to connect to weather servers. Try again later.
            </p>
          )}
        <Routes>
          <Route path="/" element={
            weather ? 
              <Home weather={weather} unit={unit}/>
              : null
            } 
          />
          <Route path="/today" element={
            weather ? 
              <Today weather={weather} unit={unit}/> 
              : null
            } 
          />
          <Route path="/3days" element={
            weather ? 
              <ThreeDayForecast weather={weather} unit={unit}/> 
              : null
            } 
          />
          <Route path="/radar" element={
            weather ? 
              <Radar lat={weather.location.lat} lon={weather.location.lon} />
              : null
            } 
          />
        </Routes>

        </main>
      </div>

    </div>
  </div>

  );
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f7f9fc",
    minHeight: "100vh",
    width: "100vw",
  },

  layout: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    minHeight: "100vh",
  },

  mainWrapper: {
    flexGrow: 1,
    width: "100%",
    minHeight: "100vh",
    paddingLeft: "200px",
    backgroundColor: "#f1f5f9",
  },

  main: {
    padding: 20,
  },
};

export default App;


