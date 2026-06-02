import { GoogleGenerativeAI } from "@google/generative-ai";

function SupportPage() {
  // HIER DEINEN GEMINI API-KEY EINTRAGEN
  const API_KEY = "AQ.Ab8RN6K4Z7adQS1F5tH8TkffjbhuNE1JBSHloSo_lsIOhkbrRQ";
  
  const [messages, setMessages] = React.useState([
    { sender: 'bot', text: 'Hallo! Ich bin Nexus AI, angetrieben von Google Gemini. Ich kann dir jetzt echten Code schreiben, komplexe Fehler analysieren oder Fragen zur Community beantworten. Schieß los! 🤖' }
  ]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const chatEndRef = React.useRef(null);

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Funktion, die die Gemini API aufruft
  const askGemini = async (userPrompt) => {
    if (API_KEY === "AQ.Ab8RN6K4Z7adQS1F5tH8TkffjbhuNE1JBSHloSo_lsIOhkbrRQ") {
      return "<strong>System-Fehler:</strong> Bitte trage zuerst deinen funktionierenden Gemini API-Key in der Datei <code>support.js</code> ein! 🔑";
    }

    try {
      // Initialisiert die Google KI
      const genAI = new GoogleGenerativeAI(API_KEY);
      
      // Wir nutzen das schnelle und kostengünstige gemini-1.5-flash Modell
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        // Hier geben wir der KI fest vor, wie sie sich verhalten soll
        systemInstruction: "Du bist Nexus AI, der Support-Bot für die Gaming- und Coding-Community 'Pixel & Code'. " +
                           "Du antwortest immer auf Deutsch, bist freundlich, nutzt gerne Entwickler-Slang und Emojis. " +
                           "Unsere Minecraft-Server-IP lautet mc.pixelandcode.de. Unser Spieleprojekt heißt Nexus Code Play. " +
                           "Formatiere Code-Antworten immer in <pre class='nexus-code-window'><code>...</code></pre> Blöcken."
      });

      const result = await model.generateContent(userPrompt);
      const response = await result.response;
      let text = response.text();

      // Kleine Bereinigung: Falls Gemini Markdown ``` verwendet, wandeln wir es in unsere CSS-Klassen um
      if (text.includes("```")) {
        text = text.replace(/```(?:css|html|javascript|js)?([\s\S]*?)```/g, "<pre class='nexus-code-window'><code>$1</code></pre>");
      }

      return text;
    } catch (error) {
      console.error("Gemini API Fehler:", error);
      return "Huch, meine KI-Verbindung hatte gerade einen kleinen Lag. Bitte versuche es noch einmal! 🌐";
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    // Live-Abfrage an Google senden
    const aiResponse = await askGemini(userText);
    
    setMessages(prev => [...prev, { sender: 'bot', text: aiResponse }]);
    setIsTyping(false);
  };

  return (
    <div className="page-container">
      <Navigation basePath="../.." />
      
      <main className="main-content animate-fade-in" style={{ marginTop: '120px' }}>
        <span className="badge">Gemini Pro Integrated</span>
        <h1 className="page-title"><i className="fas fa-brain text-gradient"></i> Live KI Support</h1>
        <p className="subtitle">Dieses Chatfenster ist live mit den Servern von Google AI verbunden.</p>
        
        <div className="grid-links" style={{ marginTop: '40px' }}>
          <div className="card-link no-hover" style={{ gridColumn: 'span 2', padding: '0', overflow: 'hidden', minHeight: '550px', display: 'flex', flexDirection: 'column', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
            
            {/* Header */}
            <div style={{ background: 'var(--bg-dark)', padding: '15px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '10px', height: '10px', background: isTyping ? '#f59e0b' : '#10b981', borderRadius: '50%', boxShadow: isTyping ? '0 0 8px #f59e0b' : '0 0 8px #10b981' }}></div>
              <div>
                <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-main)' }}>Nexus Intelligent Core</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Gemini Engine • Online</p>
              </div>
            </div>

            {/* Chat Verlauf */}
            <div style={{ flex: 1, padding: '25px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', background: 'rgba(0,0,0,0.01)' }}>
              {messages.map((msg, index) => (
                <div key={index} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
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
                <div style={{ alignSelf: 'flex-start', background: 'var(--bg-dark)', padding: '12px 18px', borderRadius: '16px 16px 16px 2px', border: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px', color: 'var(--accent)' }}></i> Gemini generiert Antwort...
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Eingabe */}
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', padding: '15px', background: 'var(--bg-dark)', borderTop: '1px solid var(--border)', gap: '10px' }}>
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Frag mich absolut alles, ich generiere echte Antworten..." 
                style={{ flex: 1, padding: '14px 18px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-main)', fontSize: '0.95rem', outline: 'none' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 22px', borderRadius: '8px', border: 'none' }}>
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