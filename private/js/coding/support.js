const localResponses = [
  {
    keywords: ["minecraft", "mc", "ip", "server"],
    response: "Die Minecraft-Server IP lautet: <code>mc.pixelandcode.de</code> 🎮. Wir laufen auf der neuesten Java-Edition. Verbinde dich einfach und spiel mit uns!"
  },
  {
    keywords: ["cs2", "counterstrike", "cs", "cs:go"],
    response: "Unser CS2 Community-Server läuft auf der IP: <code>cs.pixelandcode.de</code> 🔫. Schau einfach vorbei!"
  },
  {
    keywords: ["projekt", "showcase", "github", "repo", "code"],
    response: "Wir haben verschiedene Coding-Projekte in unserer Community! Schau dir dazu unsere GitHub Repositories-Seite an (unter Coding) oder schau in unserem Project Showcase vorbei. Unser Hauptprojekt ist <strong>Nexus Code Play</strong>."
  },
  {
    keywords: ["turnier", "cup", "trophy", "event"],
    response: "Turniere werden regelmäßig im Gaming-Bereich angekündigt. Schau auf der Turniere-Seite unter Gaming nach oder informiere dich in unserem Discord-Kanal #events 🏆."
  },
  {
    keywords: ["feedback", "bug", "fehler", "melden"],
    response: "Du kannst uns jederzeit Feedback geben! Nutze dafür einfach unsere Feedback-Seite unter Community oder erstelle ein Ticket auf unserem Discord-Server 🔧."
  },
  {
    keywords: ["hallo", "hi", "hey", "moin", "servus"],
    response: "Hey! Ich bin Nexus AI (im Offline-Modus). Wie kann ich dir heute in der Coding- oder Gaming-Community helfen? Miau! 🤖"
  },
  {
    keywords: ["wer bist du", "was bist du", "name"],
    response: "Ich bin Nexus AI, dein persönlicher Helfer für die Pixel & Code Community. Im Offline-Modus antworte ich direkt aus dem Browser-Speicher! 🤖"
  },
  {
    keywords: ["wie gehts", "wie geht es dir"],
    response: "Mir geht es super! Da ich offline im Browser laufe, verbrauche ich kaum Energie und antworte in Lichtgeschwindigkeit! ⚡ Wie geht es dir?"
  }
];

const askLocalAI = (prompt) => {
  const cleanPrompt = prompt.toLowerCase();
  for (const item of localResponses) {
    if (item.keywords.some(kw => cleanPrompt.includes(kw))) {
      return item.response;
    }
  }
  return "🤖 <strong>Offline-Modus Aktiv:</strong> Ich verstehe diese Frage im Offline-Modus leider nicht ganz. <br/><br/>" +
         "<strong>Tipp:</strong> Du kannst entweder oben auf <strong>Cloud</strong> umschalten oder das <strong>lokale Gemini Nano</strong> in deinem Chrome-Browser aktivieren, um vollwertige Offline-Antworten zu generieren!<br/>" +
         "Gehe dazu in Chrome auf <code>chrome://flags</code> und aktiviere:<br/>" +
         "1. <code>#optimization-guide-on-device-model</code><br/>" +
         "2. <code>#prompt-api-for-gemini-nano</code>";
};

