/**
 * ============================================================================
 * PIXEL & CODE - GLOBALE NAVIGATION (CLEANED VERSION)
 * ============================================================================
 */

function Navigation({ basePath = "." }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [openMobileMenu, setOpenMobileMenu] = React.useState(null);

  // ZENTRALE DATENSTRUKTUR: mainUrl verweist auf die Hub-Seiten
  const navData = [
    {
      title: "Gaming",
      icon: "fas fa-gamepad",
      mainUrl: `${basePath}/seiten/gaming.html`,
      links: [
        { name: "Gameserver IPs", icon: "fas fa-server", url: `${basePath}/seiten/gaming/gameserver.html` },
        { name: "Turniere", icon: "fas fa-trophy", url: `${basePath}/seiten/gaming/turniere.html` },
        { name: "Highlights", icon: "fas fa-photo-film", url: `${basePath}/seiten/gaming/highlights.html` },
        { name: "Mitspielersuche", icon: "fas fa-users", url: `${basePath}/seiten/gaming/lfg.html` }
      ]
    },
    {
      title: "Coding",
      icon: "fas fa-laptop-code",
      mainUrl: `${basePath}/seiten/coding.html`,
      links: [
        { name: "GitHub Repos", icon: "fab fa-github", url: `${basePath}/seiten/coding/repos.html` },
        { name: "Showcase", icon: "fas fa-code", url: `${basePath}/seiten/coding/showcase.html` },
        { name: "Snippets", icon: "fas fa-paste", url: `${basePath}/seiten/coding/snippets.html` },
        { name: "Hilfe & Support", icon: "fas fa-life-ring", url: `${basePath}/seiten/coding/support.html` }
      ]
    },
    {
      title: "Community",
      icon: "fas fa-users-viewfinder",
      mainUrl: `${basePath}/seiten/community.html`,
      links: [
        { name: "Unser Team", icon: "fas fa-user-shield", url: `${basePath}/seiten/community/team.html` },
        { name: "Regelwerk", icon: "fas fa-book", url: `${basePath}/seiten/community/regelwerk.html` },
        { name: "Social Media", icon: "fas fa-hashtag", url: `${basePath}/seiten/community/socials.html` },
        { name: "Feedback", icon: "fas fa-comment-alt", url: `${basePath}/seiten/community/feedback.html` },
        { name: "Changelog / Updates", icon: "fas fa-history", url: `${basePath}/seiten/community/changelog.html` },
        { name: "Admin Login", icon: "fas fa-user-gear", url: `${basePath}/seiten/community/admin-log.html` }
      ]
    }
  ];

  React.useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : 'auto';
  }, [isSidebarOpen]);

  const toggleMobileMenu = (menuTitle) => {
    setOpenMobileMenu(openMobileMenu === menuTitle ? null : menuTitle);
  };

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className="navbar" aria-label="Hauptnavigation">
        <div className="nav-container">
          <a href={`${basePath}/index.html`} className="nav-logo" aria-label="Zur Startseite">
            <i className="fas fa-cubes-stacked"></i> Pixel&<span className="text-gradient">Code</span>
          </a>
          
          <ul className="nav-menu desktop-only">
            <li className="nav-item">
              <a href={`${basePath}/index.html`} className="nav-link">
                <i className="fas fa-home"></i> Home
              </a>
            </li>

            {navData.map((menu, index) => (
              <li className="nav-item has-dropdown" key={index}>
                <button 
                  className="nav-link dropdown-toggle" 
                  onDoubleClick={() => window.location.href = menu.mainUrl}
                  title="Doppelklick für Übersicht"
                >
                  <i className={menu.icon}></i> {menu.title} <i className="fas fa-chevron-down arrow-icon"></i>
                </button>
                <ul className="dropdown-menu">
                  {menu.links.map((link, i) => (
                    <li key={i}><a href={link.url}><i className={link.icon}></i> {link.name}</a></li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          {/* RECHTER AKTIONS-BEREICH: Enthält exakt einen ThemeToggle und den reinen Log in Button */}
          <div className="nav-action desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ThemeToggle />
            <a href={`${basePath}/seiten/community/auth.html`} className="btn-nav_clean">
              Log in
            </a>
          </div>

          <button className="hamburger mobile-only" onClick={() => setIsSidebarOpen(true)}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <div className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>

      <aside className={`mobile-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="nav-logo"><i className="fas fa-cubes-stacked"></i> Pixel&<span className="text-gradient">Code</span></div>
          <button className="close-sidebar" onClick={() => setIsSidebarOpen(false)}><i className="fas fa-times"></i></button>
        </div>

        <div className="sidebar-content">
          <a href={`${basePath}/index.html`} className="sidebar-link"><i className="fas fa-home"></i> Home</a>
          
          {navData.map((menu, index) => (
            <div className="sidebar-item" key={index}>
              <button 
                className="sidebar-link dropdown-toggle" 
                onClick={() => toggleMobileMenu(menu.title)}
                onDoubleClick={() => window.location.href = menu.mainUrl}
              >
                <span><i className={menu.icon}></i> {menu.title}</span>
                <i className={`fas fa-chevron-${openMobileMenu === menu.title ? 'up' : 'down'} arrow-icon`}></i>
              </button>
              <div className={`sidebar-dropdown ${openMobileMenu === menu.title ? 'open' : ''}`}>
                {menu.links.map((link, i) => (
                  <a href={link.url} className="sidebar-sublink" key={i} onClick={() => setIsSidebarOpen(false)}>
                    <i className={link.icon}></i> {link.name}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* Separater, sauberer Theme-Wechsler in der Mobile-Sidebar */}
          <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-main)', borderTop: '1px solid var(--border)', marginTop: '10px' }}>
            <span style={{ fontSize: '1.05rem', fontWeight: '600' }}>Design wechseln</span>
            <ThemeToggle />
          </div>
        </div>

        <div className="sidebar-footer">
          <a href={`${basePath}/seiten/community/auth.html`} className="btn-nav_clean" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setIsSidebarOpen(false)}>
            Log in
          </a>
        </div>
      </aside>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2026 Pixel & Code Community. Made with <i className="fas fa-heart text-danger"></i> and React.</p>
    </footer>
  );
}