function SnippetsPage() {
  const [copiedId, setCopiedId] = React.useState(null);

  const snippets = [
    {
      id: "css-reset",
      title: "Standard CSS Reset",
      desc: "Ein sauberer Start für jedes Web-Projekt ohne lästige Ränder und mit box-sizing.",
      language: "CSS",
      code: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    line-height: 1.6;
    font-family: sans-serif;
}`
    },
    {
      id: "flexbox-center",
      title: "Flexbox Centering",
      desc: "Die einfachste und sauberste Methode, um ein Element horizontal und vertikal zu zentrieren.",
      language: "CSS",
      code: `.center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* Optional: Volle Höhe */
}`
    },
    {
      id: "js-debounce",
      title: "JavaScript Debounce",
      desc: "Verhindert, dass eine Funktion (z.B. beim Scrollen oder Tippen) zu oft hintereinander aufgerufen wird.",
      language: "JavaScript",
      code: `function debounce(func, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}`
    },
    {
      id: "fetch-wrapper",
      title: "Fetch API Wrapper",
      desc: "Ein schlanker, asynchroner Wrapper für HTTP POST-Anfragen mit Fehlerbehandlung.",
      language: "JavaScript",
      code: `async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error('Netzwerk-Antwort war nicht ok');
    }
    return response.json();
}`
    }
  ];

  const handleCopy = (id, codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="page-container">
      <Navigation basePath="../.." />
      
      <main className="main-content animate-fade-in" style={{marginTop: '120px'}}>
        <span className="badge">Ressourcen</span>
        <h1 className="page-title"><i className="fas fa-paste text-gradient"></i> Nützliche Snippets</h1>
        <p className="subtitle">Kopieren erlaubt! Wiederverwendbare Code-Blöcke für deine Projekte.</p>
        
        <div style={{marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '30px'}}>
          {snippets.map((snip) => (
            <div className="card-link no-hover" key={snip.id} style={{ borderRadius: '12px' }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px'}}>
                  <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{snip.title}</h3>
                      <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>{snip.desc}</p>
                  </div>
                  <button 
                    className="btn-nav" 
                    onClick={() => handleCopy(snip.id, snip.code)}
                    style={{
                      padding: '6px 14px',
                      fontSize: '0.85rem',
                      background: copiedId === snip.id ? '#10b981' : '',
                      borderColor: copiedId === snip.id ? '#10b981' : '',
                      color: copiedId === snip.id ? '#ffffff' : ''
                    }}
                  >
                    <i className={copiedId === snip.id ? "fas fa-check" : "fas fa-copy"}></i> {copiedId === snip.id ? "Kopiert!" : "Kopieren"}
                  </button>
              </div>
              
              <pre className="nexus-code-window" style={{ margin: 0 }}>
                <code>{snip.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SnippetsPage />);