function SupportPage() {
  const [messages, setMessages] = React.useState([
    { sender: 'bot', text: 'Hallo! Ich bin Nexus AI, angetrieben von Google Gemini. Ich kann dir jetzt echten Code schreiben, komplexe Fehler analysieren oder Fragen zur Community beantworten. Schieß los! 🤖' }
  ]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [aiMode, setAiMode] = React.useState('online'); // 'online' oder 'offline'
  const chatEndRef = React.useRef(null);

  const suggestions = [
    { text: "🎮 Minecraft-IP?", prompt: "Wie lautet die Minecraft Server IP?" },
    { text: "💻 Github-Projekte?", prompt: "Welche Coding-Projekte gibt es in eurer Community?" },
    { text: "🏆 Turniere?", prompt: "Wann finden Turniere statt und wie melde ich mich an?" },
    { text: "🔧 Feedback?", prompt: "Wie und wo kann ich Feedback oder Bugreports einreichen?" }
  ];

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  React.useEffect(() => {
    // Globale Hilfsfunktion für den Kopier-Button in Code-Blöcken
    window.copyNexusCode = (btn) => {
      const codeNode = btn.nextElementSibling;
      if (codeNode) {
        navigator.clipboard.writeText(codeNode.innerText);
        btn.innerHTML = "<i class='fas fa-check'></i> Kopiert!";
        btn.style.color = "#34d399";
        setTimeout(() => {
          btn.innerHTML = "<i class='far fa-copy'></i> Kopieren";
          btn.style.color = "#8b949e";
        }, 2000);
      }
    };
  }, []);

  // Funktion, die die Gemini API über den Vercel Serverless Endpoint (Online) oder das lokale Modell (Offline) aufruft
  const askGemini = async (userPrompt) => {
    if (aiMode === 'offline') {
      // 1. Prüfen, ob Chrome built-in Gemini Nano (Prompt API) verfügbar ist
      if (typeof window.ai !== 'undefined' && typeof window.ai.assistant !== 'undefined') {
        try {
          const assistant = await window.ai.assistant.create();
          const response = await assistant.prompt(
            "Du bist Nexus AI, der Support-Bot für die Gaming- und Coding-Community 'Pixel & Code'. " +
            "Antworte kurz und prägnant auf Deutsch. " +
            "Nutzer-Prompt: " + userPrompt
          );
          return response;
        } catch (e) {
          console.warn("Chrome Prompt API Fehler, nutze Fallback-NLP:", e);
        }
      }
      
      // 2. Lokales Rule-Based Fallback-Modell (NLP)
      await new Promise(resolve => setTimeout(resolve, 600)); // Simuliert kurzes Nachdenken
      return askLocalAI(userPrompt);
    }

    try {
      const response = await fetch('/api/support-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userPrompt })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Server-Fehler');
      }

      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error("Gemini API Fehler:", error);
      return "Huch, meine KI-Verbindung hatte gerade einen kleinen Lag oder der Support-Server ist offline. Bitte versuche es noch einmal! 🌐";
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    // Live-Abfrage an Google senden
    const aiResponse = await askGemini(userText);
    
    setMessages(prev => [...prev, { sender: 'bot', text: aiResponse }]);
    setIsTyping(false);
  };

  const handleSuggestionClick = async (promptText) => {
    if (isTyping) return;
    setMessages(prev => [...prev, { sender: 'user', text: promptText }]);
    setIsTyping(true);

    const aiResponse = await askGemini(promptText);
    
    setMessages(prev => [...prev, { sender: 'bot', text: aiResponse }]);
    setIsTyping(false);
  };

  const handleClearChat = () => {
    if (confirm("Möchtest du den gesamten Chatverlauf wirklich löschen?")) {
      setMessages([
        { sender: 'bot', text: 'Hallo! Ich bin Nexus AI, angetrieben von Google Gemini. Ich kann dir jetzt echten Code schreiben, komplexe Fehler analysieren oder Fragen zur Community beantworten. Schieß los! 🤖' }
      ]);
    }
  };

  return (
    <div className="page-container">
      <Navigation basePath="../.." />
      
      <main className="main-content animate-fade-in" style={{ marginTop: '120px' }}>
        <span className="badge">Gemini Pro Integrated</span>
        <h1 className="page-title"><i className="fas fa-brain text-gradient"></i> Live KI Support</h1>
        <p className="subtitle">Dieses Chatfenster ist live mit den Servern von Google AI verbunden.</p>
        
        <div className="grid-links" style={{ marginTop: '40px' }}>
          <div className="card-link no-hover" style={{ gridColumn: 'span 2', padding: '0', overflow: 'hidden', minHeight: '550px', display: 'flex', flexDirection: 'column', border: '1px solid var(--border)', background: 'var(--bg-card)', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            
            {/* Header */}
            <div style={{ background: 'var(--bg-dark)', padding: '15px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '10px', height: '10px', background: aiMode === 'offline' ? '#a855f7' : (isTyping ? '#f59e0b' : '#10b981'), borderRadius: '50%', boxShadow: aiMode === 'offline' ? '0 0 8px #a855f7' : (isTyping ? '0 0 8px #f59e0b' : '0 0 8px #10b981') }}></div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-main)', fontWeight: '700' }}>
                    {aiMode === 'online' ? 'Nexus Intelligent Core' : 'Local Browser AI'}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                    {aiMode === 'online' ? 'Gemini 1.5 Engine • Cloud' : 'Offline Mode • Local'}
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Mode Selector Segment Control */}
                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', padding: '2px', border: '1px solid var(--border)' }}>
                  <button 
                    onClick={() => setAiMode('online')}
                    style={{ 
                      background: aiMode === 'online' ? 'var(--accent-gradient)' : 'none', 
                      color: aiMode === 'online' ? '#fff' : 'var(--text-muted)',
                      border: 'none', padding: '4px 10px', fontSize: '0.8rem', fontWeight: '600', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s' 
                    }}
                  >
                    Cloud
                  </button>
                  <button 
                    onClick={() => setAiMode('offline')}
                    style={{ 
                      background: aiMode === 'offline' ? 'var(--accent-gradient)' : 'none', 
                      color: aiMode === 'offline' ? '#fff' : 'var(--text-muted)',
                      border: 'none', padding: '4px 10px', fontSize: '0.8rem', fontWeight: '600', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s' 
                    }}
                  >
                    Offline
                  </button>
                </div>

                {/* Clear Chat Button */}
                <button 
                  onClick={handleClearChat}
                  title="Chatverlauf löschen"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text-muted)', cursor: 'pointer', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ef4444';
                    e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)';
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  <i className="fas fa-trash-can"></i>
                </button>
              </div>
            </div>

            {/* Chat Verlauf */}
            <div style={{ flex: 1, padding: '25px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', background: 'rgba(0,0,0,0.01)', maxHeight: '400px' }}>
              {messages.map((msg, index) => (
                <div key={index} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  <div style={{ 
                    background: msg.sender === 'user' ? 'var(--accent-gradient)' : 'var(--bg-dark)', 
                    color: 'var(--text-main)', 
                    padding: '12px 18px', 
                    borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                    border: msg.sender === 'user' ? 'none' : '1px solid var(--border)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                  }}>
                    <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: msg.text }}></p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', background: 'var(--bg-dark)', padding: '12px 18px', borderRadius: '16px 16px 16px 2px', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="typing-dots">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                    <span style={{ fontSize: '0.85rem' }}>{aiMode === 'online' ? 'Nexus AI formuliert...' : 'Local AI analysiert...'}</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestion Chips */}
            <div style={{ padding: '10px 20px 0 20px', background: 'var(--bg-dark)', borderTop: '1px solid var(--border)' }}>
              <div className="suggestion-chips-container">
                {suggestions.map((chip, idx) => (
                  <button 
                    key={idx}
                    type="button"
                    className="suggestion-chip"
                    onClick={() => handleSuggestionClick(chip.prompt)}
                    disabled={isTyping}
                  >
                    {chip.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Eingabe */}
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', padding: '15px 20px 20px 20px', background: 'var(--bg-dark)', gap: '10px' }}>
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={isTyping ? "Nexus AI antwortet..." : (aiMode === 'offline' ? "Frag die lokale KI (Offline-Modus)..." : "Frag mich absolut alles, ich generiere echte Antworten...")}
                disabled={isTyping}
                style={{ flex: 1, padding: '14px 18px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-main)', fontSize: '0.95rem', outline: 'none' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 22px', borderRadius: '8px', border: 'none' }} disabled={isTyping || !input.trim()}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SupportPage />);