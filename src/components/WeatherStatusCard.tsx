import React from "react";
import type { WeatherResponse } from "../services/weatherApi";

type WeatherStatusCardProps = {
    title: string;
    weather: WeatherResponse["current"] | WeatherResponse["forecast"]["forecastday"][0]["day"];
    location?: WeatherResponse["location"];
    unit: string;
    isHome?: boolean;
    date?: string;
    background?: string;
};

export default function WeatherStatusCard({
    title,
    weather,
    location,
    unit,
    isHome = false,
    date,
    background,
}: WeatherStatusCardProps) {

    const styles: Record<string, React.CSSProperties> = {
        weatherCard: {
            width: isHome ? "100%" : "fit-content",
            minHeight: "300px",
            minWidth: "350px",
            borderRadius: "20px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: 0,
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.25)",
            position: "relative",
            overflow: "hidden",
        },

        overlay: {
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(0, 0, 0, 0.35)",
            color: "white",
            padding: "24px",
            borderRadius: "20px",
            width: "100%",
            height: "100%",
        },

        locationTitle: {
            fontSize: "1.8rem",
            fontWeight: 700,
            marginBottom: "12px",
            paddingRight: 25,
        },

        currentRow: {
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginBottom: "20px",
        },

        bigIcon: {
            width: "90px",
            height: "90px",
        },

        tempMain: {
            fontSize: "2.4rem",
            margin: 0,
        },

        mainCondition: {
            fontSize: "1.2rem",
            opacity: 0.9,
        },
    };

    const getRelativeDateLabel = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();

        // Normalize time → compare only dates
        const normalize = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

        const d = normalize(date);
        const t = normalize(today);

        const diff = (d.getTime() - t.getTime()) / (1000 * 60 * 60 * 24);

        const getDate = (date: Date)=>{
            return new Date(date).toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
            })
        }
        if (diff === 0) return `Today - ${getDate(date)}`;
        if (diff === 1) return `Tomorrow - ${getDate(date)}`;
        if (diff === -1) return `Yesterday - ${getDate(date)}`;

        // Fallback → regular formatted label
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
        });
    }
    return (
    <div
    style={{
        ...styles.weatherCard,
        backgroundImage: `url(${background})`,
    }}
    >
        <div style={styles.overlay}>
            {isHome ? (
                location ? (
                    <h2 style={styles.locationTitle}>
                    {location.name}, {location.region}, {location.country}
                    </h2>
                ) : (
                    <h3 style={styles.locationTitle}>{title}</h3>
                )
                ) : (
                date ? (
                    <h3 style={styles.locationTitle}>{getRelativeDateLabel(date)}</h3>
                ) : (
                    <h3 style={styles.locationTitle}>{title}</h3>
                )
            )}


            <div style={styles.currentRow}>
            <img
                src={(weather as any).condition?.icon}
                alt={(weather as any).condition?.text}
                style={styles.bigIcon}
            />
            <div>
                <h3 style={styles.tempMain}>
                    {unit === "fahrenheit"
                        ? `${(weather as any).temp_f ?? (weather as any).avgtemp_f}°F`
                        : `${(weather as any).temp_c ?? (weather as any).avgtemp_c}°C`
                        }
                </h3>
                <p style={styles.mainCondition}>
                {(weather as any).condition?.text}
                </p>

                {(weather as any).humidity !== undefined && (
                <p>Humidity: {(weather as any).humidity}%</p>
                )}
                {(weather as any).uv !== undefined && (
                <p>UV Index: {(weather as any).uv}</p>
                )}
                {(weather as any).last_updated && (
                <p>Last updated: {(weather as any).last_updated}</p>
                )}
            </div>
            </div>
        </div>
    </div>
    );
}
