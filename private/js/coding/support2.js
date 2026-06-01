function SupportPage() {
  const currentHour = new Date().getHours();
  let greetingTime = "Hallo";
  if (currentHour < 12) greetingTime = "Guten Morgen";
  else if (currentHour < 18) greetingTime = "Guten Tag";
  else greetingTime = "Guten Abend";

  const [messages, setMessages] = React.useState([
    { 
      sender: 'bot', 
      text: `${greetingTime}! Ich bin der Nexus Support-Assistent. Wie kann ich dir heute beim Coden helfen oder dich auf unseren Gameservern unterstützen? 🤖`,
      suggestions: ["🎮 Minecraft IP", "🏆 CS2 Turniere", "📜 Regelwerk", "💻 Code Snippets"]
    }
  ]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const chatEndRef = React.useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const processBotResponse = (userInput) => {
    setIsTyping(true);

    setTimeout(() => {
      let botAnswer = "Dazu habe ich aktuell leider keine passenden Daten. Unser Team hilft dir aber liebend gerne im Discord im Channel <strong>#support-ticket</strong> weiter! 🎫";
      let nextSuggestions = ["🎫 Discord Support", "👑 Wer leitet das Team?"];
      const query = userInput.toLowerCase();

      if (/\b(minecraft|ip|server|connect|join|minecraf|playmc)\b/.test(query)) {
        botAnswer = "Unser Minecraft-Survival-Server läuft auf der IP: <code>mc.pixelandcode.de</code> 🎮 Du kannst mit jeder aktuellen Java-Version beitreten. Viel Spaß beim Bauen!";
        nextSuggestions = ["📜 Welche Regeln gelten?", "🏆 Gibt es Turniere?"];
      } 
      else if (/\b(cs2|counterstrike|turnier|cup|wingman|match|esports)\b/.test(query)) {
        botAnswer = "Alle Infos zu anstehenden Matches und Cups findest du auf unserer <a href='../gaming/turniere.html' style='color:var(--accent); font-weight:600;'>Turnier-Seite</a>. Schnapp dir ein Teammate und holt euch den Sieg! 🏆";
        nextSuggestions = ["🎮 Minecraft IP", "👥 Teammate finden (LFG)"];
      } 
      else if (/\b(lfg|mitspieler|suche mate|mate|duo|gruppe)\b/.test(query)) {
        botAnswer = "Suchst du ein Duo für Valorant oder Mitbauer für Minecraft? Schau auf unserer <a href='../gaming/lfg.html' style='color:var(--accent); font-weight:600;'>LFG-Seite</a> vorbei oder nutze Discord!";
        nextSuggestions = ["🎮 Minecraft IP", "🏆 CS2 Turniere"];
      }
      else if (/\b(css|reset|snippet|snippets|code|html|code-block|programmier)\b/.test(query)) {
        botAnswer = "Nützliche Code-Schnipsel für deine HTML- und CSS-Projekte haben wir auf unserer <a href='./snippets.html' style='color:var(--accent); font-weight:600;'>Snippets-Seite</a> gesammelt. Hier ist ein Beispiel für ein zentriertes Flexbox-Layout:";
        botAnswer += "<pre class='nexus-code-window'><code>.center-box {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}</code></pre>";
        nextSuggestions = ["🚀 Was ist Nexus Code Play?", "🎫 Discord Support"];
      } 
      else if (/\b(regel|regeln|regelwerk|verhalten|bann|schimpfwort)\b/.test(query)) {
        botAnswer = "Ein respektvoller Umgang ist das A&O. Schau dir bitte unser offizielles <a href='../community/regelwerk.html' style='color:var(--accent); font-weight:600;'>Regelwerk</a> an. Toxisches Verhalten tolerieren wir nicht. 📜";
        nextSuggestions = ["👑 Wer leitet das Team?", "🚀 Was ist Nexus Code Play?"];
      } 
      else if (/\b(nexus|play|game|minigame|nexus hub|hub)\b/.test(query)) {
        botAnswer = "<strong>Nexus Code Play</strong> ist unser interaktives Spieleportal! Den Quellcode und die Entwicklungsfortschritte findest du im GitHub-Bereich der Website. 🚀";
        nextSuggestions = ["💻 GitHub Repositories", "💻 Code Snippets"];
      } 
      else if (/\b(github|repo|repos|repository|git|open source)\b/.test(query)) {
        botAnswer = "Unsere Repositories sind vollkommen Open Source! Schau auf der <a href='./repos.html' style='color:var(--accent); font-weight:600;'>GitHub-Seite</a> vorbei, um den Code einzusehen.";
        nextSuggestions = ["🚀 Was ist Nexus Code Play?", "💻 Code Snippets"];
      }
      else if (/\b(admin|team|founder|felix|jasmin|moderator|besitzer)\b/.test(query)) {
        botAnswer = "Die Community wird von Felix (Lead Dev) und Jasmin (Management) geleitet. Das gesamte Team findest du auf unserer <a href='../community/team.html' style='color:var(--accent); font-weight:600;'>Team-Seite</a>! 👑";
        nextSuggestions = ["📜 Welche Regeln gelten?", "🎫 Discord Support"];
      }
      else if (/\b(hallo|hi|hey|servus|moin|guten morgen|guten tag|guten abend)\b/.test(query)) {
        botAnswer = `Hi there! Schön, dass du dich an den Nexus-Support wendest. Wie kann ich dir heute weiterhelfen? 🛠️`;
        nextSuggestions = ["🎮 Minecraft IP", "💻 Code Snippets", "📜 Regelwerk"];
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botAnswer, suggestions: nextSuggestions }]);
      setIsTyping(false);
    }, 600);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    processBotResponse(input);
    setInput('');
  };

  const handleSuggestionClick = (suggestionText) => {
    const cleanText = suggestionText.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, "").trim();
    setMessages(prev => [...prev, { sender: 'user', text: suggestionText }]);
    processBotResponse(cleanText);
  };

  return (
    <div className="page-container">
      <Navigation basePath="../.." />
      
      <main className="main-content animate-fade-in" style={{ marginTop: '120px' }}>
        <span className="badge">Nexus Core v2.2</span>
        <h1 className="page-title"><i className="fas fa-robot text-gradient"></i> KI-Support-Center</h1>
        <p className="subtitle">Sicherer, unbegrenzter Support mit interaktiven Quick-Replies und automatischer Code-Formatierung.</p>
        
        <div className="grid-links" style={{ marginTop: '40px' }}>
          
          <div className="card-link no-hover scroll-animate appear" style={{ gridColumn: 'span 2', padding: '0', overflow: 'hidden', minHeight: '600px', display: 'flex', flexDirection: 'column', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
            
            <div style={{ background: 'var(--bg-dark)', padding: '15px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '10px', height: '10px', background: isTyping ? '#f59e0b' : '#10b981', borderRadius: '50%', boxShadow: isTyping ? '0 0 8px #f59e0b' : '0 0 8px #10b981' }}></div>
              <div>
                <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-main)' }}>Nexus Support Bot</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Local Engine • Aktiv</p>
              </div>
            </div>

            <div style={{ flex: 1, padding: '25px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', background: 'rgba(0,0,0,0.01)' }}>
              {messages.map((msg, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%', width: '100%' }}>
                  
                  <div style={{ 
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    background: msg.sender === 'user' ? 'var(--accent-gradient)' : 'var(--bg-dark)', 
                    color: 'var(--text-main)', 
                    padding: '14px 20px', 
                    borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                    border: msg.sender === 'user' ? 'none' : '1px solid var(--border)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                  }}>
                    <p style={{ margin: 0, fontSize: '0.95rem', wordBreak: 'break-word', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: msg.text }}></p>
                  </div>

                  {msg.sender === 'bot' && msg.suggestions && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px', alignSelf: 'flex-start' }}>
                      {msg.suggestions.map((suggestion, sIndex) => (
                        <button 
                          key={sIndex} 
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="nexus-suggestion-btn"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}

                </div>
              ))}
              
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', background: 'var(--bg-dark)', padding: '12px 18px', borderRadius: '16px 16px 16px 2px', border: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  <i className="fas fa-circle-notch fa-spin" style={{ marginRight: '8px', color: 'var(--accent)' }}></i> Nexus überlegt...
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', padding: '15px', background: 'var(--bg-dark)', borderTop: '1px solid var(--border)', gap: '10px' }}>
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Frag mich etwas oder nutze die Buttons..." 
                style={{ flex: 1, padding: '14px 18px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-main)', fontSize: '0.95rem', outline: 'none' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 22px', borderRadius: '8px', border: 'none' }}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>

          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card-link no-hover scroll-animate appear" style={{ padding: '25px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}><i className="fab fa-discord" style={{ color: '#5865F2' }}></i> Live Support</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Falls du spezifische Fragen hast oder ein Problem mit deinem Account vorliegt, eröffne bitte direkt ein Ticket auf unserem Discord-Server.
              </p>
              <button className="btn btn-secondary" style={{ width: '100%', marginTop: '15px', justifyContent: 'center' }}>Ticket erstellen</button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SupportPage />);