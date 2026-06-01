function GamingHub() {
  return (
    <div className="page-container">
      {/* 1 Ordner nach oben */}
      <Navigation basePath=".." />
      
      <main className="main-content animate-fade-in" style={{marginTop: '120px'}}>
        <div style={{textAlign: 'center', marginBottom: '50px'}}>
            <span className="badge">Gaming Übersicht</span>
            <h1 className="page-title">Play, Compete, <span className="text-gradient">Win</span></h1>
            <p className="subtitle">Wähle einen Bereich, um mehr zu erfahren.</p>
        </div>

        <div className="grid-links">
            <a href="./gaming/gameserver.html" className="card-link">
                <div className="card-icon" style={{background: '#3b82f6'}}><i className="fas fa-server"></i></div>
                <div className="card-info">
                    <h3>Gameserver IPs</h3>
                    <p>Verbinde dich direkt auf unsere Minecraft- und CS2-Server.</p>
                </div>
            </a>
            
            <a href="./gaming/turniere.html" className="card-link">
                <div className="card-icon" style={{background: '#f59e0b'}}><i className="fas fa-trophy"></i></div>
                <div className="card-info">
                    <h3>Turniere & Events</h3>
                    <p>Melde dich für anstehende Esports-Events an.</p>
                </div>
            </a>

            <a href="./gaming/highlights.html" className="card-link">
                <div className="card-icon" style={{background: '#8b5cf6'}}><i className="fas fa-photo-film"></i></div>
                <div className="card-info">
                    <h3>Highlights</h3>
                    <p>Die besten Clips und Screenshots der Community.</p>
                </div>
            </a>

            <a href="./gaming/lfg.html" className="card-link">
                <div className="card-icon" style={{background: '#10b981'}}><i className="fas fa-users"></i></div>
                <div className="card-info">
                    <h3>Mitspielersuche (LFG)</h3>
                    <p>Finde das perfekte Duo oder Team für dein nächstes Match.</p>
                </div>
            </a>
        </div>
      </main>
        <div className="grid-links">
      {/* Sauber, kurz und liest sich wie echtes HTML! */}
      <ProjectCard 
        title="Nexus Code Play" 
        desc="Das interaktive Mini-Game-Portal." 
        icon="fab fa-github"
        badgeText="Beta"
        badgeType="coding"
      />
      <ProjectCard 
        title="Minecraft Server" 
        desc="Tritt unserer Welt bei!" 
        icon="fas fa-server"
        badgeText="Online"
        badgeType="gaming"
      />
    </div>
      <Footer />
    </div>
  );
}

function BeispielPage() {
  return (
    ""
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<GamingHub />);