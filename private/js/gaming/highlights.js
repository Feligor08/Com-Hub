function HighlightsPage() {
  return (
    <div className="page-container">
      <Navigation basePath="../.." />
      
      <main className="main-content animate-fade-in" style={{marginTop: '120px'}}>
        <span className="badge">Media</span>
        <h1 className="page-title"><i className="fas fa-photo-film text-gradient"></i> Community Highlights</h1>
        <p className="subtitle">Die besten Plays, lustigsten Momente und krassesten Bauwerke unserer Member.</p>

        <div style={{background: 'var(--bg-card)', padding: '40px', borderRadius: '12px', textAlign: 'center', border: '1px dashed var(--border)', marginTop: '40px'}}>
            <i className="fas fa-video" style={{fontSize: '3rem', color: 'var(--accent)', marginBottom: '15px'}}></i>
            <h3>Clips des Monats einreichen</h3>
            <p style={{color: 'var(--text-muted)', marginBottom: '20px'}}>
                Poste deine Twitch-Clips, YouTube-Links oder Screenshots in unseren Discord-Channel <code>#media</code>, um hier gefeatured zu werden!
            </p>
            <button className="btn btn-primary"><i className="fab fa-discord"></i> Zum Discord</button>
        </div>

        <div className="grid-links" style={{marginTop: '30px'}}>
            {/* Platzhalter für zukünftige Videos/Bilder */}
            <div className="card-link no-hover" style={{padding: '10px', textAlign: 'center'}}>
                <div style={{background: '#000', height: '180px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <i className="fas fa-play" style={{fontSize: '2rem', color: 'rgba(255,255,255,0.3)'}}></i>
                </div>
                <h3 style={{marginTop: '15px', fontSize: '1rem'}}>Insane 1v4 Clutch</h3>
                <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Eingereicht von @SniperGod</p>
            </div>
            <div className="card-link no-hover" style={{padding: '10px', textAlign: 'center'}}>
                <div style={{background: '#000', height: '180px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <i className="fas fa-image" style={{fontSize: '2rem', color: 'rgba(255,255,255,0.3)'}}></i>
                </div>
                <h3 style={{marginTop: '15px', fontSize: '1rem'}}>Neuer Spawn auf dem Server</h3>
                <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Eingereicht von @BuilderBob</p>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HighlightsPage />);