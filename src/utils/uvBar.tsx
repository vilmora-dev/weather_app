import React from "react";

interface UVBarProps {
  uv: number; // UV index (0–11+)
}

const UVBar: React.FC<UVBarProps> = ({ uv }) => {
  const safeUV = Math.min(Math.max(uv, 0), 11); // clamp to 0–11+
  const indicatorPosition = (safeUV / 11) * 100;

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
          #A3CEFF,   /* Low (0–2) - soft blue */
          #4CAF50,   /* Moderate (3–5) - green */
          #FFEB3B,   /* High (6–7) - yellow */
          #FF9800,   /* Very High (8–10) - orange */
          #FF0000    /* Extreme (11+) - red */
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

export default UVBar;
