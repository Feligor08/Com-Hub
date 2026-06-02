function LFGPage() {
  return (
    <div className="page-container">
      <Navigation basePath="../.." />
      
      <main className="main-content animate-fade-in" style={{marginTop: '120px'}}>
        <span className="badge">LFG (Looking For Group)</span>
        <h1 className="page-title"><i className="fas fa-users text-gradient"></i> Mitspielersuche</h1>
        <p className="subtitle">Finde die perfekten Teammates für dein nächstes Match oder Projekt.</p>

        <div className="grid-links" style={{marginTop: '40px'}}>
            <div className="card-link" style={{borderLeft: '4px solid #ef4444'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h3>Suche Duo-Mate für Valorant</h3>
                    <i className="fab fa-discord" style={{color: '#5865F2', fontSize: '1.2rem'}}></i>
                </div>
                <p>Bin aktuell Platin 2 und suche einen entspannten Mate für abends (ab 19 Uhr). Main: Omen/Viper.</p>
                <div style={{marginTop: '15px', display: 'flex', gap: '10px'}}>
                    <span className="event-badge" style={{background: 'rgba(239, 68, 68, 0.2)', color: '#f87171'}}>Valorant</span>
                    <span className="event-badge" style={{background: 'rgba(255, 255, 255, 0.1)'}}>Competitive</span>
                </div>
                <p style={{fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '15px'}}>Kontakt: <strong>@PlayerOne</strong> auf Discord</p>
            </div>

            <div className="card-link" style={{borderLeft: '4px solid #10b981'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h3>Minecraft Projekt Mitgründer gesucht</h3>
                    <i className="fab fa-discord" style={{color: '#5865F2', fontSize: '1.2rem'}}></i>
                </div>
                <p>Suche jemanden, der sich mit Spigot Plugins auskennt, um einen kleinen RPG-Server aufzubauen. Root-Server vorhanden!</p>
                <div style={{marginTop: '15px', display: 'flex', gap: '10px'}}>
                    <span className="event-badge" style={{background: 'rgba(16, 185, 129, 0.2)', color: '#34d399'}}>Minecraft</span>
                    <span className="event-badge" style={{background: 'rgba(255, 255, 255, 0.1)'}}>Projekt</span>
                </div>
                <p style={{fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '15px'}}>Kontakt: <strong>@DevCraft</strong> auf Discord</p>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LFGPage />);