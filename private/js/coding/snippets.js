function SnippetsPage() {
  const cssReset = `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    line-height: 1.6;
    font-family: sans-serif;
}`;

  return (
    <div className="page-container">
      <Navigation basePath="../.." />
      
      <main className="main-content animate-fade-in" style={{marginTop: '120px'}}>
        <span className="badge">Ressourcen</span>
        <h1 className="page-title"><i className="fas fa-paste text-gradient"></i> Nützliche Snippets</h1>
        <p className="subtitle">Kopieren erlaubt! Wiederverwendbare Code-Blöcke für deine Projekte.</p>
        
        <div style={{marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '30px'}}>
          
          <div className="card-link no-hover">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
                <div>
                    <h3>Standard CSS Reset</h3>
                    <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Ein sauberer Start für jedes Web-Projekt ohne lästige Ränder.</p>
                </div>
                <button className="btn-nav" onClick={() => {navigator.clipboard.writeText(cssReset); alert("Kopiert!")}}><i className="fas fa-copy"></i> Kopieren</button>
            </div>
            
            <pre style={{background: '#090d16', padding: '15px', borderRadius: '8px', border: '1px solid var(--border)', overflowX: 'auto'}}>
<code style={{border: 'none', padding: 0, color: '#a78bfa', background: 'transparent'}}>
{cssReset}
</code>
            </pre>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SnippetsPage />);