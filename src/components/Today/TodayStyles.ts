// Today.styles.ts
import React from "react";

// Props for the styles function (expand later if needed)
export interface TodayStylesProps {
  isMobile?: boolean;
}

// Return type for the styles
export interface TodayStyles {
  container: React.CSSProperties;
  locationTitle: React.CSSProperties;
}

// Styles function
export function getTodayStyles(_props: TodayStylesProps): TodayStyles {
  return {
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
  };
}
