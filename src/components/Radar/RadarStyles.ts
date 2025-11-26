import React from "react";

interface RadarStylesProps {
  isOpen?: boolean;
  isMobile?: boolean;
}

interface RadarStyles {
  mapWrapper: React.CSSProperties;
  dropdown: React.CSSProperties;
  dropdownButton: React.CSSProperties;
  dropdownMenu: React.CSSProperties;
}

const getRadarStyles = ({ isOpen = false, isMobile = false }: RadarStylesProps): RadarStyles => ({
  mapWrapper: {
    position: "relative",
    width: "100%",
  },

  dropdown: {
    position: "absolute",
    top: isMobile ? "10px" : "15px",
    right: isMobile ? "10px" : "15px",
    zIndex: 1000,
  },

  dropdownButton: {
    padding: "8px 14px",
    backgroundColor: "rgba(27,29,40,0.9)",
    color: "white",
    border: "1px solid #444",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    backdropFilter: "blur(4px)",
  },

  dropdownMenu: {
    position: "absolute",
    top: "110%",
    right: 0,
    transform: "translateX(0)",
    marginTop: "8px",
    backgroundColor: "rgba(27,29,40,0.95)",
    border: "1px solid #444",
    borderRadius: "8px",
    padding: "10px",
    minWidth: "150px",
    display: isOpen ? "flex" : "none",
    flexDirection: "column",
    gap: "8px",
    color: "white",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
    zIndex: 1000,
  },
});

export default getRadarStyles;
