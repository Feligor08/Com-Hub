function GameserverPage() {
  const [copiedIp, setCopiedIp] = React.useState(null);

  const servers = [
    { name: "Survival Minecraft", ip: "mc.pixelandcode.de", status: "Online", players: "12/50" },
    { name: "CS2 Community Server", ip: "cs.pixelandcode.de", status: "Online", players: "8/10" }
  ];

  const handleCopy = (ip) => {
    navigator.clipboard.writeText(ip);
    setCopiedIp(ip);
    setTimeout(() => {
      setCopiedIp(null);
    }, 2000);
  };

  return (
    <div className="page-container">
      {/* Übergibt den Befehl: Zwei Ebenen zurück! */}
      <Navigation basePath="../.." />
      
      <main className="main-content animate-fade-in" style={{marginTop: '120px'}}>
        <span className="badge">Gaming</span>
        <h1 className="page-title"><i className="fas fa-server text-gradient"></i> Gameserver IPs</h1>
        <p className="subtitle">Verbinde dich direkt mit unseren Community-Servern und zocke mit uns.</p>
        
        <div className="grid-links" style={{marginTop: '40px'}}>
          {servers.map((srv, i) => (
            <div className="card-link no-hover" key={i}>
              <div className="card-info">
                <span className="event-badge gaming">{srv.status}</span>
                <h3 style={{marginTop: '10px'}}>{srv.name}</h3>
                <div style={{background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '6px', marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <code style={{margin: 0}}>{srv.ip}</code>
                    <button 
                      className="btn-nav" 
                      onClick={() => handleCopy(srv.ip)} 
                      style={{
                        padding: '4px 10px', 
                        fontSize: '0.8rem',
                        background: copiedIp === srv.ip ? '#10b981' : '',
                        borderColor: copiedIp === srv.ip ? '#10b981' : '',
                        color: copiedIp === srv.ip ? '#ffffff' : ''
                      }}
                    >
                      <i className={copiedIp === srv.ip ? "fas fa-check" : "fas fa-copy"}></i> {copiedIp === srv.ip ? "Kopiert!" : "Kopieren"}
                    </button>
                </div>
                <p style={{marginTop: '15px', fontSize: '0.85rem'}}><i className="fas fa-users"></i> {srv.players} Spieler online</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<GameserverPage />);