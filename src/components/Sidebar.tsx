import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Sun, Calendar, Radar } from "lucide-react";

export default function Sidebar() {
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const sidebarStyle = {
    sidebar: (isMobile: boolean) => ({
      height: "100vh",
      backgroundColor: "#0f172a",
      position: "fixed",
      width: isMobile ? "78px" : "200px",
      color: "white",
      top: 0,
      left: 0,
      padding: "24px 0",
      display: "flex",
      flexDirection: "column",
      zIndex: 50,
      boxShadow: "2px 0 10px rgba(0,0,0,0.4)",
    } as const),
  };


  return (
    <aside style={sidebarStyle.sidebar(isMobile)}>
      {isMobile ? (
      <h2 style={styles.iconTitle}>🌤️</h2>
      ) : (
      <h2 style={styles.title}>WeatherApp</h2>
      )}

      <nav style={styles.nav}>
        <NavLink
          to="/"
          style={({ isActive }) =>
            isActive
              ? { ...styles.link, ...styles.active }
              : styles.link
          }
        >
          <Home size={22} />
          {!isMobile && <span style={styles.linkText}>Home</span>}
        </NavLink>

        <NavLink
          to="/today"
          style={({ isActive }) =>
            isActive
              ? { ...styles.link, ...styles.active }
              : styles.link
          }
        >
          <Sun size={22} />
          {!isMobile && <span style={styles.linkText}>Today</span>}
        </NavLink>

        <NavLink
          to="/3days"
          style={({ isActive }) =>
            isActive
              ? { ...styles.link, ...styles.active }
              : styles.link
          }
        >
          <Calendar size={22} />
          {!isMobile && <span style={styles.linkText}>3 Days</span>}
        </NavLink>

        <NavLink
          to="/radar"
          style={({ isActive }) =>
            isActive
              ? { ...styles.link, ...styles.active }
              : styles.link
          }
        >
          <Radar size={22} />
          {!isMobile && <span style={styles.linkText}>Radar</span>}
        </NavLink>
      </nav>
    </aside>
  );
}

const styles: Record<string, React.CSSProperties> = {
  title: {
    fontSize: "1.6rem",
    fontWeight: "bold",
    padding: "0 24px",
    marginBottom: "32px",
  },

  iconTitle: {
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "32px",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "0 12px",
    fontSize: "1.1rem",
  },

  link: {
    padding: "12px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    color: "white",
    transition: "background 0.2s",
  },

  linkText: {
    paddingLeft: "10px",
  },

  active: {
    backgroundColor: "#1e293b",
    fontWeight: 600,
  },
};
