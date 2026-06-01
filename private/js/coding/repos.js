function ReposPage() {
  // States für die Live-Daten der Repositories
  const [repo1, setRepo1] = React.useState(null);
  const [repo2, setRepo2] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    // Wir fragen zwei echte Repositories über die GitHub API ab
    // (Beispielhaft 'facebook/react' und 'nodejs/node'. Später deins!)
    const url1 = "https://api.github.com/repos/facebook/react";
    const url2 = "https://api.github.com/repos/nodejs/node";

    Promise.all([
      fetch(url1).then(res => res.json()),
      fetch(url2).then(res => res.json())
    ])
    .then(([data1, data2]) => {
      setRepo1(data1);
      setRepo2(data2);
      setLoading(false);
    })
    .catch(err => {
      console.error("Fehler beim Laden der GitHub Daten:", err);
      setError(true);
      setLoading(false);
    });
  }, []);

  return (
    <div className="page-container">
      <Navigation basePath="../.." />
      
      <main className="main-content animate-fade-in" style={{marginTop: '120px'}}>
        <span className="badge">Live API Tracker</span>
        <h1 className="page-title"><i className="fab fa-github text-gradient"></i> GitHub Repositories</h1>
        <p className="subtitle">Diese Daten werden in Echtzeit live über die GitHub-REST-API abgerufen!</p>
        
        {/* Lade-Anzeige */}
        {loading && (
          <div style={{textAlign: 'center', padding: '50px', color: 'var(--text-muted)'}}>
            <i className="fas fa-spinner fa-spin" style={{fontSize: '2rem', marginBottom: '10px'}}></i>
            <p>Frage GitHub API ab...</p>
          </div>
        )}

        {/* Fehler-Anzeige falls die API down ist oder das Limit erreicht wurde */}
        {error && (
          <div className="card-link no-hover" style={{border: '1px solid #ef4444', textAlign: 'center', padding: '30px'}}>
            <i className="fas fa-exclamation-triangle" style={{color: '#ef4444', fontSize: '2rem', marginBottom: '10px'}}></i>
            <h3>API-Limit erreicht oder Netzwerkfehler</h3>
            <p style={{color: 'var(--text-muted)'}}>GitHub erlaubt ohne Login nur eine begrenzte Anzahl an Live-Abfragen pro Stunde.</p>
          </div>
        )}

        {/* Wenn geladen und kein Fehler, zeigen wir die echten Daten an */}
        {!loading && !error && (
          <div className="grid-links" style={{marginTop: '40px'}}>
            
            {/* Live-Repo 1 */}
            <div className="card-link no-hover" style={{borderTop: '4px solid #3b82f6'}}>
              <div className="card-info">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h3 style={{fontSize: '1.3rem'}}>{repo1.name}</h3>
                    <span style={{color: '#f59e0b', fontWeight: 'bold'}}><i className="fas fa-star"></i> {repo1.stargazers_count.toLocaleString()}</span>
                </div>
                <p style={{marginTop: '10px', minHeight: '50px'}}>{repo1.description}</p>
                
                {/* Live Statistik-Leiste der API */}
                <div style={{display: 'flex', gap: '20px', marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)'}}>
                    <span><i className="fas fa-code-branch"></i> {repo1.forks_count} Forks</span>
                    <span><i className="fas fa-exclamation-circle"></i> {repo1.open_issues_count} Open Issues</span>
                </div>

                <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span className="event-badge coding">{repo1.language || "JavaScript"}</span>
                    <a href={repo1.html_url} target="_blank" className="btn-nav" style={{padding: '6px 14px', fontSize: '0.85rem', textDecoration: 'none'}}>
                        <i className="fas fa-external-link-alt"></i> Code ansehen
                    </a>
                </div>
              </div>
            </div>

            {/* Live-Repo 2 */}
            <div className="card-link no-hover" style={{borderTop: '4px solid #10b981'}}>
              <div className="card-info">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h3 style={{fontSize: '1.3rem'}}>{repo2.name}</h3>
                    <span style={{color: '#f59e0b', fontWeight: 'bold'}}><i className="fas fa-star"></i> {repo2.stargazers_count.toLocaleString()}</span>
                </div>
                <p style={{marginTop: '10px', minHeight: '50px'}}>{repo2.description}</p>
                
                <div style={{display: 'flex', gap: '20px', marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)'}}>
                    <span><i className="fas fa-code-branch"></i> {repo2.forks_count} Forks</span>
                    <span><i className="fas fa-exclamation-circle"></i> {repo2.open_issues_count} Open Issues</span>
                </div>

                <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span className="event-badge coding">{repo2.language || "C++"}</span>
                    <a href={repo2.html_url} target="_blank" className="btn-nav" style={{padding: '6px 14px', fontSize: '0.85rem', textDecoration: 'none'}}>
                        <i className="fas fa-external-link-alt"></i> Code ansehen
                    </a>
                </div>
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ReposPage />);