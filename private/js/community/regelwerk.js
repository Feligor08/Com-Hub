function RegelwerkPage() {
  const rules = [
    { title: "Respektvoller Umgang", desc: "Behandelt alle Mitglieder freundlich. Toxisches Verhalten, Beleidigungen oder Diskriminierung führen zum sofortigen Bann." },
    { title: "Kanal-Themen beachten", desc: "Postet Code-Fragen im #code-support und Memes im #off-topic. Haltet die Kanäle sauber." },
    { title: "Kein Spam oder Eigenwerbung", desc: "Vermeidet übermäßiges Taggen von Teammitgliedern und postet keine ungefragten Werbelinks für eigene Server." },
    { title: "NSFW ist streng verboten", desc: "Keine nicht jugendfreien oder extremen Inhalte. Diese Community ist für alle Altersgruppen zugänglich." }
  ];

  return (
    <div className="page-container">
      <Navigation basePath="../.." />
      
      <main className="main-content animate-fade-in" style={{marginTop: '120px'}}>
        <span className="badge">Wichtig</span>
        <h1 className="page-title"><i className="fas fa-book text-gradient"></i> Community Regelwerk</h1>
        <p className="subtitle">Damit sich hier alle wohlfühlen, bitten wir euch, diese einfachen Regeln zu beachten.</p>
        
        <div style={{marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '15px'}}>
            {rules.map((rule, i) => (
                <div className="card-link no-hover" key={i} style={{display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '25px'}}>
                    <div style={{background: 'var(--bg-dark)', color: 'var(--accent)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', flexShrink: 0}}>
                        {i + 1}
                    </div>
                    <div>
                        <h3 style={{marginBottom: '5px', fontSize: '1.2rem'}}>{rule.title}</h3>
                        <p style={{color: 'var(--text-muted)'}}>{rule.desc}</p>
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
root.render(<RegelwerkPage />);