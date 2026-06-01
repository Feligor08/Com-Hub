function AdminLogPage() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true); // Verhindert kurzes Aufblitzen des Formulars
  
  // Formular-States für das Update
  const [version, setVersion] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  // HIER DEINE DISCORD WEBHOOK URL EINTRAGEN:
  const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1511014872945524890/-ZfKvih4KgG_w6TM1BmPUBFmj4rIAWkYSZBTtR5AFyovnHjotBQi8GcAyB_9H1E-8VkS";

  // Automatischer Schutz-Check beim Laden der Seite
  React.useEffect(() => {
    const token = localStorage.getItem("nexus_token");
    const userString = localStorage.getItem("nexus_user");

    if (!token || !userString) {
      // Kein Token vorhanden -> Weiterleitung zum zentralen Login
      alert("Zugriff verweigert. Bitte melde dich zuerst an.");
      window.location.href = "../community/auth.html";
      return;
    }

    try {
      const user = JSON.parse(userString);
      // Prüfen, ob der eingeloggte Account den Admin-Namen trägt
      if (user.username === "Admin") {
        setIsLoggedIn(true);
      } else {
        alert("Zugriff verweigert. Nur Administratoren haben hier Zugriff.");
        window.location.href = "../../index.html";
      }
    } catch (e) {
      console.error("Fehler beim Lesen der User-Daten", e);
      window.location.href = "../community/auth.html";
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handlePublishUpdate = (e) => {
    e.preventDefault();

    const newUpdate = {
      id: Date.now(),
      date: new Date().toLocaleDateString("de-DE"),
      version: version,
      title: title,
      content: content
    };

    // 1. LOKAL SPEICHERN (Für die Changelog-Seite)
    const existingLogs = JSON.parse(localStorage.getItem("community_changelogs") || "[]");
    existingLogs.unshift(newUpdate); // Neues Update ganz nach oben
    localStorage.setItem("community_changelogs", JSON.stringify(existingLogs));

    // 2. LIVE AN DISCORD SENDEN
    if (DISCORD_WEBHOOK_URL) {
      fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [{
            title: `🚀 Neues Update: ${title} (${version})`,
            description: content,
            color: 9133302, // Das coole Pixel&Code Violett als Dezimalwert
            timestamp: new Date().toISOString(),
            footer: { text: "Pixel & Code Changelog System" }
          }]
        })
      })
      .then(() => alert("Update erfolgreich gespeichert & auf Discord gepostet!"))
      .catch(err => console.error("Discord-Fehler:", err));
    } else {
      alert("Update lokal gespeichert! (Discord Webhook URL fehlt im Code)");
    }

    // Formular zurücksetzen
    setVersion("");
    setTitle("");
    setContent("");
  };

  // Solange die Berechtigung geprüft wird, wird eine leere Seite oder ein Ladeindikator angezeigt
  if (isLoading) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#fff' }}>
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Navigation basePath="../.." />
      <main className="main-content" style={{marginTop: '120px'}}>
        
        {isLoggedIn && (
          /* UPDATE FORMULAR (Wird nur gerendert, wenn der Admin-Check erfolgreich war) */
          <div className="card-link no-hover animate-fade-in" style={{maxWidth: '700px', margin: '0 auto', padding: '40px'}}>
            <h2><i className="fas fa-pen-to-square text-gradient"></i> Update veröffentlichen</h2>
            <p className="subtitle" style={{marginBottom: '20px'}}>Einträge werden sofort auf der Website eingelesen und an Discord gepusht.</p>
            
            <form onSubmit={handlePublishUpdate} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              <div style={{display: 'flex', gap: '15px'}}>
                <input type="text" placeholder="v1.0.0" required value={version} onChange={e => setVersion(e.target.value)} style={{...inputStyle, width: '30%'}} />
                <input type="text" placeholder="Titel des Updates" required value={title} onChange={e => setTitle(e.target.value)} style={{...inputStyle, width: '70%'}} />
              </div>
              <textarea placeholder="Was hat sich geändert? (Nutze \n für Zeilenumbrüche)" required value={content} onChange={e => setContent(e.target.value)} style={{...inputStyle, height: '200px', resize: 'vertical'}}></textarea>
              <button type="submit" className="btn btn-primary" style={{alignSelf: 'flex-start'}}><i className="fas fa-paper-plane"></i> Absenden & Posten</button>
            </form>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '12px 15px', background: 'rgba(0,0,0,0.3)', 
  border: '1px solid var(--border)', borderRadius: '8px', color: '#fff', 
  fontSize: '1rem', outline: 'none', fontFamily: 'inherit'
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AdminLogPage />);