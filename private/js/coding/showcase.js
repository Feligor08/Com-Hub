function ShowcasePage() {
  return (
    <div className="page-container">
      <Navigation basePath="../.." />
      
      <main className="main-content animate-fade-in" style={{marginTop: '120px'}}>
        <span className="badge">Community Projekte</span>
        <h1 className="page-title"><i className="fas fa-laptop-code text-gradient"></i> Projekt Showcase</h1>
        <p className="subtitle">Das bauen unsere Mitglieder gerade. Zeig uns auch dein aktuelles Projekt!</p>
        
        <div className="grid-links" style={{marginTop: '40px'}}>
            <a href="#" className="card-link">
              <div className="card-icon" style={{background: '#3b82f6'}}><i className="fas fa-mobile-alt"></i></div>
              <div className="card-info">
                <h3>Mobile Quiz App</h3>
                <p>Eine React Native App zum Lernen von IT-Grundlagen mit Highscore-System.</p>
                <p style={{fontSize: '0.8rem', color: 'var(--accent)', marginTop: '10px'}}>Von @DevFelix</p>
              </div>
            </a>
            
            <a href="#" className="card-link">
              <div className="card-icon" style={{background: '#10b981'}}><i className="fas fa-server"></i></div>
              <div className="card-info">
                <h3>Custom API REST</h3>
                <p>Ein schnelles Backend für Spielerstatistiken in Python (FastAPI).</p>
                <p style={{fontSize: '0.8rem', color: 'var(--accent)', marginTop: '10px'}}>Von @PythonKing</p>
              </div>
            </a>
            
            {/* Call to action für User */}
            <div className="card-link no-hover" style={{border: '1px dashed var(--accent)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                <div>
                    <i className="fas fa-plus" style={{fontSize: '2rem', color: 'var(--text-muted)', marginBottom: '10px'}}></i>
                    <h3>Dein Projekt hier?</h3>
                    <p>Poste es in #showcase auf Discord!</p>
                </div>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ShowcasePage />);