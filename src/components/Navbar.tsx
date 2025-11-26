type NavbarProps = {
    city: {city: string, setCity: (v: string)=>void };
    unit: {unit: string, setUnit: (v: string)=>void };
    handleSearch: (e: React.FormEvent)=>void;
}

export default function Navbar({city, unit, handleSearch}: NavbarProps) {
  return (
    <nav style={styles.navbar}>
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Enter city..."
            value={city.city}
            onChange={(e) => city.setCity(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Search
          </button>

        </form>        
          <select
            value={unit.unit}
            onChange={(e) => unit.setUnit(e.target.value)}
            style={styles.select}
            >
            <option value="fahrenheit">°F</option>
            <option value="celsius">°C</option>
          </select>
      </nav>
  );
}

const styles: Record<string, React.CSSProperties> = {
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e293b",
    color: "white",
    padding: "10px 5%",
    flexWrap: "wrap",
  },
  select: {
    padding: 8,
    fontSize: 16,
    borderRadius: 4,
    border: "none",
    color: "#fff",
    backgroundColor: "#bfbfbf01",
    cursor: "pointer",
  },
  title: { margin: 0, fontSize: 24 },
  searchForm: { display: "flex", gap: 8 },
  input: { padding: 8, fontSize: 16, borderRadius: 4, minWidth: "250px", border: "1px solid #ccc" },
  button: { padding: "8px 12px", fontSize: 16, borderRadius: 4, cursor: "pointer", backgroundColor: "#2563eb", color: "white", border: "none" },
};

