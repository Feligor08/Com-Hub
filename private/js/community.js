function CommunityHub() {
  return (
    <div className="page-container">
      <Navigation basePath=".." />
      
      <main className="main-content animate-fade-in" style={{marginTop: '120px'}}>
        <div style={{textAlign: 'center', marginBottom: '50px'}}>
            <span className="badge">Zusammenkunft</span>
            <h1 className="page-title">We are <span className="text-gradient">Pixel & Code</span></h1>
            <p className="subtitle">Alles über das Team, unsere Regeln und wie du dich einbringen kannst.</p>
        </div>

        <div className="grid-links">
            <a href="./community/team.html" className="card-link">
                <div className="card-icon" style={{background: '#f59e0b'}}><i className="fas fa-user-shield"></i></div>
                <div className="card-info">
                    <h3>Unser Team</h3>
                    <p>Lerne die Köpfe hinter dem Projekt kennen.</p>
                </div>
            </a>
            
            <a href="./community/regelwerk.html" className="card-link">
                <div className="card-icon" style={{background: '#ef4444'}}><i className="fas fa-book"></i></div>
                <div className="card-info">
                    <h3>Regelwerk</h3>
                    <p>Wichtige Infos zum respektvollen Umgang miteinander.</p>
                </div>
            </a>

            <a href="./community/socials.html" className="card-link">
                <div className="card-icon" style={{background: '#3b82f6'}}><i className="fas fa-hashtag"></i></div>
                <div className="card-info">
                    <h3>Social Media</h3>
                    <p>Finde uns auf Discord, Instagram und Co.</p>
                </div>
            </a>

            <a href="./community/feedback.html" className="card-link">
                <div className="card-icon" style={{background: '#10b981'}}><i className="fas fa-comment-alt"></i></div>
                <div className="card-info">
                    <h3>Feedback</h3>
                    <p>Deine Meinung zählt! Reiche Ideen für die Server ein.</p>
                </div>
            </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CommunityHub />);