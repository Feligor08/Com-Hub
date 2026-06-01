function TurnierePage() {
  return (
    <div className="page-container">
      <Navigation basePath="../.." />
      
      <main className="main-content animate-fade-in" style={{marginTop: '120px'}}>
        <span className="badge">Esports & Events</span>
        <h1 className="page-title"><i className="fas fa-trophy text-gradient"></i> Community Turniere</h1>
        <p className="subtitle">Miss dich mit anderen Spielern und gewinne exklusive Ränge und Preise.</p>
        
        <div style={{marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px'}}>
            {/* Aktives Turnier */}
            <div className="card-link no-hover" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px', padding: '30px'}}>
              <div>
                  <span className="event-badge gaming" style={{marginBottom: '10px'}}>Anmeldung offen</span>
                  <h2 style={{fontSize: '1.5rem'}}><i className="fas fa-crosshairs text-gradient"></i> CS2 2v2 Wingman Cup</h2>
                  <p style={{color: 'var(--text-muted)', marginTop: '5px'}}>
                      <strong>Datum:</strong> Diesen Freitag, 20:00 Uhr <br/> 
                      <strong>Preispool:</strong> 50€ Steam Guthaben & Discord Rolle
                  </p>
              </div>
              <button className="btn btn-primary" onClick={() => alert('Zur Discord-Anmeldung...')}>Jetzt Anmelden</button>
            </div>

            {/* Vergangenes Turnier */}
            <div className="card-link no-hover" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px', padding: '30px', opacity: 0.6}}>
              <div>
                  <span className="event-badge" style={{marginBottom: '10px', background: 'rgba(255,255,255,0.1)'}}>Abgeschlossen</span>
                  <h2 style={{fontSize: '1.5rem'}}><i className="fas fa-car text-gradient"></i> Rocket League 3v3</h2>
                  <p style={{color: 'var(--text-muted)', marginTop: '5px'}}>Gewinner: Team "PixelKings" 👑</p>
              </div>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TurnierePage />);