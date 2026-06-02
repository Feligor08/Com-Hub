function ChangelogPage() {
  const [logs, setLogs] = React.useState([]);

  React.useEffect(() => {
    // Liest die Updates vollautomatisch aus dem Speicher ein
    const savedLogs = JSON.parse(localStorage.getItem("community_changelogs") || "[]");
    setLogs(savedLogs);
  }, []);

  return (
    <div className="page-container">
      <Navigation basePath="../.." />
      
      <main className="main-content animate-fade-in" style={{marginTop: '120px'}}>
        <span className="badge">Changelog</span>
        <h1 className="page-title"><i className="fas fa-history text-gradient"></i> Update-Logs</h1>
        <p className="subtitle">Verfolge die Entwicklung und alle Neuerungen der Pixel & Code Plattformen.</p>
        
        <div style={{marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '25px'}}>
          {logs.length === 0 ? (
            <div className="card-link no-hover" style={{textAlign: 'center', padding: '40px', color: 'var(--text-muted)'}}>
                <i className="fas fa-hourglass-start" style={{fontSize: '2rem', marginBottom: '10px'}}></i>
                <p>Noch keine Update-Logs vorhanden. Logge dich als Admin ein, um den ersten Log zu schreiben!</p>
            </div>
          ) : (
            logs.map((log) => (
              <div className="card-link no-hover scroll-animate" key={log.id} style={{borderLeft: '4px solid var(--accent)', padding: '30px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                        <span className="event-badge coding" style={{fontSize: '0.8rem', padding: '4px 12px'}}>{log.version}</span>
                        <h2 style={{fontSize: '1.4rem'}}>{log.title}</h2>
                    </div>
                    <span style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}><i className="far fa-calendar-alt"></i> {log.date}</span>
                </div>
                
                {/* Erlaubt Zeilenumbrüche aus der Textarea sauber darzustellen */}
                <p style={{marginTop: '15px', color: 'var(--text-main)', whiteSpace: 'pre-wrap', lineHeight: '1.8'}}>
                    {log.content}
                </p>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ChangelogPage />);