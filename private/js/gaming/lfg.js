function LFGPage() {
  const [selectedGame, setSelectedGame] = React.useState('all');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [game, setGame] = React.useState('Valorant');
  const [tag, setTag] = React.useState('Projekt');
  const [discordContact, setDiscordContact] = React.useState('');

  const [entries, setEntries] = React.useState(() => {
    const saved = localStorage.getItem('lfg_entries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Fehler beim Laden der LFG Einträge:", e);
      }
    }
    return [
      {
        id: 1,
        title: "Suche Duo-Mate für Valorant",
        desc: "Bin aktuell Platin 2 und suche einen entspannten Mate für abends (ab 19 Uhr). Main: Omen/Viper.",
        game: "Valorant",
        tag: "Competitive",
        contact: "@PlayerOne"
      },
      {
        id: 2,
        title: "Minecraft Projekt Mitgründer gesucht",
        desc: "Suche jemanden, der sich mit Spigot Plugins auskennt, um einen kleinen RPG-Server aufzubauen. Root-Server vorhanden!",
        game: "Minecraft",
        tag: "Projekt",
        contact: "@DevCraft"
      }
    ];
  });

  React.useEffect(() => {
    localStorage.setItem('lfg_entries', JSON.stringify(entries));
  }, [entries]);

  const handleCreateEntry = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !discordContact.trim()) return;

    const newEntry = {
      id: Date.now(),
      title,
      desc: description,
      game,
      tag,
      contact: discordContact.startsWith('@') ? discordContact : `@${discordContact}`
    };

    setEntries(prev => [newEntry, ...prev]);
    setTitle('');
    setDescription('');
    setDiscordContact('');
    setIsModalOpen(false);
  };

  const handleDeleteEntry = (id) => {
    if (confirm("Möchtest du diesen Eintrag wirklich löschen?")) {
      setEntries(prev => prev.filter(entry => entry.id !== id));
    }
  };

  const filteredEntries = selectedGame === 'all' 
    ? entries 
    : entries.filter(entry => entry.game.toLowerCase() === selectedGame.toLowerCase());

  return (
    <div className="page-container">
      <Navigation basePath="../.." />
      
      <main className="main-content animate-fade-in" style={{marginTop: '120px'}}>
        <span className="badge">LFG (Looking For Group)</span>
        <h1 className="page-title"><i className="fas fa-users text-gradient"></i> Mitspielersuche</h1>
        <p className="subtitle">Finde die perfekten Teammates für dein nächstes Match oder Projekt.</p>

        {/* Filter- & Aktionsleiste */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px', flexWrap: 'wrap', gap: '15px' }}>
          {/* Game Filters Segment Control */}
          <div style={{ display: 'flex', background: 'var(--bg-card)', borderRadius: '8px', padding: '3px', border: '1px solid var(--border)' }}>
            {['all', 'Valorant', 'Minecraft'].map(g => (
              <button 
                key={g}
                onClick={() => setSelectedGame(g)}
                style={{ 
                  background: selectedGame === g ? 'var(--accent-gradient)' : 'none', 
                  color: selectedGame === g ? '#fff' : 'var(--text-muted)',
                  border: 'none', padding: '6px 16px', fontSize: '0.85rem', fontWeight: '600', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s' 
                }}
              >
                {g === 'all' ? 'Alle Spiele' : g}
              </button>
            ))}
          </div>

          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <i className="fas fa-plus"></i> Eintrag erstellen
          </button>
        </div>

        {/* LFG Cards Grid */}
        <div className="grid-links" style={{marginTop: '30px'}}>
          {filteredEntries.map((entry) => {
            const isCustomEntry = entry.id > 10; // Simple way to check if it's a user created entry vs defaults
            
            return (
              <div key={entry.id} className="card-link no-hover animate-slide-up" style={{
                borderLeft: `4px solid ${entry.game === 'Valorant' ? '#ef4444' : '#10b981'}`,
                position: 'relative'
              }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h3 style={{ fontSize: '1.2rem', margin: 0, paddingRight: '20px' }}>{entry.title}</h3>
                    <i className="fab fa-discord" style={{color: '#5865F2', fontSize: '1.2rem'}}></i>
                </div>
                <p style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--text-muted)', minHeight: '60px' }}>{entry.desc}</p>
                <div style={{marginTop: '15px', display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <span className="event-badge" style={{background: entry.game === 'Valorant' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)', color: entry.game === 'Valorant' ? '#f87171' : '#34d399'}}>{entry.game}</span>
                    <span className="event-badge" style={{background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)'}}>{entry.tag}</span>
                </div>
                <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '15px'}}>
                    <span style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Kontakt: <strong>{entry.contact}</strong></span>
                    {isCustomEntry && (
                      <button 
                        onClick={() => handleDeleteEntry(entry.id)} 
                        title="Eintrag löschen"
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.9rem' }}
                      >
                        <i className="fas fa-trash-can"></i>
                      </button>
                    )}
                </div>
              </div>
            );
          })}

          {filteredEntries.length === 0 && (
            <div className="card-link no-hover" style={{ gridColumn: 'span 2', textAlign: 'center', padding: '40px', border: '1px dashed var(--border)', background: 'transparent' }}>
              <i className="fas fa-users-slash" style={{ fontSize: '2.5rem', color: 'var(--text-muted)', marginBottom: '10px' }}></i>
              <h3>Keine Einträge gefunden</h3>
              <p style={{ color: 'var(--text-muted)' }}>Erstelle den ersten Eintrag für dieses Spiel!</p>
            </div>
          )}
        </div>
      </main>

      {/* LFG Modal */}
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
              <h2 style={{ fontSize: '1.4rem', margin: 0 }}><i className="fas fa-users-gear text-gradient"></i> LFG Suche eintragen</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleCreateEntry} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Titel der Suche</label>
                <input 
                  type="text" 
                  required
                  placeholder="z.B. Suche Builders für Survival Server"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  style={{ width: '100%', padding: '12px', background: 'var(--bg-dark)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-main)', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Beschreibung</label>
                <textarea 
                  required
                  rows="3"
                  placeholder="Beschreibe kurz, was du suchst und wer du bist..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  style={{ width: '100%', padding: '12px', background: 'var(--bg-dark)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-main)', outline: 'none', fontFamily: 'inherit', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Spiel</label>
                  <select 
                    value={game}
                    onChange={e => setGame(e.target.value)}
                    style={{ width: '100%', padding: '12px', background: 'var(--bg-dark)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-main)', outline: 'none' }}
                  >
                    <option value="Valorant">Valorant</option>
                    <option value="Minecraft">Minecraft</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Art</label>
                  <select 
                    value={tag}
                    onChange={e => setTag(e.target.value)}
                    style={{ width: '100%', padding: '12px', background: 'var(--bg-dark)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-main)', outline: 'none' }}
                  >
                    <option value="Projekt">Projekt</option>
                    <option value="Competitive">Competitive</option>
                    <option value="Just for Fun">Just for Fun</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Discord Username</label>
                <input 
                  type="text" 
                  required
                  placeholder="z.B. @PlayerOne"
                  value={discordContact}
                  onChange={e => setDiscordContact(e.target.value)}
                  style={{ width: '100%', padding: '12px', background: 'var(--bg-dark)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-main)', outline: 'none' }}
                />
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                Suche veröffentlichen
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
root.render(<LFGPage />);