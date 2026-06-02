function HighlightsPage() {
  const [activeMedia, setActiveMedia] = React.useState(null); // { type: 'video'|'image', title, url, creator }

  const highlights = [
    {
      id: 1,
      type: 'video',
      title: "Insane 1v4 Clutch",
      creator: "@SniperGod",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Rick Roll or a placeholder embed
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600", // Gamplay backdrop
      icon: "fas fa-play"
    },
    {
      id: 2,
      type: 'image',
      title: "Neuer Spawn auf dem Server",
      creator: "@BuilderBob",
      url: "https://images.unsplash.com/photo-1607988795691-3d0147b43231?auto=format&fit=crop&q=80&w=1200", // Minecraft-style build
      thumbnail: "https://images.unsplash.com/photo-1607988795691-3d0147b43231?auto=format&fit=crop&q=80&w=600",
      icon: "fas fa-image"
    }
  ];

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
            <button className="btn btn-primary" onClick={() => alert('Verbinde mit Discord...')}>
              <i className="fab fa-discord"></i> Zum Discord
            </button>
        </div>

        <div className="grid-links" style={{marginTop: '30px'}}>
          {highlights.map((item) => (
            <div 
              className="card-link" 
              key={item.id} 
              onClick={() => setActiveMedia(item)}
              style={{ padding: '10px', textAlign: 'center', cursor: 'pointer', borderRadius: '12px' }}
            >
              <div style={{
                background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${item.thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '180px', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                  <div style={{
                    width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.8)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.2rem'
                  }}>
                    <i className={item.icon}></i>
                  </div>
              </div>
              <h3 style={{marginTop: '15px', fontSize: '1.05rem', fontWeight: '700', margin: '15px 0 5px 0'}}>{item.title}</h3>
              <p style={{fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0}}>Eingereicht von {item.creator}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox / Video Modal */}
      {activeMedia && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', 
          zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}
        onClick={() => setActiveMedia(null)}
        >
          <div style={{
            width: '90%', maxWidth: '800px', background: 'var(--bg-card)', 
            border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0,0,0,0.8)'
          }}
          onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{activeMedia.title} ({activeMedia.creator})</h3>
              <button 
                onClick={() => setActiveMedia(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div style={{ background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
              {activeMedia.type === 'video' ? (
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, width: '100%' }}>
                  <iframe 
                    src={activeMedia.url} 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <img 
                  src={activeMedia.url} 
                  alt={activeMedia.title}
                  style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HighlightsPage />);