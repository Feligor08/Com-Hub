function SocialsPage() {
  return (
    <div className="page-container">
      <Navigation basePath="../.." />
      
      <main className="main-content animate-fade-in" style={{marginTop: '120px'}}>
        <span className="badge">Connect</span>
        <h1 className="page-title"><i className="fas fa-hashtag text-gradient"></i> Social Media Links</h1>
        <p className="subtitle">Folge uns überall, um keine Updates, Turniere oder Events zu verpassen.</p>
        
        <div className="grid-links" style={{marginTop: '40px'}}>
             <a href="#" className="card-link" style={{textAlign: 'center', padding: '40px 20px'}}>
                 <i className="fab fa-discord" style={{fontSize: '3.5rem', color: '#5865F2', marginBottom: '15px'}}></i>
                 <h2 style={{fontSize: '1.5rem'}}>Discord</h2>
                 <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '10px'}}>Unser Hauptquartier. Hier spielt die Musik.</p>
             </a>
             <a href="#" className="card-link" style={{textAlign: 'center', padding: '40px 20px'}}>
                 <i className="fab fa-github" style={{fontSize: '3.5rem', color: '#fff', marginBottom: '15px'}}></i>
                 <h2 style={{fontSize: '1.5rem'}}>GitHub</h2>
                 <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '10px'}}>Alle Codes, Bots und Open-Source Projekte.</p>
             </a>
             <a href="#" className="card-link" style={{textAlign: 'center', padding: '40px 20px'}}>
                 <i className="fab fa-instagram" style={{fontSize: '3.5rem', color: '#e1306c', marginBottom: '15px'}}></i>
                 <h2 style={{fontSize: '1.5rem'}}>Instagram</h2>
                 <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '10px'}}>Behind the Scenes und Event-Erinnerungen.</p>
             </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SocialsPage />);