function HomePage() {
  const stats = { online: 142, members: 2405, projects: 42 };

  return (
    <div className="page-container">
      <Navigation basePath="." />
      
      <div style={{marginTop: '80px'}} className="animate-fade-in">
        <header className="hero">
          <div className="hero-content">
            <span className="badge animate-slide-up">Welcome Player & Developer</span>
            <h1 className="animate-slide-up delay-1">Pixel & <span className="text-gradient">Code</span></h1>
            <p className="subtitle animate-slide-up delay-2">Die ultimative Community für Gamer, die coden, und Entwickler, die zocken.</p>
            <div className="hero-buttons animate-slide-up delay-3">
              <a href="./seiten/gaming.html" className="btn btn-primary"><i className="fas fa-gamepad"></i> Loszocken</a>
              <a href="./seiten/coding.html" className="btn btn-secondary"><i className="fas fa-code"></i> Coden</a>
            </div>
          </div>
        </header>

        <section className="stats-bar animate-fade-in delay-3">
          <div className="stat-item"><span className="stat-num">{stats.online}</span><span className="stat-label"><span className="dot-online"></span> Online</span></div>
          <div className="stat-item"><span className="stat-num">{stats.members}</span><span className="stat-label">Mitglieder</span></div>
          <div className="stat-item"><span className="stat-num">{stats.projects}</span><span className="stat-label">Projekte</span></div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HomePage />);