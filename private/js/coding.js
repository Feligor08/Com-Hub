function CodingHub() {
  return (
    <div className="page-container">
      <Navigation basePath=".." />
      
      <main className="main-content animate-fade-in" style={{marginTop: '120px'}}>
        <div style={{textAlign: 'center', marginBottom: '50px'}}>
            <span className="badge">Developer Area</span>
            <h1 className="page-title">Code, Build, <span className="text-gradient">Deploy</span></h1>
            <p className="subtitle">Ressourcen und Open-Source Projekte unserer Entwickler.</p>
        </div>

        {/* Featured Project */}
        <div className="card-link no-hover" style={{marginBottom: '40px', borderLeft: '4px solid var(--accent)', padding: '30px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                    <h2 style={{marginBottom: '10px'}}><i className="fas fa-rocket text-gradient"></i> Nexus Code Play</h2>
                    <p style={{color: 'var(--text-muted)'}}>Unsere interaktive Coding-Plattform für Mini-Games und Code-Challenges. Hilf mit, sie weiter auszubauen!</p>
                </div>
                <a href="./coding/repos.html" className="btn btn-primary" style={{whiteSpace: 'nowrap'}}>Zum Repo</a>
            </div>
        </div>

        <div className="grid-links">
            <a href="./coding/repos.html" className="card-link">
                <div className="card-icon" style={{background: '#24292e'}}><i className="fab fa-github"></i></div>
                <div className="card-info">
                    <h3>GitHub Repos</h3>
                    <p>Alle Open-Source Projekte der Community im Überblick.</p>
                </div>
            </a>
            
            <a href="./coding/showcase.html" className="card-link">
                <div className="card-icon" style={{background: '#8b5cf6'}}><i className="fas fa-code"></i></div>
                <div className="card-info">
                    <h3>Projekt Showcase</h3>
                    <p>Sieh dir an, was andere Mitglieder gerade entwickeln.</p>
                </div>
            </a>

            <a href="./coding/snippets.html" className="card-link">
                <div className="card-icon" style={{background: '#10b981'}}><i className="fas fa-paste"></i></div>
                <div className="card-info">
                    <h3>Snippets</h3>
                    <p>Wiederverwendbare Code-Blöcke für HTML, CSS und React.</p>
                </div>
            </a>

            <a href="./coding/support.html" className="card-link">
                <div className="card-icon" style={{background: '#ef4444'}}><i className="fas fa-life-ring"></i></div>
                <div className="card-info">
                    <h3>Hilfe & Support</h3>
                    <p>Du steckst bei einem Bug fest? Hier gibt's Hilfe.</p>
                </div>
            </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CodingHub />);