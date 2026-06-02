function TurnierePage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [discordTag, setDiscordTag] = React.useState('');
  const [playerName, setPlayerName] = React.useState('');
  const [isRegistered, setIsRegistered] = React.useState(
    localStorage.getItem('registered_cup_wingman') === 'true'
  );
  const [registrationsCount, setRegistrationsCount] = React.useState(18); // Default counter

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!playerName.trim() || !discordTag.trim()) return;

    setIsRegistered(true);
    setRegistrationsCount(prev => prev + 1);
    localStorage.setItem('registered_cup_wingman', 'true');
    setIsModalOpen(false);
  };

  const handleCancelRegistration = () => {
    if (confirm("Möchtest du dich wirklich vom Turnier abmelden?")) {
      setIsRegistered(false);
      setRegistrationsCount(prev => prev - 1);
      localStorage.removeItem('registered_cup_wingman');
    }
  };

  return (
    <div className="page-container">
      <Navigation basePath="../.." />
      
      <main className="main-content animate-fade-in" style={{marginTop: '120px'}}>
        <span className="badge">Esports & Events</span>
        <h1 className="page-title"><i className="fas fa-trophy text-gradient"></i> Community Turniere</h1>
        <p className="subtitle">Miss dich mit anderen Spielern und gewinne exklusive Ränge und Preise.</p>
        
        <div style={{marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px'}}>
            {/* Aktives Turnier */}
            <div className="card-link no-hover" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px', padding: '30px', position: 'relative', overflow: 'hidden'}}>
              <div>
                  <span className="event-badge gaming" style={{marginBottom: '10px'}}>Anmeldung offen</span>
                  <h2 style={{fontSize: '1.5rem'}}><i className="fas fa-crosshairs text-gradient"></i> CS2 2v2 Wingman Cup</h2>
                  <p style={{color: 'var(--text-muted)', marginTop: '5px'}}>
                      <strong>Datum:</strong> Diesen Freitag, 20:00 Uhr <br/> 
                      <strong>Preispool:</strong> 50€ Steam Guthaben & Discord Rolle <br/>
                      <strong>Teilnehmer:</strong> {registrationsCount} Spieler registriert (Max. 32)
                  </p>
              </div>
              <div>
                {isRegistered ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                    <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.95rem' }}><i className="fas fa-check-circle"></i> Angemeldet</span>
                    <button className="btn btn-secondary" onClick={handleCancelRegistration} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Abmelden</button>
                  </div>
                ) : (
                  <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Jetzt Anmelden</button>
                )}
              </div>
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

      {/* Anmeldung Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', 
          zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div className="card-link no-hover" style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)', 
            padding: '30px', width: '90%', maxWidth: '450px', borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.4rem', margin: 0 }}><i className="fas fa-file-signature text-gradient"></i> Turnier-Anmeldung</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '5px' }}>In-Game Name (CS2)</label>
                <input 
                  type="text" 
                  required
                  placeholder="z.B. SniperGod"
                  value={playerName}
                  onChange={e => setPlayerName(e.target.value)}
                  style={{ width: '100%', padding: '12px', background: 'var(--bg-dark)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-main)', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Discord Username & Tag</label>
                <input 
                  type="text" 
                  required
                  placeholder="z.B. snipergod#1234"
                  value={discordTag}
                  onChange={e => setDiscordTag(e.target.value)}
                  style={{ width: '100%', padding: '12px', background: 'var(--bg-dark)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-main)', outline: 'none' }}
                />
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                Registrierung abschicken
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TurnierePage />);