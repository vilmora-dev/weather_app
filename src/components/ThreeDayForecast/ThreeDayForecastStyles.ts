import type { CSSProperties } from "react";

export interface ThreeDayStylesProps {
  selectedRow?: number | null;
}

export interface ThreeDayStyles {
  container: CSSProperties;
  table: CSSProperties;
  cell: CSSProperties;
  icon: CSSProperties;
  row: (isSelected: boolean) => CSSProperties;
}

export default function getThreeDayStyles({}): ThreeDayStyles {
  return {
    container: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: "20px",
      marginTop: "10px",
      justifyContent: "center",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      borderRadius: "25px",
    },
    cell: {
      padding: "12px 16px",
      borderBottom: "1px solid #444",
      textAlign: "left",
      color: "black",
    },
    icon: {
      width: "26px",
      verticalAlign: "middle",
      marginRight: "6px",
    },
    row: (isSelected: boolean) => ({
      cursor: "pointer",
      backgroundColor: isSelected ? "#1e3a8a31" : "#ffffff01",
      transition: "0.2s",
    }),
  };
}
