import React from "react";

type Tech = {
  name: string;
  icon?: string; // optional, URL or emoji
  description?: string;
};

type DevCardProps = {
  projectName: string;
  description?: string;
  techStack: Tech[];
};

export default function DevCard({ projectName, description, techStack }: DevCardProps) {
  const styles: Record<string, React.CSSProperties> = {
    card: {
      backgroundColor: "#e7e7e7ff",
      color: "black",
      borderRadius: "16px",
      padding: "18px",
      width: "100%",
      boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "1.3rem",
      fontWeight: 700,
      marginBottom: "12px",
    },
    description: {
      fontSize: "1rem",
      opacity: 0.85,
      marginBottom: "16px",
    },
    h3: {
      fontSize: "1rem",
      fontWeight: 700,
      
      marginBottom: "12px",
    },
    techList: {
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
    },
    techItem: {
      color: "white",
      backgroundColor: "#1e293b",
      borderRadius: "8px",
      padding: "8px 12px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "0.9rem",
    },
    techIcon: {
      width: "20px",
      height: "20px",
    },
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{projectName}</h2>
      {description && <p style={styles.description}>{description}</p>}
      <h3 style={styles.h3}>Tech Stack:</h3>
      <div style={styles.techList}>
        {techStack.map((tech, idx) => (
          <div key={idx} style={styles.techItem}>
            {tech.icon && <img src={tech.icon} alt={tech.name} style={styles.techIcon} />}
            <span>{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
