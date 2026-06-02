function AuthPage() {
  const [view, setView] = React.useState('login'); // 'login' oder 'register'
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [error, setError] = React.useState(''); // State für Fehlermeldungen im UI

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Vorherige Fehler zurücksetzen

    // Die URL deines lokalen Express-Servers
    const backendUrl = 'http://localhost:5000'; 
    const endpoint = view === 'login' ? '/api/auth/login' : '/api/auth/register';
    
    // Payload passend zur View zusammenbauen
    const payload = view === 'login' 
      ? { email, password } 
      : { username, email, password };

    try {
      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        // Falls der Server einen Fehler sendet (z.B. Benutzer existiert bereits)
        throw new Error(data.error || 'Etwas ist schiefgelaufen');
      }

      if (view === 'login') {
        // Token und User-Daten im Browser speichern
        localStorage.setItem('nexus_token', data.token);
        localStorage.setItem('nexus_user', JSON.stringify(data.user));
        
        // Weiterleitung zur Startseite nach erfolgreichem Login
        window.location.href = '/index.html'; 
      } else {
        // Nach erfolgreicher Registrierung direkt zum Login wechseln
        alert('Registrierung erfolgreich! Bitte melde dich an.');
        setView('login');
        setPassword('');
      }

    } catch (err) {
      // Fehler im State speichern, um ihn sauber in der Card anzuzeigen
      setError(err.message);
    }
  };

  return (
    <div className="page-container">
      <Navigation basePath="../.." />
      
      <main className="main-content" style={{ marginTop: '90px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 180px)' }}>
        
        {/* Die weiße/helle Nexus-Style Card */}
        <div className="nexus-auth-card animate-fade-in">
          
          {/* Rundes Avatar Logo oben */}
          <div className="nexus-avatar-wrapper">
             <div className="nexus-avatar-circle">
                 <i className="fas fa-brain" style={{ fontSize: '2.2rem', color: '#a855f7' }}></i>
             </div>
          </div>

          <h2>Welcome to Nexus Hub</h2>
          <p className="nexus-subtitle">{view === 'login' ? 'Sign in to continue' : 'Create an account to continue'}</p>

          {/* Social Logins - Jeweils ein sauberer Button pro Plattform */}
          <div className="nexus-social-list">
            <button onClick={() => alert('Google Login...')} className="nexus-social-btn">
              <img src="/private/logos/_Logo.svg" alt="Google" width="18" /> Continue with Google
            </button>
            <button onClick={() => alert('Discord Login...')} className="nexus-social-btn btn-disc">
              <i className="fab fa-discord"></i> Continue with Discord
            </button>
            <button onClick={() => alert('GitHub Login...')} className="nexus-social-btn btn-git">
              <i className="fab fa-github"></i> Continue with GitHub
            </button>
            <button onClick={() => alert('Apple Login...')} className="nexus-social-btn btn-app">
              <i className="fab fa-apple"></i> Continue with Apple
            </button>
          </div>

          <div className="nexus-divider">
            <span>OR</span>
          </div>

          {/* Fehlermeldung anzeigen, falls vorhanden */}
          {error && (
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#ef4444',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '15px',
              fontSize: '0.9rem',
              textAlign: 'center',
              border: '1px solid #fca5a5'
            }}>
              <i className="fas fa-exclamation-circle" style={{ marginRight: '8px' }}></i>
              {error}
            </div>
          )}

          {/* Eingabe-Formular */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {view === 'register' && (
              <div className="nexus-input-group">
                <label>Username</label>
                <div className="nexus-input-wrapper">
                  <i className="far fa-user input-icon"></i>
                  <input type="text" required placeholder="Your username" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
              </div>
            )}

            <div className="nexus-input-group">
              <label>Email</label>
              <div className="nexus-input-wrapper">
                <i className="far fa-envelope input-icon"></i>
                <input type="email" required placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="nexus-input-group">
              <label>Password</label>
              <div className="nexus-input-wrapper">
                <i className="fas fa-lock input-icon"></i>
                <input type="password" required placeholder="••••••••••••" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
            </div>

            <button type="submit" className="nexus-btn-submit">
              {view === 'login' ? 'Sign in' : 'Sign up'}
            </button>
          </form>

          {/* Footer-Links unter dem Formular */}
          <div className="nexus-card-footer">
            {view === 'login' ? (
              <>
                <button type="button" onClick={() => { const mail = prompt("Email?"); if(mail) alert("Reset-Link gesendet!"); }} className="nexus-footer-btn">Forgot password?</button>
                <span className="nexus-footer-text">Need an account? <strong onClick={() => { setView('register'); setError(''); }}>Sign up</strong></span>
              </>
            ) : (
              <>
                <span></span>
                <span className="nexus-footer-text">Already have an account? <strong onClick={() => { setView('login'); setError(''); }}>Sign in</strong></span>
              </>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AuthPage />);