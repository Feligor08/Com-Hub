function AdminLogPage() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  // Formular-States für das Update
  const [version, setVersion] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  // HIER DEINE DISCORD WEBHOOK URL EINTRAGEN:
  const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1511014872945524890/-ZfKvih4KgG_w6TM1BmPUBFmj4rIAWkYSZBTtR5AFyovnHjotBQi8GcAyB_9H1E-8VkS";

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "Admin" && password === "01012026JF!") {
      setIsLoggedIn(true);
    } else {
      alert("Falsche Anmeldedaten!");
    }
  };

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
    if (DISCORD_WEBHOOK_URL !== "https://discord.com/api/webhooks/1511014872945524890/-ZfKvih4KgG_w6TM1BmPUBFmj4rIAWkYSZBTtR5AFyovnHjotBQi8GcAyB_9H1E-8VkS") {
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
      alert("Update lokal gespeichert! (Discord Webhook URL fehlt noch im Code)");
    }

    // Formular zurücksetzen
    setVersion("");
    setTitle("");
    setContent("");
  };

  return (
    <div className="page-container">
      <Navigation basePath="../.." />
      <main className="main-content" style={{marginTop: '120px'}}>
        
        {!isLoggedIn ? (
          /* LOGIN FORMULAR */
          <div className="card-link no-hover animate-fade-in" style={{maxWidth: '450px', margin: '0 auto', padding: '40px'}}>
            <h2 style={{textAlign: 'center', marginBottom: '20px'}}><i className="fas fa-lock text-gradient"></i> Admin Login</h2>
            <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              <input type="text" placeholder="Benutzername" required value={username} onChange={e => setUsername(e.target.value)} style={inputStyle} />
              <input type="password" placeholder="Passwort" required value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
              <button type="submit" className="btn btn-primary" style={{width: '100%', justifyContent: 'center'}}>Einloggen</button>
            </form>
          </div>
        ) : (
          /* UPDATE FORMULAR */
          <div className="card-link no-hover animate-fade-in" style={{maxWidth: '700px', margin: '0 auto', padding: '40px'}}>
            <h2><i className="fas fa-pen-to-square text-gradient"></i> Update veröffentlichen</h2>
            <p className="subtitle" style={{marginBottom: '20px'}}>Einträge werden sofort auf der Website eingelesen und an Discord gepusht.</p>
            
            <form onSubmit={handlePublishUpdate} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              <div style={{display: 'flex', gap: '15px'}}>
                <input type="text" placeholder="v1.0.0" required value={version} onChange={e => setVersion(e.target.value)} style={{...inputStyle, width: '30%'}} />
                <input type="text" placeholder="Titel des Updates" required value={title} onChange={e => setTitle(e.target.value)} style={{...inputStyle, width: '70%'}} />
              </div>
              <textarea placeholder="Was hat sich geändert? (Nutze \\n für Zeilenumbrüche)" required value={content} onChange={e => setContent(e.target.value)} style={{...inputStyle, height: '200px', resize: 'vertical'}}></textarea>
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