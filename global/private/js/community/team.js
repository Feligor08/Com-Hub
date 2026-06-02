function TeamPage() {
  return (
    <div className="page-container">
      <Navigation basePath="../.." />
      
      <main className="main-content animate-fade-in" style={{marginTop: '120px'}}>
        <span className="badge">Behind the Scenes</span>
        <h1 className="page-title"><i className="fas fa-user-shield text-gradient"></i> Unser Team</h1>
        <p className="subtitle">Die Köpfe, die Pixel & Code am Laufen halten und die Server administrieren.</p>
        
        <div className="grid-links" style={{marginTop: '40px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'}}>
            
            <div className="card-link no-hover" style={{textAlign: 'center', borderTop: '4px solid #f59e0b'}}>
              <div style={{fontSize: '4rem', marginBottom: '15px'}}>👑</div>
              <h2 style={{fontSize: '1.5rem'}}>Felix</h2>
              <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '15px'}}>Founder & Lead Developer</p>
              <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                  <span className="event-badge coding">React</span>
                  <span className="event-badge gaming">Hardware</span>
              </div>
            </div>

            <div className="card-link no-hover" style={{textAlign: 'center', borderTop: '4px solid #ec4899'}}>
              <div style={{fontSize: '4rem', marginBottom: '15px'}}>🎨</div>
              <h2 style={{fontSize: '1.5rem'}}>Jasmin</h2>
              <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '15px'}}>Community Management & Design</p>
              <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                  <span className="event-badge" style={{background: 'rgba(236, 72, 153, 0.2)', color: '#f472b6'}}>Support</span>
                  <span className="event-badge" style={{background: 'rgba(236, 72, 153, 0.2)', color: '#f472b6'}}>Events</span>
              </div>
            </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TeamPage />);