import React from "react";
import useIsMobile from "../utils/isMobile";
import type { WeatherResponse } from "../services/weatherApi";
import AQIBar from "../utils/AqiBar";
import UVBar from "../utils/uvBar";

type WeatherStatusCardProps = {
    title: string;
    weather: WeatherResponse["current"] | WeatherResponse["forecast"]["forecastday"][0]["day"];
    location?: WeatherResponse["location"];
    unit: string;
    isHome?: boolean;
    date?: string;
    background?: string;
    isForecast?: boolean;
};

export default function WeatherStatusCard({
    title,
    weather,
    location,
    unit,
    isHome = false,
    date,
    background,
    isForecast = false,
}: WeatherStatusCardProps) {
    const isMobile = useIsMobile();
    const styles: Record<string, React.CSSProperties> = {
        weatherCard: {
            width: isMobile ? "100%" : isHome && !isMobile ? "100%" : "fit-content",
            minHeight: "300px",
            minWidth: isMobile? "200px" : "350px",
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
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            color: "white",
            padding: "24px",
            borderRadius: "20px",
            width: "100%",
            height: "100%",
        },

        locationTitle: {
            fontSize: isMobile ? "1.6rem" : "1.8rem",
            fontWeight: 700,
            marginBottom: "12px",
            paddingRight: 25,
        },
        
        currentRow: {
            display: isHome && !isMobile ? "grid" : "flex",
            gridTemplateColumns: isHome && !isMobile ? "auto 1fr" : undefined, // icon | content
            alignItems: "center",
            gap: "24px",
            marginBottom: "20px",
        },
            
        grid: {
            display: isHome && !isMobile ? "grid" : "block",
            gridTemplateColumns: isHome && !isMobile ? "auto auto" : undefined, // for example: top info / bottom info
            gap: "2px 8px",
            gridColumn: isHome && !isMobile ? 2 : undefined,
            paddingTop: 10,
        },

        gridItem: {
            margin: 0,
            padding: isHome && !isMobile ? "10px 0" : undefined,
            lineHeight: isHome && !isMobile ? "1.2" : undefined,
            fontSize: "18px",
        },
        itemMB: {
            margin: "5px 0"
        },
        bigIcon: {
            width: isMobile ? "60px":"90px",
            height:  isMobile ? "60px":"90px",
        },

        tempMain: {
            fontSize: "2.4rem",
            margin: 0,
        },
        last_updated: {
            fontSize: "12px",
            position: "fixed",
            bottom: '-10px',
            right: "80px"
        },
        block: {
            display: "block",
            width: "100%",
            minWidth: isMobile ? "150px":"200px"
        },
        secContent:{
            padding: "10px 8px",
            margin: "3px 0",
            backgroundColor: "#1111114c",
            borderRadius: "18px",
            width: isMobile ? "80%" : "50%",
            minWidth: isMobile ? "150px" : "150px"
        },
        aqiSection: {
            marginTop: "1rem",
            width: "100%",
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


    function convertAQI(aqi: number) {
        switch (aqi) {
            case 1: return { value: 25, label: "Good", color: "#2ecc71" };
            case 2: return { value: 75, label: "Moderate", color: "#f1c40f" };
            case 3: return { value: 125, label: "Unhealthy for Sensitive Groups", color: "#e67e22" };
            case 4: return { value: 175, label: "Unhealthy", color: "#e74c3c" };
            case 5: return { value: 250, label: "Very Unhealthy", color: "#8e44ad" };
            default: return { value: 0, label: "Unknown", color: "#bdc3c7" };
        }
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
                <div style={styles.grid}>
                <p style={styles.gridItem}>
                {(weather as any).condition?.text}
                </p>

                {isForecast ? 
                (
                (weather as any).avghumidity !== undefined && (
                <p style={{...styles.gridItem, ...styles.itemMB}}>Avg humidity: {(weather as any).avghumidity}%</p>
                )) : 
                ((weather as any).humidity !== undefined && (
                <p style={{...styles.gridItem, ...styles.itemMB}}>Humidity: {(weather as any).humidity}%</p>
                ))
                }
                {(weather as any).uv !== undefined && (
                <div style={styles.block}>
                    <div style={styles.secContent}>
                        <p style={styles.gridItem}>UV Index: {((weather as any).uv)*10}</p>
                        <UVBar uv={((weather as any).uv)*10}/>
                    </div>
                </div>
                )}
                {(weather as any).air_quality !== undefined && (
                <div style={styles.block}>
                    <div style={styles.secContent}>
                        <p style={styles.gridItem}>
                            Air quality: {(weather as any).air_quality?.["us-epa-index"] ?? "N/A"} — {convertAQI((weather as any).air_quality?.["us-epa-index"]).label}
                        </p>
                        <AQIBar aqi={(weather as any).air_quality?.["us-epa-index"]} />
                    </div>
                </div>
                )}

                </div>
                {(weather as any).last_updated && (
                <p style={styles.last_updated}>Last updated: {(weather as any).last_updated}</p>
                )}
            </div>
            </div>
        </div>
    </div>
    );
}
