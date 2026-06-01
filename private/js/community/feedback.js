function FeedbackPage() {
  const handleSubmit = (e) => {
      e.preventDefault();
      alert("Vielen Dank! Dein Feedback wurde eingesendet.");
  };

  return (
    <div className="page-container">
      <Navigation basePath="../.." />
      
      <main className="main-content animate-fade-in" style={{marginTop: '120px'}}>
        <span className="badge">Deine Meinung</span>
        <h1 className="page-title"><i className="fas fa-comment-alt text-gradient"></i> Feedback & Ideen</h1>
        <p className="subtitle">Du hast eine Idee für ein neues Projekt, ein Discord-Feature oder einen Gameserver? Lass es uns wissen!</p>
        
        <div className="card-link no-hover" style={{marginTop: '40px', maxWidth: '700px', margin: '40px auto 0 auto', padding: '40px'}}>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                
                <div>
                    <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-muted)'}}>Dein Name / Discord-Tag</label>
                    <input 
                        type="text" 
                        required
                        placeholder="z.B. Felix#1234" 
                        style={{width: '100%', padding: '12px 15px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none', fontFamily: 'inherit'}} 
                    />
                </div>

                <div>
                    <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-muted)'}}>Kategorie</label>
                    <select style={{width: '100%', padding: '12px 15px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none', fontFamily: 'inherit'}}>
                        <option value="gaming">Gaming & Gameserver</option>
                        <option value="coding">Coding & Bot Features</option>
                        <option value="community">Community Event Idee</option>
                        <option value="other">Sonstiges</option>
                    </select>
                </div>

                <div>
                    <label style={{display: 'block', marginBottom: '8px', color: 'var(--text-muted)'}}>Deine Nachricht</label>
                    <textarea 
                        required
                        placeholder="Beschreibe deine Idee oder dein Feedback..." 
                        style={{width: '100%', height: '150px', padding: '12px 15px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none', fontFamily: 'inherit', resize: 'vertical'}}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{marginTop: '10px', alignSelf: 'flex-start'}}>
                    <i className="fas fa-paper-plane"></i> Nachricht absenden
                </button>
            </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<FeedbackPage />);