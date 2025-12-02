import React from "react";

interface AQIBarProps {
  aqi: number; // US-EPA index (1–6)
}

const AQIBar: React.FC<AQIBarProps> = ({ aqi }) => {
  const safeAQI = Math.min(Math.max(aqi, 1), 6); // clamp 1–6
  const indicatorPosition = ((safeAQI - 1) / 5) * 100;

  const styles: Record<string, React.CSSProperties> = {
    wrapper: {
      width: "80%",
      marginTop: "8px",
    },

    barContainer: {
      position: "relative",
      width: "100%",
      height: "10px",
      borderRadius: "5px",
      overflow: "hidden",
      background: "#ccc",
    },

    barGradient: {
      width: "100%",
      height: "100%",
      background: `
        linear-gradient(to right,
          #00E400,  /* Good */
          #FFFF00,  /* Moderate */
          #FF7E00,  /* USG */
          #FF0000,  /* Unhealthy */
          #99004C,  /* Very Unhealthy */
          #7E0023   /* Hazardous */
        )
      `,
    },

    indicator: {
      position: "absolute",
      top: "-4px",
      left: `${indicatorPosition}%`,
      width: "14px",
      height: "14px",
      backgroundColor: "white",
      borderRadius: "50%",
      border: "2px solid #333",
      transform: "translateX(-50%)",
      transition: "left 0.3s ease",
      boxShadow: "0 0 4px rgba(0, 0, 0, 0.4)",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.barContainer}>
        <div style={styles.barGradient}></div>
        <div style={styles.indicator}></div>
      </div>
    </div>
  );
};

export default AQIBar;
