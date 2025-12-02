import { useState } from "react";
import type { WeatherResponse } from "../services/weatherApi";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import useIsMobile from "../utils/isMobile";

type WeatherChartsProps = {
    hours: WeatherResponse["forecast"]["forecastday"][0]["hour"];
    unit: string;
};

export default function WeatherCharts({hours, unit}: WeatherChartsProps){
    const [activeGraph, setActiveGraph] = useState<"temp" | "uv" | "precip">("temp");
    const isMobile = useIsMobile();
    // Chart data
    const tempData = {
        labels: hours.map(h => h.time.split(" ")[1]), // hour only
        datasets: [
          {
            label: unit == "fahrenheit" ? "Temperature (°F)" : "Temperature (°C)",
            data: hours.map(h => unit == "fahrenheit" ? h.temp_f : h.temp_c),
            borderColor: "rgba(255,99,132,1)",
            backgroundColor: "rgba(255,99,132,0.2)",
            fill: true,
          },
        ],
    };

    const uvData = {
        labels: hours.map(h => h.time.split(" ")[1]),
        datasets: [
        {
            label: "UV Index",
            data: hours.map(h => h.uv),
            borderColor: "rgba(255,206,86,1)",
            backgroundColor: "rgba(255,206,86,0.2)",
            fill: true,
        },
        ],
    };

    const precipData = {
        labels: hours.map(h => h.time.split(" ")[1]),
        datasets: [
        {
            label: "Precipitation (mm)",
            data: hours.map(h => h.chance_of_rain || 0),
            borderColor: "rgba(54,162,235,1)",
            backgroundColor: "rgba(54,162,235,0.2)",
            fill: true,
        },
        ],
    };

    const cardStyles: Record<string, React.CSSProperties> = {
        card: {
            minWidth: isMobile ? "90%" :"fit-content",
            margin: "20px",
            padding: "20px",
            borderRadius: "16px",
            backgroundColor: "#0f172a",
            color: "white",
            flex: "1 1 450px",
            maxWidth: "45%",
            boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
        }
    }

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

    return(
        <div style={cardStyles.card}>
            {/* Hourly Graphs */}
            <div style={styles.graphTabs}>
                <button 
                style={activeGraph === "temp" ? styles.tabActive : styles.tab}
                onClick={() => setActiveGraph("temp")}
                >
                Temperature
                </button>

                <button 
                style={activeGraph === "uv" ? styles.tabActive : styles.tab}
                onClick={() => setActiveGraph("uv")}
                >
                UV Index
                </button>

                <button 
                style={activeGraph === "precip" ? styles.tabActive : styles.tab}
                onClick={() => setActiveGraph("precip")}
                >
                Precipitation
                </button>
            </div>

            {activeGraph === "temp" && <Line data={tempData} />}
            {activeGraph === "uv" && <Line data={uvData} />}
            {activeGraph === "precip" && <Line data={precipData} />}
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: 'center',
    },
    locationTitle: {
        fontSize: "2rem",
        fontWeight: 700,
        marginBottom: "12px",
        color: "black",
    },
    graphTabs: {
        display: "flex",
        gap: "10px",
        marginBottom: "40px",
    },

    tab: {
        padding: "8px 12px",
        backgroundColor: "#2a2d3a",
        border: "1px solid #444",
        borderRadius: "8px",
        cursor: "pointer",
        color: "white",
        fontSize: "14px",
    },

    tabActive: {
        padding: "8px 12px",
        backgroundColor: "#4f46e5", // highlight color
        border: "1px solid #4f46e5",
        borderRadius: "8px",
        cursor: "pointer",
        color: "white",
        fontSize: "14px",
    },
};