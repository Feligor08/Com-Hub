function ReposPage() {
  // States für die Live-Daten der Repositories
  const [repos, setRepos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    // Wir fragen echte Repositories über die GitHub API ab (Com-Hub, React und Node.js)
    const urls = [
      "https://api.github.com/repos/Feligor08/Com-Hub",
      "https://api.github.com/repos/facebook/react",
      "https://api.github.com/repos/nodejs/node"
    ];

    Promise.all(
      urls.map(url => fetch(url).then(res => {
        if (!res.ok) throw new Error("API-Limit erreicht oder Netzwerkfehler");
        return res.json();
      }))
    )
    .then((data) => {
      setRepos(data);
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
            <i className="fas fa-spinner fa-spin" style={{fontSize: '2rem', marginBottom: '10px', color: 'var(--accent)'}}></i>
            <p>Frage GitHub API ab...</p>
          </div>
        )}

        {/* Fehler-Anzeige falls die API down ist oder das Limit erreicht wurde */}
        {error && (
          <div className="card-link no-hover animate-slide-up" style={{border: '1px solid #ef4444', textAlign: 'center', padding: '30px', borderRadius: '12px'}}>
            <i className="fas fa-exclamation-triangle" style={{color: '#ef4444', fontSize: '2rem', marginBottom: '10px'}}></i>
            <h3>API-Limit erreicht oder Netzwerkfehler</h3>
            <p style={{color: 'var(--text-muted)'}}>GitHub erlaubt ohne Login nur eine begrenzte Anzahl an Live-Abfragen pro Stunde.</p>
          </div>
        )}

        {/* Wenn geladen und kein Fehler, zeigen wir die echten Daten an */}
        {!loading && !error && (
          <div className="grid-links" style={{marginTop: '40px'}}>
            {repos.map((repo, i) => {
              // Custom top border colors for each card
              const borderColors = ['#c084fc', '#3b82f6', '#10b981'];
              
              return (
                <div key={repo.id || i} className="card-link no-hover" style={{borderTop: `4px solid ${borderColors[i % borderColors.length]}`, borderRadius: '12px', transition: 'transform 0.3s ease'}}>
                  <div className="card-info">
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <h3 style={{fontSize: '1.25rem', fontWeight: '800', margin: 0}}>{repo.name}</h3>
                        <span style={{color: '#f59e0b', fontWeight: 'bold'}}><i className="fas fa-star"></i> {repo.stargazers_count.toLocaleString()}</span>
                    </div>
                    <p style={{marginTop: '10px', minHeight: '50px', fontSize: '0.85rem', color: 'var(--text-muted)'}}>{repo.description || "Keine Beschreibung für dieses Repository hinterlegt."}</p>
                    
                    {/* Live Statistik-Leiste der API */}
                    <div style={{display: 'flex', gap: '20px', marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)'}}>
                        <span><i className="fas fa-code-branch"></i> {repo.forks_count} Forks</span>
                        <span><i className="fas fa-exclamation-circle"></i> {repo.open_issues_count} Issues</span>
                    </div>

                    <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span className="event-badge coding">{repo.language || "JavaScript"}</span>
                        <a href={repo.html_url} target="_blank" className="btn-nav" style={{padding: '6px 14px', fontSize: '0.85rem', textDecoration: 'none'}}>
                            <i className="fas fa-external-link-alt"></i> Code ansehen
                        </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ReposPage />);