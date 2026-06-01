/**
 * ============================================================================
 * PIXEL & CODE - WIEDERVERWENDBARE COMPONENTEN & THEME-LOGIK
 * ============================================================================
 */

// 1. THEME TOGGLE BUTTON (Für die Navbar)
function ThemeToggle() {
  // Holt das gespeicherte Theme aus dem localStorage oder nutzt standardmäßig 'dark'
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'dark');

  React.useEffect(() => {
    // Setzt das data-theme Attribut auf dem <html> Tag
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="theme-toggle-btn" 
      aria-label="Design umschalten"
      style={{
        background: 'none',
        border: 'none',
        color: 'var(--text-main)',
        fontSize: '1.2rem',
        cursor: 'pointer',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s ease'
      }}
    >
      <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i>
    </button>
  );
}

// 2. WIEDERVERWENDBARE CARD (Projekt- / Link-Karte)
function ProjectCard({ title, desc, icon, url = "#", badgeText, badgeType, styleModifier }) {
  return (
    <a href={url} className={`card-link scroll-animate ${styleModifier || ''}`}>
      {icon && (
        <div className="card-icon" style={{ background: 'var(--accent-gradient)' }}>
          <i className={icon}></i>
        </div>
      )}
      <div className="card-info">
        {badgeText && <span className={`event-badge ${badgeType || 'gaming'}`}>{badgeText}</span>}
        <h3 style={badgeText ? { marginTop: '8px' } : {}}>{title}</h3>
        <p>{desc}</p>
      </div>
    </a>
  );
}

// 3. WIEDERVERWENDBARE EVENT BADGE
function EventBadge({ type, text }) {
  return (
    <span className={`event-badge ${type.toLowerCase()}`}>
      {text}
    </span>
  );
}

/**
 * ============================================================================
 * INTERSECTION OBSERVER - SCROLL ANIMATIONEN
 * ============================================================================
 */

// Wir warten, bis der Browser das HTML geladen hat
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.15, // Element muss zu 15% im sichtbaren Bereich sein
    rootMargin: "0px 0px -50px 0px" // Löst kurz vor dem Erreichen des Sichtfelds aus
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Sobald das Element ins Bild scrollt...
      if (entry.isIntersecting) {
        entry.target.classList.add("appear"); // ...fügen wir die CSS-Klasse hinzu
        observer.unobserve(entry.target); // ...und stoppen die Überwachung für dieses Element
      }
    });
  }, observerOptions);

  // Da wir React nutzen, müssen wir dem Browser einen winzigen Moment Zeit geben,
  // bis React die HTML-Karten (`.scroll-animate`) wirklich in den DOM-Baum injiziert hat.
  setTimeout(() => {
    document.querySelectorAll(".scroll-animate").forEach(el => {
      observer.observe(el);
    });
  }, 100);
});